create database if not exists kizunDb character set utf8;

use kizunDb;

drop table if exists info;
drop table if exists auth;
drop table if exists follow;
drop table if exists opus;
drop table if exists judge;
drop table if exists comment;
drop table if exists care;
drop table if exists msg;

create table if not exists info (
  info_id int unsigned not null auto_increment comment '主键',
  info_name char(20) comment '真实名',
  info_nickname char(20) not null default '佚名' comment '昵称',
  info_avatar char(40) comment '头像',
  info_sex enum('男','女','保密') not null default '保密' comment '性别',
  info_birthday bigint comment '生日',
  info_phone char(13) comment '手机',
  info_email varchar(40) comment '邮箱',
  info_address varchar(300) comment '地址',
  info_enroll_time bigint comment '注册时间',
  info_enroll_ip char(16) comment '注册ip',
  info_login_time bigint comment '最近登录时间',
  info_login_ip char(16) comment '最近登录ip',
  info_login_type char(6) comment '最近登录方式',
  info_token char(20) comment '用户token',
  info_token_deadline bigint comment '用户token过期时间',
  info_status varchar(20) comment '用户当前状态',
  info_follow_count int default 0 comment '关注人数',
  info_followed_count int default 0 comment '被关注次数',
  info_care_count int default 0 comment '关注作品数',
  primary key ( info_id ),
  index (info_name, info_nickname)
) engine=InnoDB default charset=utf8 comment '用户信息表';

create table if not exists auth (
  auth_id int unsigned not null auto_increment comment '主键',
  auth_info_id int unsigned comment '用户id',
  auth_type enum('sina','wechat','qq','phone','email') comment '认证类型',
  auth_account char(40) comment '认证账号',
  auth_credential char(40) comment '密码凭证',
  primary key ( auth_id ),
  index (auth_info_id, auth_type, auth_account)
) engine=InnoDB default charset=utf8 comment '用户授权表';

create table if not exists verify (
  verify_id int unsigned not null auto_increment comment '主键',
  verify_account char(40) comment '验证账号',
  verify_code char(40) comment '激活码',
  verify_create_time bigint comment '创建时间',
  primary key ( verify_id ),
  index (verify_account)
) engine=InnoDB default charset=utf8 comment '账号验证表';

create table if not exists follow (
  follow_id int unsigned not null auto_increment comment '主键',
  follow_info_id int unsigned comment '关注着',
  follow_info_mogul int unsigned comment '被关注者',
  follow_create_time bigint comment '关注时间',
  primary key ( follow_id ),
  index (follow_info_id, follow_info_mogul)
) engine=InnoDB default charset=utf8 comment '关注用户表';

create table if not exists opus (
  opus_id int unsigned not null auto_increment comment '主键',
  opus_info_id int unsigned comment '创作者',
  opus_title varchar(40) comment '标题',
  opus_summary varchar(400) comment '概述',
  opus_text text comment '正文',
  opus_create_time bigint comment '创建时间',
  opus_alter_time bigint comment '最近修改时间',
  opus_status enum('成功','失败','下注中') not null default '下注中' comment '状态',
  opus_care_count int unsigned default 0 comment '被关注次数',
  opus_judge_count int default 0 comment '评判次数',
  opus_judge_index int default 0 comment '评判指数',
  opus_comment_count int unsigned default 0 comment '评论数',
  primary key ( opus_id ),
  index (opus_info_id, opus_title, opus_summary)
) engine=InnoDB default charset=utf8 comment '用户作品表';

create table if not exists judge (
  judge_id int unsigned not null auto_increment comment '主键',
  judge_info_id int unsigned comment '评判者',
  judge_opus_id int unsigned comment '作品',
  judge_create_time bigint comment '评判时间',
  judge_prefer int(1) comment '倾向',
  judge_content varchar(1000) comment '理由',
  primary key ( judge_id ),
  index (judge_info_id, judge_opus_id)
) engine=InnoDB default charset=utf8 comment '用户评判表';

create table if not exists comment (
  comment_id int unsigned not null auto_increment comment '主键',
  comment_info_id int unsigned comment '评论者',
  comment_opus_id int unsigned comment '作品',
  comment_comment_id int unsigned comment '被回复的评论',
  comment_create_time bigint comment '评论时间',
  comment_content varchar(400) comment '内容',
  comment_agree int default 0 comment '赞同指数',
  primary key ( comment_id ),
  index (comment_opus_id)
) engine=InnoDB default charset=utf8 comment '用户评论表';

create table if not exists care (
  care_id int unsigned not null auto_increment comment '主键',
  care_info_id int unsigned comment '用户id',
  care_opus_id int unsigned comment '作品id',
  care_create_time bigint comment '关注时间',
  primary key ( care_id ),
  index (care_info_id, care_opus_id)
) engine=InnoDB default charset=utf8 comment '关注作品表';

create table if not exists msg (
  msg_id int unsigned not null auto_increment comment '主键',
  msg_type int(2) comment '种类',
  msg_info_id int unsigned comment '所有者',
  msg_info_id2 int unsigned comment '相关用户2',
  msg_info_id3 int unsigned comment '相关用户3',
  msg_opus_id int unsigned comment '作品',
  msg_judge_id int unsigned comment '评判',
  msg_comment_id int unsigned comment '评论',
  msg_comment_id2 int unsigned comment '2级评论',
  msg_create_time bigint comment '创建时间',
  msg_content varchar(200) comment '消息内容',
  primary key ( msg_id ),
  index (msg_info_id, msg_type)
) engine=InnoDB default charset=utf8 comment '主键';

set global event_scheduler = 1;

create event if not exists remove_msg_event
  on schedule every 1 day starts date_add(date_add(curdate(),interval 1 day),interval 1 hour)
  on completion preserve enable
  do
    delete from msg where (msg_create_time + 1296000000) > unix_timestamp(now()) * 1000;
    delete from verify;

create event if not exists remove_verify_event
  on schedule every 1 day starts date_add(date_add(curdate(),interval 1 day),interval 1 hour)
  on completion preserve enable
  do
    delete from verify;
