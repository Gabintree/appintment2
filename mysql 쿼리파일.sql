-- create table user(
-- id varchar(30),
-- password varchar(50) not null,
-- name varchar(30),
-- gender varchar(1), -- 0 : 여성, 1: 남성
-- age int,
-- phone varchar(30),
-- user_gbn varchar(1), -- 0 : 사용자 계정, 1 : 관리자(병원) 계정
-- hospital_id varchar(30), -- uer_gbn이 1일 경우 기관ID 입력 필수, 기본값 null
-- insert_date datetime, -- 가입일
-- update_date datetime, -- 수정일
-- primary key(id)
-- );

-- insert into user (id, password, name, gender, age, phone, user_gbn, hospital_id, insert_date, update_date) 
-- 		  values ('admin0', '0000', '사용자측', '0', 30, '010-1234-1234', '0', null, now(), now() ) ;

select * from user;