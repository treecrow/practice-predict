# predict

> 该项目基于 koa、graphql、vue、mysql构建，用户可以多种账号／第三方登陆，使用 markdown 编辑起发布自己的预测，评判别人的预测。

> 表示越想越觉得自己的能力很难在短期内完成响应的功能，暂时 push 到 github 上，以便回头看一些相关实现。

## mysql 表设计

表       | more
------- | -----
info    | 用户信息表
auth    | 用户授权表
verify  | 账号验证表
follow  | 关注用户表
opus    | 用户作品表
judge   | 用户评判表
comment | 用户评论表
care    | 关注作品表
msg     | 用户消息表

## [mysql 数据库字段设计](./md/字段列表.md)

> 项目的所有表对应的字段

## [msqApi](./md/msqApi.md)

> 直接操作 mysql 的一些方法

## [graphql类型设计](./md/graphql类型设计.md)

> grapgql schema 的设计

## [graphqlApi](./md/graphqlApi.md)

> graphql 暴露的接口