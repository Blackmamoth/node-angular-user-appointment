-- ?CREATE DATABASE QUERY
CREATE DATABASE appointment_db;


-- ?APPOINTMENT TABLE CREATION QUERY

-- CREATE TABLE np_appointment_table (
--     npat_id BIGINT NOT NULL AUTO_INCREMENT,
--     country_code LONGTEXT NOT NULL,
--     mobile_num LONGTEXT NOT NULL,
--     alternate_mobile_num LONGTEXT NOT NULL,  
--     name LONGTEXT NOT NULL,
--     email LONGTEXT NOT NULL,
--     client_type LONGTEXT NOT NULL,
--     appointment_for LONGTEXT NOT NULL,
--     package LONGTEXT NOT NULL,
--     date_of_appointment DATETIME NOT NULL UNIQUE,
--     user_id BIGINT NOT NULL,
--     added_user_id BIGINT NOT NULL DEFAULT 0,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     int_delete_flag TINYINT DEFAULT 0,
--     PRIMARY KEY (npat_id),
--     FOREIGN KEY (user_id) REFERENCES np_user_table(nput_id),
--     FOREIGN KEY (added_user_id) REFERENCES np_user_table(nput_id)
-- );

CREATE TABLE np_appointment_table (
    npat_id BIGINT NOT NULL AUTO_INCREMENT,
    client_type LONGTEXT NOT NULL,
    appointment_for LONGTEXT NOT NULL,
    package LONGTEXT NOT NULL,
    date_of_appointment DATETIME NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npat_id),
    FOREIGN KEY(client_id) REFERENCES np_client_table(npct_id)
);

-- ?Get All appointments

SELECT * FROM np_appointment_table WHERE int_delete_flag = 0 ORDER BY date_of_appointment;

-- ?Get Appointment with id = ?

SELECT * FROM np_appointment_table WHERE npat_id = ? AND int_delete_flag = 0;

-- ?Insert an appointment into the table

INSERT INTO np_appointment_table (`client_type`, `appointment_for`, `package`, `date_of_appointment`, `client_id`) VALUES (?, ?, ?, ?, ?);

-- ?Get All the appointments between two dates

SELECT * FROM `np_appointment_table` WHERE int_delete_flag = 0 AND DATE(date_of_appointment) BETWEEN ? AND ?;

-- ?Update a record in table

UPDATE `np_appointment_table` SET `client_type` = ?, `appointment_for` = ?, `package` = ?, `date_of_appointment` = ? WHERE int_delete_flag = 0 AND npat_id = ?;

-- ?Delete a record from table

UPDATE `np_appointment_table` SET `int_delete_flag` = 1 WHERE npat_id = ?;

-- ?All count of all registrations for a date

SELECT COUNT(npat_id) AS 'total_appointment_count', COUNT( CASE WHEN appointment_for = 'Re Registration' THEN npat_id END ) AS count_re_registration, COUNT( CASE WHEN appointment_for = 'Diet Change' THEN npat_id END ) AS count_diet_change, COUNT( CASE WHEN appointment_for = 'New Registration' THEN npat_id END ) AS count_new_registration, DATE(date_of_appointment) as 'date_of_appointment' FROM np_appointment_table WHERE int_delete_flag = 0 GROUP BY DATE(date_of_appointment);

-- ?User table

-- CREATE TABLE np_user_table (
--     nput_id BIGINT NOT NULL AUTO_INCREMENT,
--     name LONGTEXT NOT NULL,
--     email LONGTEXT NOT NULL,
--     mobile_num LONGTEXT NOT NULL,
--     alternate_mobile_num LONGTEXT NOT NULL,
--     package LONGTEXT NOT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     int_delete_flag TINYINT DEFAULT 0,
--     PRIMARY KEY (nput_id)
-- );

-- ?Add client to and existing meeting

-- UPDATE `np_appointment_table` SET  `added_user_id` = ? WHERE `npat_id` = ? AND `int_delete_flag` = 0;

-- ?TABLE TO HOLD COUNTRY CODE

