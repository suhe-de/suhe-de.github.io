---
layout: post
title: 实验室样本管理系统设计
subtitle: 样本登记、结果审核、版本化更正与权限控制
tags: [系统设计, 实验室, 审批流, 数据库设计, 权限模型]
comments: true
author: suhe
---

## 1. 业务场景

系统支持：

```text
样本登记
实验任务创建
实验结果录入
结果审核
结果更正
报表查询
权限控制
审计追踪
```

## 2. 核心表设计

### 2.1 样本信息表 lab_sample_info

```text
sample_id
task_id
sample_code
sample_name
sample_type
sample_status
created_by
created_time
updated_by
updated_time
```

关系：多个 sample 对应一个 task。

索引建议：

```text
(task_id)
(task_id, sample_status)
(task_id, sample_status, created_time)
```

### 2.2 实验任务表 lab_task_info

```text
task_id
task_code
task_name
task_type
task_status
result_status
current_result_version_id
result_version_no
created_by
created_time
updated_by
updated_time
```

索引建议：

```text
(task_status, created_time, task_id)
(result_status, created_time, task_id)
```

### 2.3 审核流程表 lab_audit_flow

```text
audit_flow_id
task_id
result_version_id
audit_type
audit_status
apply_user
audit_user
audit_opinion
audit_time
created_time
updated_time
```

索引建议：

```text
UNIQUE(task_id)
(audit_status, task_id)
```

### 2.4 结果版本表 lab_result_version

```text
result_version_id
task_id
old_result_data
new_result_data
version_status
revision_reason
apply_user
apply_time
approve_user
approve_time
effective_time
created_time
updated_time
```

状态：

```text
PENDING
APPROVED
REJECTED
EFFECTIVE
```

## 3. 实验结果不可修改设计

核心原则：

```text
不能直接 update result_data
必须走审批流程
必须保留旧值和新值
必须记录申请人、审批人、原因和时间
必须可追溯
```

高分表达：

> 实验结果不是普通业务字段，不能直接覆盖更新。应该通过结果版本表保存每次更正申请，审批通过后由系统内部服务将任务表的 current_result_version_id 指向新的结果版本。这样既能保证当前结果可读，又能保留历史版本和审计轨迹。

## 4. 结果录错后的更正流程

```text
1. 录入人发现结果错误
2. 提交结果更正申请
3. 写入 lab_result_version，状态 PENDING
4. 创建 audit_flow，绑定 result_version_id
5. 审核人审批
6. 审批通过后 result_version 状态变 APPROVED
7. 系统内部服务激活版本
8. 更新 task.current_result_version_id
9. 写入审计日志
10. 刷新报表汇总表
```

## 5. 如何防止绕过审批直接修改？

```text
1. 普通用户只能提交更正申请
2. 审核人只能审批，不能直接改结果
3. 激活结果由系统内部服务执行
4. 激活方法只接收 audit_flow_id 和 result_version_id
5. 方法内部校验版本是否 APPROVED
6. 不接收前端传入的 resultData
7. 任务表只更新 current_result_version_id
```

核心背诵句：

> 不直接更新结果值，而是更新当前生效结果版本指针。版本必须由审批流程创建并审批通过，更新方法只接受审批流程 ID 和版本 ID，不接受 resultData。

## 6. 权限模型

录入人：创建任务、维护样本、提交结果、更正申请；不能审批自己的申请。  
审核人：审批结果和更正申请；不能直接改结果；不能审批自己的申请。  
管理员：查询、配置、审计；不能绕过审批直接修改结果。  
系统服务账号：审批通过后内部激活结果版本、刷新汇总表、写审计日志。

## 7. 防止自提交自审批

服务层校验：

```text
currentUser has AUDIT_APPROVE
currentUser 是合法审核人
currentUser != apply_user
审核状态 = PENDING
```

## 8. 已学习状态

| 知识点 | 状态 |
|---|---|
| 样本与任务建模 | 已学习 |
| 审核流程设计 | 已学习 |
| 结果不可修改 | 已学习 |
| 结果版本表 | 已学习 |
| 更正审批 | 已学习 |
| 防绕过审批 | 已学习 |
| 录入人 / 审核人 / 管理员权限 | 已学习 |
| 自提交自审批防护 | 已学习 |
