---
layout: post
title: 报表查询、汇总表与 Excel 导出
subtitle: 在线分页、异步导出、游标分页与断点续导
tags: [报表, Excel, 异步导出, 游标分页, EasyExcel]
comments: true
author: suhe
---

## 1. 在线报表查询设计

需求：任务信息、样本数量、审核状态、最新结果、时间范围筛选、状态筛选、分页查询。

## 2. 为什么不能直接大 JOIN 分页？

如果任务和样本是一对多关系，直接 JOIN 后分页可能导致：

```text
1. 一条任务被多条样本记录放大
2. 分页结果不准确
3. 数据库排序和临时表压力大
4. 查询慢
```

推荐：

```text
先分页查任务 task_id
再批量查关联信息
```

## 3. 在线查询流程

```text
1. 根据查询条件分页查询任务或汇总表
2. 得到当前页 task_id 列表
3. 批量查询审核信息
4. 批量查询样本数量
5. 批量查询最新结果
6. 在内存中组装返回 DTO
```

## 4. 报表汇总表

```text
lab_task_report_summary
- task_id
- task_code
- task_status
- audit_status
- result_status
- sample_count
- latest_result_version_id
- created_time
- updated_time
```

作用：避免每次报表都查多张明细表，提高查询性能。

## 5. 在线查询和导出为什么要分开？

在线查询：低延迟、小 pageSize、实时返回、面向页面展示。  
导出：大数据量、长耗时、高 IO、高内存风险、适合异步任务。

## 6. 导出接口设计

创建导出任务：

```http
POST /api/lab/reports/export
```

查询进度：

```http
GET /api/lab/reports/export/{exportTaskId}
```

下载文件：

```http
GET /api/lab/reports/export/{exportTaskId}/download
```

## 7. 导出任务表 lab_export_task

```text
export_task_id
user_id
export_type
query_condition_json
query_hash
export_status
total_count
processed_count
last_created_time
last_task_id
current_sheet_no
current_row_no
temp_file_path
final_file_url
retry_count
error_msg
created_time
updated_time
```

状态：

```text
INIT
PROCESSING
SUCCESS
FAILED
CANCELED
EXPIRED
```

## 8. 200 万行导出怎么保护系统？

```text
1. 先预估 count
2. 超过阈值提示用户缩小范围
3. 确认需要则创建异步导出任务
4. 大导出走只读库 / 报表库
5. 使用 created_time + task_id 游标分页
6. 使用 EasyExcel / SXSSFWorkbook 流式写入
7. 按 Sheet 或多个文件拆分
8. 文件生成后上传文件服务器 / 对象存储
9. 单用户并发导出任务限制
10. 全局导出线程池限制
11. 失败重试与告警
```

## 9. 游标分页

```sql
WHERE created_time < #{lastCreatedTime}
   OR (created_time = #{lastCreatedTime} AND task_id < #{lastTaskId})
ORDER BY created_time DESC, task_id DESC
LIMIT #{batchSize}
```

## 10. 断点续导

不能把查询、写 Excel、更新 checkpoint 简单放进同一个数据库事务，因为 Excel 文件写入不受数据库事务控制。

推荐批次级 checkpoint：

```text
1. 根据 last_created_time + last_task_id 查下一批
2. 流式写入临时文件
3. flush 成功
4. 更新 export_task checkpoint
5. 继续下一批
```

失败后：

```text
1. 标记任务 FAILED
2. 记录 error_msg
3. 重试时读取 checkpoint
4. 从最后成功游标后继续导出
```

## 11. 防重复创建导出任务

后端幂等键：

```text
user_id + export_type + query_hash
```

唯一索引：

```sql
UNIQUE(user_id, export_type, query_hash)
```

重复提交时：

```text
1. 查询已有任务
2. INIT / PROCESSING：返回已有 export_task_id
3. SUCCESS：文件未过期则返回下载地址
4. FAILED：允许基于原任务重试
5. EXPIRED：允许重新生成
```

## 12. 已学习状态

| 知识点 | 状态 |
|---|---|
| 在线查询与导出拆分 | 已学习 |
| 先查 task_id 再批量查详情 | 已学习 |
| 汇总表设计 | 已学习 |
| 异步导出任务 | 已学习 |
| 只读库 / 报表库 | 已学习 |
| 游标分页 | 已学习 |
| EasyExcel 流式写入 | 已学习 |
| 分 Sheet / ZIP | 已学习 |
| 断点续导 checkpoint | 已学习 |
| 防重复导出 query_hash | 已学习 |