CREATE TABLE np_country_code_table (
    npcct_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    dial_code LONGTEXT NOT NULL,
    code LONGTEXT NOT NULL,
    PRIMARY KEY (npcct_id)
);

CREATE TABLE np_holidays_table(
    npht_id BIGINT NOT NULL AUTO_INCREMENT,
    date LONGTEXT NOT NULL,
    title LONGTEXT NOT NULL,
    PRIMARY KEY(npht_id)
);

-- ?CLIENT/USER TABLE (replacement for the above table)

CREATE TABLE np_client_table (
    npct_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    gender ENUM('M', 'F', 'T') NOT NULL,
    email LONGTEXT NOT NULL,
    dob DATE NOT NULL,
    mobile_num LONGTEXT NOT NULL,
    country_name LONGTEXT NOT NULL,
    state_name LONGTEXT NOT NULL,
    city_name LONGTEXT NOT NULL,
    address_home LONGTEXT NOT NULL,
    address_office LONGTEXT,
    telephone_home LONGTEXT,
    telephone_office LONGTEXT,
    martial_status ENUM('Y', 'N', 'D') NOT NULL,
    about_client LONGTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npct_id)
);

-- ?ADD CLIENT

INSERT INTO np_client_table (name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- ?GET CLIENTS

SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0;

-- ?GET SINGLE CLIENT
SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and npct_id = ?;

-- ?GET CLIENT WITH THE SPECIFIED PHONE NUMBER
SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and mobile_num = ?;

-- ?TABLE TO STORE CLIENT'S HEALTH RELATED DATA

CREATE TABLE np_client_health_table (
    npcht_id BIGINT NOT NULL AUTO_INCREMENT,
    enrollment_purpose LONGTEXT NOT NULL,
    diet ENUM('V', 'NV', 'N+E') NOT NULL,
    occupation LONGTEXT NOT NULL,
    travel_often ENUM('Y', 'N') NOT NULL,
    out_side_meals LONGTEXT NOT NULL,
    peak_hunger_time LONGTEXT NOT NULL,
    acidity ENUM('Y', 'N', 'S') NOT NULL,
    gas ENUM('Y', 'N', 'S') NOT NULL,
    constipation ENUM('Y', 'N', 'S') NOT NULL,
    hair_fall ENUM('Y', 'N', 'S') NOT NULL,
    acne ENUM('Y', 'N', 'S') NOT NULL,
    weakness ENUM('Y', 'N', 'S') NOT NULL,
    insomnia ENUM('Y', 'N', 'S') NOT NULL,
    any_other LONGTEXT,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npcht_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

-- ?TABLE TO HOLD CLIENT'S VITAMIN CONSUMPTION

CREATE TABLE np_client_vitamins (
    npcv_id BIGINT NOT NULL AUTO_INCREMENT,
    vitamin_name LONGTEXT NOT NULL,
    vitamin_dosage LONGTEXT NOT NULL,
    vitamin_timing LONGTEXT NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npcv_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

-- ?TABLE TO HOLD MEDICAL HISTORY OF CLIENT'S FAMILY

CREATE TABLE np_client_family_med_history (
    npcfmh_id BIGINT NOT NULL AUTO_INCREMENT,
    mother JSON NOT NULL,
    father JSON NOT NULL,
    brother JSON NOT NULL,
    sister JSON NOT NULL,
    grandparent JSON NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npcfmh_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

-- ?TABLE TO HOLD AVG EATING PATTERN OF CLIENT

CREATE TABLE np_avg_eating_pattern (
    npaep_id BIGINT NOT NULL AUTO_INCREMENT,
    breakfast JSON NOT NULL,
    breakfast_detail LONGTEXT NOT NULL,
    lunch JSON NOT NULL,
    lunch_detail LONGTEXT NOT NULL,
    snacks JSON NOT NULL,
    snacks_detail LONGTEXT NOT NULL,
    dinner JSON NOT NULL,
    dinner_detail LONGTEXT NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npaep_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);