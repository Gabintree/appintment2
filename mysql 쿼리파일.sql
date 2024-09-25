-- 스키마 생성
-- create database APPOINTMENT;

USE APPOINTMENT;

create table user_info(
user_id varchar(30),
<<<<<<< HEAD
user_pw varchar(500) not null, -- 암호화처리 하면서 100으로 길이 변경
user_name varchar(30),
resident_no varchar(30),
birth_date varchar(30), -- date에서 varcahr로 변경
=======
user_pw varchar(100) not null, -- 암호화처리 하면서 100으로 길이 변경
user_name varchar(30),
resident_no varchar(30),
birth_date date,
>>>>>>> origin/front_y
gender varchar(1), -- 0 : 여성, 1: 남성
phone varchar(30),
agreeGPS varchar(1), -- Y : 동의, N : 미동의 
insert_date datetime, -- 가입일
update_date datetime, -- 수정일
jwt_role varchar(30), -- jwt 로그인 권한 검증시 필요
<<<<<<< HEAD
jwt_refresh varchar(1000), -- jwt refresh token 값
=======
>>>>>>> origin/front_y
primary key(user_id)
);

create table hospital_info(
hospital_id varchar(30),
<<<<<<< HEAD
hospital_pw varchar(500) not null, -- 암호화처리 하면서 100으로 길이 변경
=======
hospital_pw varchar(100) not null, -- 암호화처리 하면서 100으로 길이 변경
>>>>>>> origin/front_y
corporate_no varchar(30), -- 사업자등록번호
group_id varchar(30), -- 기관ID
hospital_name varchar(30),
hospital_address varchar(100),
tell_no varchar(30),
insert_date datetime, -- 가입일
update_date datetime, -- 수정일
jwt_role varchar(30), -- jwt 로그인 권한 검증시 필요
<<<<<<< HEAD
jwt_refresh varchar(1000), -- jwt refresh token 값
primary key(hospital_id, group_id)
);
=======
primary key(hospital_id, group_id)
);

-- insert into user_info (id, password, name, gender, age, phone, user_gbn, hospital_id, insert_date, update_date) 
-- 		  values ('admin0', '0000', '사용자측', '0', 30, '010-1234-1234', '0', null, now(), now() ) ;
>>>>>>> origin/front_y


-- create table reserve(
-- reserve_no varchar(30), -- 예약번호 
-- user_id varchar(30),
-- group_id varchar(30),
-- hospital_name varchar(30),
-- hospital_address varchar(100),
-- subject varchar(30), -- 진료과목 
-- reserve_date datetime,
-- reserve_time time,
-- alarm_flag varchar(1), -- 알림톡 수신 여부
-- reserve_status varchar(1), -- I는 예약완료, U는 변경완료 
-- remark varchar(100), -- 예약시 메세지(증상 등) 
-- insert_user varchar(30), -- 등록자
-- insert_date datetime, -- 등록일
-- update_user varchar(30), -- 변경자
-- update_date datetime, -- 변경일
-- primary key(reserve_no),
-- foreign key(user_id)
-- references user_info(user_id)
-- );

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

create table hospital_alarm(
hospital_id varchar(30),
group_id varchar(30),
phone varchar(30), 
alarm_flag varchar(1), -- 알림톡 수신 여부
primary key(hospital_id, group_id),
foreign key(hospital_id, group_id)
references hospital_info(hospital_id, group_id)
);

select * from user_info;


<<<<<<< HEAD
=======
select * from user_info;

>>>>>>> origin/front_y


 


