-- 스키마 생성
create database APPOINTMENT;

USE APPOINTMENT;

create table user_info(
user_id varchar(30),
user_pw varchar(50) not null,
user_name varchar(30),
resident_no varchar(30),
birth_date date,
gender varchar(1), -- 0 : 여성, 1: 남성
phone varchar(30),
insert_date datetime, -- 가입일
update_date datetime, -- 수정일
primary key(user_id)
);

create table hospital_info(
hospital_id varchar(30),
hospital_pw varchar(50) not null,
corporate_no varchar(30), -- 사업자등록번호
group_id varchar(30), -- 기관ID
hospital_name varchar(30),
hospital_address varchar(100),
tell_no varchar(30),
insert_date datetime, -- 가입일
update_date datetime, -- 수정일
primary key(hospital_id, group_id)
);

-- insert into user_info (id, password, name, gender, age, phone, user_gbn, hospital_id, insert_date, update_date) 
-- 		  values ('admin0', '0000', '사용자측', '0', 30, '010-1234-1234', '0', null, now(), now() ) ;


create table reserve(
reserve_no varchar(30), -- 예약번호 
user_id varchar(30),
group_id varchar(30),
hospital_name varchar(30),
hospital_address varchar(100),
subject varchar(30), -- 진료과목 
reserve_date datetime,
reserve_time time,
alarm_flag varchar(1), -- 알림톡 수신 여부
remark varchar(100), -- 예약시 메세지(증상 등) 
primary key(reserve_no),
foreign key(user_id)
references user_info(user_id)
);

--  hospital_info 인덱스 생성 후 group_id 외래키 추가 처리 
create index idx_group_id on hospital_info(group_id);
alter table reserve add foreign key(group_id) references hospital_info(group_id);


create table hospital_status(
hospital_id varchar(30),
group_id varchar(30),
rush_hour_flag varchar(1),
primary key(hospital_id, group_id),
foreign key(hospital_id, group_id)
references hospital_info(hospital_id, group_id)
);


select * from user_info



 


