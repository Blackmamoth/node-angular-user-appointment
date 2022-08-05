-- CREATE DATABASE QUERY
CREATE DATABASE appointment_db;


-- APPOINTMENT TABLE CREATION QUERY

CREATE TABLE np_appointment_table (
    npat_id BIGINT NOT NULL AUTO_INCREMENT,
    country_code LONGTEXT NOT NULL,
    mobile_num LONGTEXT NOT NULL,
    alternate_mobile_num LONGTEXT NOT NULL,  
    name LONGTEXT NOT NULL,
    email LONGTEXT NOT NULL,
    client_type LONGTEXT NOT NULL,
    appointment_for LONGTEXT NOT NULL,
    package LONGTEXT NOT NULL,
    date_of_appointment DATETIME NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    added_user_id BIGINT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npat_id),
    FOREIGN KEY (user_id) REFERENCES np_user_table(nput_id),
    FOREIGN KEY (added_user_id) REFERENCES np_user_table(nput_id)
);

-- Get All appointments

SELECT * FROM np_appointment_table WHERE int_delete_flag = 0 ORDER BY date_of_appointment;

-- Get Appointment with id = ?

SELECT * FROM np_appointment_table WHERE npat_id = ? AND int_delete_flag = 0;

-- Insert an appointment into the table

INSERT INTO np_appointment_table (`country_code`, `mobile_num`, `alternate_mobile_num`, `name`, `email`, `client_type`, `appointment_for`, `package`, `date_of_appointment`, `user_id`, `added_user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Get All the appointments between two dates

SELECT * FROM `np_appointment_table` WHERE int_delete_flag = 0 AND DATE(date_of_appointment) BETWEEN ? AND ?;

-- Update a record in table

UPDATE `np_appointment_table` SET `country_code` = ?, `mobile_num` = ?, `alternate_mobile_num` = ?, `name` = ?, `email` = ?, `client_type` = ?, `appointment_for` = ?, `package` = ?, `date_of_appointment` = ? WHERE int_delete_flag = 0 AND npat_id = ?;

-- Delete a record from table

UPDATE `np_appointment_table` SET `int_delete_flag` = 1 WHERE npat_id = ?;

-- All count of all registrations for a date

SELECT COUNT(npat_id) AS 'total_appointment_count', COUNT( CASE WHEN appointment_for = 'Re Registration' THEN npat_id END ) AS count_re_registration, COUNT( CASE WHEN appointment_for = 'Diet Change' THEN npat_id END ) AS count_diet_change, COUNT( CASE WHEN appointment_for = 'New Registration' THEN npat_id END ) AS count_new_registration, DATE(date_of_appointment) as 'date_of_appointment' FROM np_appointment_table WHERE int_delete_flag = 0 GROUP BY DATE(date_of_appointment);

-- User table

CREATE TABLE np_user_table (
    nput_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    email LONGTEXT NOT NULL,
    mobile_num LONGTEXT NOT NULL,
    alternate_mobile_num LONGTEXT NOT NULL,
    package LONGTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (nput_id)
);

-- Add client to and existing meeting

UPDATE `np_appointment_table` SET  `added_user_id` = ? WHERE `npat_id` = ? AND `int_delete_flag` = 0;

-- TABLE TO HOLD COUNTRY CODE

CREATE TABLE np_country_code_table (
    npcct_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    dial_code LONGTEXT NOT NULL,
    code LONGTEXT NOT NULL,
    PRIMARY KEY (npcct_id)
);