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
    date_of_appointment DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npat_id)
);