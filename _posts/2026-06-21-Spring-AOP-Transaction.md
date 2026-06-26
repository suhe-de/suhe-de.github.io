---
layout: post
title: Spring AOP、事务与代理机制
subtitle: 从代理生成到事务失效场景的完整剖析
tags: [Spring, AOP, 事务, 代理, JDK动态代理, CGLIB]
comments: true
author: suhe
---

## 1. Spring AOP 是怎么实现的？

Spring AOP 的核心是代理对象。Spring 在 Bean 初始化后，通过 BeanPostProcessor 判断当前 Bean 是否需要增强。如果需要增强，就创建代理对象，并用代理对象替换原始 Bean 放入容器。

标准回答：

> Spring AOP 是通过代理实现的。在 Bean 初始化后，Spring 会通过 BeanPostProcessor 判断 Bean 是否匹配切面，如果匹配，就创建代理对象。之后外部调用这个 Bean 时，实际调用的是代理对象，代理对象内部通过拦截器链执行增强逻辑和目标方法。

## 2. 多个 AOP 切面的执行顺序

多个切面会形成 `MethodInterceptor` 链，执行方式是“洋葱模型”：

```text
AOP1 before
  ↓
AOP2 before
  ↓
target.method()
  ↓
AOP2 after
  ↓
AOP1 after
```

表达：

> 多个切面按照 @Order 或 Ordered 排序，形成拦截器链。调用目标方法时，外层切面先进入，内层切面后进入，返回时再从内层向外层退出。

## 3. JDK 动态代理和 CGLIB

| 对比项 | JDK 动态代理 | CGLIB |
|---|---|---|
| 实现方式 | 基于接口 | 基于继承 |
| 核心类 | Proxy、InvocationHandler | Enhancer、MethodInterceptor |
| 是否需要接口 | 需要 | 不需要 |
| 是否能代理 final 类 | 不能 | 不能 |
| 是否能增强 final 方法 | 接口调用场景可能可以 | 不能 |

标准回答：

> JDK 动态代理基于接口实现，目标类需要实现接口；CGLIB 基于继承生成子类代理，不要求接口，但不能代理 final 类，也不能增强 final 方法。

## 4. Spring 事务底层原理

Spring 声明式事务基于 AOP。

核心组件：

```text
@Transactional
TransactionInterceptor
PlatformTransactionManager
TransactionSynchronizationManager
ThreadLocal
DataSourceTransactionManager
```

执行流程：

```text
代理对象拦截方法调用
  ↓
TransactionInterceptor 开启事务
  ↓
获取数据库连接
  ↓
绑定到当前线程 ThreadLocal
  ↓
执行目标方法
  ↓
正常返回 commit
  ↓
异常 rollback
```

标准回答：

> Spring 事务本质上是 AOP。调用被 @Transactional 修饰的方法时，实际进入的是事务代理对象。TransactionInterceptor 会在方法执行前开启事务，在当前线程绑定数据库连接，方法正常结束则提交，抛出符合回滚规则的异常则回滚。

## 5. 默认回滚规则

默认回滚：

```text
RuntimeException
Error
```

默认不回滚：

```text
Checked Exception
```

如需所有异常回滚：

```java
@Transactional(rollbackFor = Exception.class)
```

## 6. @Transactional 失效场景

必须背熟：

```text
1. 同类内部自调用
2. 方法不是 public
3. private / static / final 方法
4. 异常被 catch 后没有重新抛出
5. Checked Exception 未配置 rollbackFor
6. 当前对象不是 Spring Bean
7. 多线程 / @Async 导致事务上下文不传播
8. 多数据源事务管理器配置错误
```

## 7. 同类内部调用为什么事务失效？

```java
public void methodA() {
    this.methodB();
}

@Transactional
public void methodB() {
    // DB 操作
}
```

原因：

```text
this.methodB() 是当前对象内部调用
没有经过 Spring 代理对象
TransactionInterceptor 没有机会执行
事务不生效
```

解决方案：

```text
1. 拆到另一个 Service
2. 注入自身代理对象
3. 使用 AopContext.currentProxy()
4. 使用 TransactionTemplate
```

## 8. 多线程事务为什么不传播？

Spring 事务上下文通过 ThreadLocal 绑定当前线程。多线程或 @Async 会切换线程，导致事务上下文不能自动传播。

## 9. 已学习状态

| 知识点 | 状态 |
|---|---|
| AOP 代理机制 | 已学习 |
| 多切面执行顺序 | 已学习 |
| JDK 动态代理 / CGLIB | 已学习 |
| final 方法事务问题 | 已学习 |
| Spring 事务底层 | 已学习 |
| 事务失效场景 | 已学习 |
| 自调用失效 | 已学习 |
| 多线程事务问题 | 已学习 |
