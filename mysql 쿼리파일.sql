-- create table user(
-- id varchar(30),
-- password varchar(50) not null,
-- name varchar(30),
-- gender varchar(1), -- 0 : 여성, 1: 남성
-- age int,
-- phone varchar(30),
-- user_gbn varchar(1), -- 0 : 사용자 계정, 1 : 관리자(병원) 계정
-- remark varchar(100),
-- insert_date datetime, -- 가입일
-- update_date datetime, -- 수정일
-- primary key(id)
-- );

-- insert into user (id, password, name, gender, age, phone, user_gbn, remark, insert_date, update_date) 
-- 		  values ('admin0', '0000', '사용자측', '0', 30, '010-1234-1234', '0', '사용자계정으로 접속', now(), now() ) 

select * from user;