---
layout: post
title: MQ、本地消息表、幂等与最终一致性
subtitle: Outbox Pattern 与消费幂等的工程落地
tags: [MQ, 本地消息表, 幂等, 最终一致性, 分布式]
comments: true
author: suhe
---

## 1. 为什么需要本地消息表？

问题：数据库事务提交成功，但 MQ 发送失败怎么办？

解决方案：Outbox Pattern / 本地消息表。

## 2. 推荐事务边界

主业务事务中做：

```text
1. 更新 audit_status
2. 插入或更新 result_version
3. 更新 task.current_result_version_id
4. 插入 event_outbox，状态 INIT
```

事务外异步做：

```text
1. 定时任务扫描 INIT / SEND_FAILED 消息
2. 发送 MQ
3. 发送成功改为 SENT
4. 消费端更新报表汇总表
```

核心表达：

> 核心业务表和本地消息表在同一个数据库事务中提交，MQ 发送放到事务外异步执行，避免数据库事务和 MQ 事务无法统一的问题。

## 3. event_outbox 表设计

```text
event_id
request_id
biz_type
biz_id
event_type
event_payload
event_status
retry_count
next_retry_time
last_error_msg
created_time
updated_time
```

状态：

```text
INIT
SENT
SEND_FAILED
DEAD
CANCELED
```

## 4. event_consume_log 表设计

```text
consume_id
event_id
consumer_group
consume_status
retry_count
last_error_msg
consume_time
created_time
updated_time
```

唯一约束：

```text
UNIQUE(event_id, consumer_group)
```

状态：

```text
CONSUMING
CONSUMED
CONSUME_FAILED
```

## 5. 消费幂等流程

```text
1. 消费者收到消息
2. 根据 event_id + consumer_group 插入消费记录 CONSUMING
3. 如果唯一键冲突，查询状态
4. 如果 CONSUMED，直接返回成功
5. 如果 CONSUMING，判断是否超时
6. 执行业务更新
7. 更新消费记录为 CONSUMED
```

关键点：

> 更新业务表和更新 consume_log 为 CONSUMED 必须在同一个本地事务中提交。

## 6. 汇总表 sample_count 怎么维护？

不要完全依赖：

```sql
sample_count = sample_count + 1
```

更稳定方案：

```text
以样本明细表为事实源
按 task_id 重新 count
覆盖写入 summary.sample_count
```

示例：

```sql
SELECT task_id, COUNT(*) AS real_count
FROM lab_sample_info
WHERE task_id IN (...)
  AND sample_status <> 'DELETED'
GROUP BY task_id;
```

## 7. 准确性与性能平衡

不能每条消息都 count(*)。

优化：

```text
1. 样本表建组合索引 (task_id, sample_status, created_time)
2. 收集一批 task_id 后 group by 批量聚合
3. 引入 dirty_task 表
4. 高频任务延迟刷新
5. 定时校准 summary 和 source table
6. 报表列表读 summary，任务详情可实时 count
```

## 8. dirty_task 表

```text
report_dirty_task
- task_id
- dirty_type
- last_event_time
- process_status
- retry_count
- created_time
- updated_time
```

流程：

```text
1. 样本变更只标记 task_id 为 dirty
2. 定时任务延迟扫描
3. 合并同一个 task_id 的多次变更
4. 批量 count 后更新 summary
```

## 9. 多消费者同时重算怎么办？

因为基于源表 count 后覆盖写入，所以重复执行不会导致最终结果错误，但会带来重复计算。

控制方式：

```text
1. dirty_task 抢占式更新
2. 对 summary 当前 task_id 行加行锁
3. MQ 按 task_id 分区顺序消费
4. 或接受少量重复计算
```

## 10. 已学习状态

| 知识点 | 状态 |
|---|---|
| Outbox Pattern | 已学习 |
| 本地消息表设计 | 已学习 |
| MQ 发送失败处理 | 已学习 |
| 消费记录表 | 已学习 |
| 消费幂等 | 已学习 |
| event_id + consumer_group | 已学习 |
| 业务更新与消费记录同事务 | 已学习 |
| 汇总表最终一致 | 已学习 |
| sample_count 重算覆盖 | 已学习 |
| dirty_task 延迟刷新 | 已学习 |
