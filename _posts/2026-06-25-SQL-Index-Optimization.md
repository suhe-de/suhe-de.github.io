---
layout: post
title: SQL 执行计划与索引优化 Day 1
subtitle: 全表扫描、组合索引、索引失效与深分页优化
tags: [SQL, 索引, 执行计划, 性能优化, 数据库]
comments: true
author: suhe
---

## 1. 今日学习目标

```text
1. 什么是 SQL 执行计划
2. 执行计划看哪些内容
3. 什么是全表扫描和索引扫描
4. 组合索引怎么设计
5. 索引为什么会失效
6. 深分页为什么慢
7. 报表慢 SQL 怎么排查
```

## 2. 什么是 SQL 执行计划？

标准回答：

> SQL 执行计划是数据库优化器为一条 SQL 生成的执行路线图。它会告诉我们数据库是全表扫描还是索引扫描，表之间怎么 JOIN，预计扫描多少行，是否需要排序、分组、临时表，以及整体执行成本。排查慢 SQL 时，先看执行计划，判断 SQL 是否走了预期索引、扫描行数是否过大、是否存在全表扫描、深分页、大排序或大 JOIN。

一句话记忆：执行计划就是数据库执行 SQL 的路线图。

## 3. 执行计划重点看什么？

### 3.1 有没有全表扫描

```text
TABLE ACCESS FULL
ALL
```

### 3.2 有没有走索引

```text
INDEX RANGE SCAN
INDEX UNIQUE SCAN
INDEX FULL SCAN
ref
range
const
```

### 3.3 扫描行数是否过大

```text
rows
cardinality
estimated rows
```

### 3.4 是否额外排序

```text
Using filesort
SORT ORDER BY
```

### 3.5 是否使用临时表

```text
Using temporary
TEMP TABLE
SORT GROUP BY
```

## 4. 常见执行计划关键词

| 关键词 | 含义 |
|---|---|
| TABLE ACCESS FULL | 全表扫描 |
| INDEX RANGE SCAN | 索引范围扫描 |
| INDEX UNIQUE SCAN | 唯一索引扫描 |
| INDEX FULL SCAN | 扫描整个索引 |
| TABLE ACCESS BY INDEX ROWID | 通过索引找到 rowid 后回表 |
| SORT ORDER BY | 排序 |
| SORT GROUP BY | 分组排序 |
| Using temporary | 使用临时表 |
| Using filesort | 额外排序 |

## 5. 组合索引设计原则

表：

```text
lab_task_info
- task_id
- task_status
- created_time
- result_status
```

查询条件：

```sql
WHERE task_status = ?
  AND created_time BETWEEN ? AND ?
ORDER BY created_time DESC, task_id DESC
```

推荐组合索引：

```text
(task_status, created_time, task_id)
```

原因：

```text
task_status 是等值条件
created_time 是范围条件，也是排序字段
task_id 用于稳定排序和游标分页
```

标准回答：

> 设计 `(task_status, created_time, task_id)` 组合索引。因为 task_status 是等值筛选条件，放在前面可以先缩小数据范围；created_time 既用于时间范围过滤又用于排序；task_id 用于稳定排序和游标分页，避免 created_time 相同导致分页结果不稳定。

## 6. 分表建索引

不同表字段不能混在一个索引里。

任务表：

```text
lab_task_info(task_status, created_time, task_id)
```

审核表：

```text
lab_audit_flow(audit_status, task_id)
lab_audit_flow(task_id) UNIQUE
```

样本表：

```text
lab_sample_info(task_id, sample_status)
lab_sample_info(task_id, sample_status, created_time)
```

## 7. 索引失效常见场景

```text
1. 不满足组合索引最左前缀
2. 对索引字段使用函数
3. 对索引字段做计算
4. 字段类型不一致，发生隐式转换
5. LIKE '%xxx' 前缀模糊匹配
6. OR 条件使用不当
7. 返回数据量太大，优化器认为全表扫描更划算
8. order by 与索引顺序不匹配
9. 统计信息不准确
```

## 8. 函数导致索引失效

不推荐：

```sql
WHERE TO_CHAR(created_time, 'yyyy-mm-dd') = '2026-06-25'
```

推荐：

```sql
WHERE created_time >= '2026-06-25 00:00:00'
  AND created_time <  '2026-06-26 00:00:00'
```

## 9. 隐式转换导致索引失效

如果 task_id 是字符串类型，不推荐：

```sql
WHERE task_id = 1001
```

推荐：

```sql
WHERE task_id = '1001'
```

## 10. 深分页为什么慢？

```sql
LIMIT 100000, 20
```

数据库通常需要先扫描前 100020 行，再丢弃前 100000 行，所以 offset 越大越慢。

## 11. 深分页优化：游标分页

```sql
WHERE created_time < #{lastCreatedTime}
   OR (created_time = #{lastCreatedTime} AND task_id < #{lastTaskId})
ORDER BY created_time DESC, task_id DESC
LIMIT 20
```

标准回答：

> 深分页慢是因为数据库需要扫描并丢弃大量前置数据。对于大数据量报表，使用基于 created_time + task_id 的游标分页，避免 offset 越大性能越差。

## 12. 报表 SQL 慢怎么排查？

标准回答：

> 先看接口链路耗时，确认慢在 SQL 还是业务逻辑。如果定位到 SQL 慢，查看慢 SQL 和执行计划，重点看是否全表扫描、是否走预期索引、扫描行数是否过大、是否出现 filesort、temporary、深分页或大 JOIN。  
> 如果没有走索引，检查 where 条件是否满足组合索引最左前缀，是否对索引字段使用函数或计算，是否有隐式类型转换，order by 是否和索引顺序匹配，以及统计信息是否准确。  
> 对报表类查询，优先采用先查主表 task_id 再批量查询关联数据的方式，避免一对多 JOIN 后分页；对于大数据量分页，用 created_time + task_id 游标分页；对于高频汇总字段，用报表汇总表或预聚合降低实时查询压力。

## 13. 已学习状态

| 知识点 | 状态 |
|---|---|
| SQL 执行计划概念 | 已学习 |
| 全表扫描 | 已学习 |
| 索引扫描 | 已学习 |
| 扫描行数 | 已学习 |
| filesort / temporary | 已学习 |
| 组合索引设计 | 已学习 |
| 索引失效场景 | 已学习 |
| 函数导致索引失效 | 已学习 |
| 隐式转换 | 已学习 |
| 深分页 | 已学习 |
| 游标分页 | 已学习 |
| 慢 SQL 排查模板 | 已学习 |
