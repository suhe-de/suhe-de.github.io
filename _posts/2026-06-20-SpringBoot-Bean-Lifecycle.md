---
layout: post
title: Spring Boot 启动与 Bean 生命周期
subtitle: 从 SpringApplication.run 到 ApplicationReadyEvent 的完整链路
tags: [Spring Boot, Spring, IoC, Bean生命周期]
comments: true
author: suhe
---

## 1. 主线

```text
main 方法
  ↓
SpringApplication.run()
  ↓
准备 Environment
  ↓
创建 ApplicationContext
  ↓
执行 refresh()
  ↓
扫描并注册 BeanDefinition
  ↓
创建 BeanFactory
  ↓
调用 BeanFactoryPostProcessor
  ↓
实例化 Bean
  ↓
依赖注入
  ↓
BeanPostProcessor 前后置处理
  ↓
AOP 代理可能在初始化后生成
  ↓
启动内嵌 Tomcat
  ↓
注册 DispatcherServlet
  ↓
ApplicationReadyEvent
```

## 2. Spring Boot 是如何启动 Web 应用的？

标准回答：

> Spring Boot 应用启动时，入口是 main 方法中的 SpringApplication.run()。它会先准备运行环境，包括配置文件、环境变量、Profile 等，然后创建 ApplicationContext。Web 应用通常创建 AnnotationConfigServletWebServerApplicationContext。随后执行 refresh()，完成 BeanDefinition 扫描、BeanFactory 准备、Bean 创建、依赖注入、BeanPostProcessor 执行和 AOP 代理生成。Web 场景下还会启动内嵌 Tomcat，并注册 DispatcherServlet，使应用能够接收 HTTP 请求。

## 3. refresh() 核心流程

```text
1. 准备 BeanFactory
2. 加载 BeanDefinition
3. 执行 BeanFactoryPostProcessor
4. 注册 BeanPostProcessor
5. 实例化非懒加载单例 Bean
6. 属性填充，完成依赖注入
7. 初始化 Bean
8. BeanPostProcessor 后置处理
9. AOP 代理对象可能在这里生成
10. 完成容器刷新
```

## 4. BeanDefinition 是什么？

`BeanDefinition` 是 Bean 的元数据，描述一个 Bean 如何被创建：

```text
Bean 的 class 类型
作用域 singleton / prototype
构造方法参数
属性依赖
是否懒加载
初始化方法
销毁方法
```

表达：

> Spring 并不是一开始就直接创建对象，而是先把类解析成 BeanDefinition，再由 BeanFactory 根据 BeanDefinition 创建 Bean。

## 5. BeanFactory 和 ApplicationContext

- BeanFactory：Spring 最底层的 IoC 容器，负责 Bean 创建、依赖注入、生命周期管理。
- ApplicationContext：BeanFactory 的增强版，提供国际化、事件发布、资源加载、环境配置、Web 容器集成等能力。

表达：

> BeanFactory 是基础 IoC 容器，ApplicationContext 在它基础上增加企业级功能，是 Spring Boot 应用中实际使用的容器。

## 6. BeanPostProcessor 的作用

`BeanPostProcessor` 是 Bean 生命周期扩展点，可在 Bean 初始化前后插入逻辑：

```text
postProcessBeforeInitialization()
postProcessAfterInitialization()
```

AOP 代理通常通过 BeanPostProcessor 在初始化后阶段生成。

## 7. 已学习状态

| 知识点 | 状态 |
|---|---|
| SpringApplication.run | 已学习 |
| Environment | 已学习 |
| ApplicationContext | 已学习 |
| refresh | 已学习 |
| BeanDefinition | 已学习 |
| BeanFactory | 已学习 |
| BeanPostProcessor | 已学习 |
| 内嵌 Tomcat / DispatcherServlet | 已学习 |
