-- ?CREATE DATABASE QUERY
CREATE DATABASE appointment_db;


-- ?APPOINTMENT TABLE CREATION QUERY

CREATE TABLE np_appointment_table (
    npat_id BIGINT NOT NULL AUTO_INCREMENT,
    client_type LONGTEXT NOT NULL,
    appointment_for LONGTEXT NOT NULL,
    package LONGTEXT NOT NULL,
    date_of_appointment DATETIME NOT NULL,
    client_id BIGINT NOT NULL,
    added_client_id BIGINT,
    status ENUM('CONFIRM', 'RESCHEDULE', 'CANCEL', 'REMOVE') NOT NULL DEFAULT 'CONFIRM',
    check_in DATETIME,
    check_out DATETIME,
    payment_status ENUM('PAID', 'UNPAID', 'COMPLEMENTARY', 'REFUND') DEFAULT 'UNPAID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npat_id),
    FOREIGN KEY(client_id) REFERENCES np_client_table(npct_id),
    FOREIGN KEY(added_client_id) REFERENCES np_client_table(npct_id)
);	

--?ADD DATA TO APPOINTMENT TABLE

INSERT INTO np_appointment_table (client_type, appointment_for, package, date_of_appointment, client_id) VALUES (?, ?, ?, ?, ?);

--?SELECT DATA FROM APPOINTMENT TABLE

SELECT np_appointment_table.npat_id, np_client_table.name, np_client_table.mobile_num, np_client_table.alternate_mobile_num, np_client_table.country_code, np_client_table.email, np_appointment_table.client_type, np_appointment_table.status, np_appointment_table.payment_status, np_appointment_table.check_in, np_appointment_table.check_out,
np_appointment_table.appointment_for, np_appointment_table.package,np_appointment_table.date_of_appointment FROM np_client_table INNER JOIN np_appointment_table ON npct_id = client_id AND client_id = ?;

--?GET ALL APPOINTMENTS BETWEEN SPECIFIC DATE

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

-- ?ADD USER TO EXISTING APPOINTMENT
UPDATE `np_appointment_table` SET  `added_client_id` = ? WHERE `npat_id` = ? AND `int_delete_flag` = 0;

-- ?All count of all registrations for a date

SELECT COUNT(npat_id) AS 'total_appointment_count', COUNT( CASE WHEN appointment_for = 'Re Registration' THEN npat_id END ) AS count_re_registration, COUNT( CASE WHEN appointment_for = 'Diet Change' THEN npat_id END ) AS count_diet_change, COUNT( CASE WHEN appointment_for = 'New Registration' THEN npat_id END ) AS count_new_registration, DATE(date_of_appointment) as 'date_of_appointment' FROM np_appointment_table WHERE int_delete_flag = 0 GROUP BY DATE(date_of_appointment);

-- ?Add client to an existing meeting

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
    alternate_mobile_num LONGTEXT NOT NULL,
    country_code LONGTEXT NOT NULL,
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

-- ?ADD CLIENT DATA

INSERT INTO np_client_table (name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- ?GET CLIENTS

SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0;

-- ?GET SINGLE CLIENT
SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and npct_id = ?;

-- ?GET CLIENT WITH THE SPECIFIED PHONE NUMBER
SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and mobile_num = ?;

-- ?GET CLIENT WITH  THE SPEICIFIED EMAIL ADDRESS
SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and email = ?;

-- ?GET CLIENT WITH THE SPECIFIED NAME TO CHECK IF A CLIENT WITH SAME NAME ALREADY EXISTS (WHILE ADDING CLIENT DATA)
SELECT name FROM np_client_table WHERE name = ?;

-- ?COMPARE CLIENT'S email TO CHECK IF CLIENT'S email ALREADY EXISTS IN TABLE AND NOT TO SELECT CURRENTLY PROVIDED email (WHILE UPDATING CLIENT DATA)
SELECT email FROM np_client_table WHERE email = ? AND npct_id != ?;
-- ?WE PROVIDE THE SECOND ARGUMENT AS CURRENTLY PROVIDED email, JUST IN CASE THE QUERY RETURNS THE CURRENT CLIENT AS RESULT

-- ?COMPARE CLIENT'S phone TO CHECK IF CLIENT'S phone ALREADY EXISTS IN TABLE AND NOT TO SELECT CURRENTLY PROVIDED phone (WHILE UPDATING CLIENT DATA)
SELECT phone FROM np_client_table WHERE phone = ? AND npct_id != ?;
-- ?WE PROVIDE THE SECOND ARGUMENT AS CURRENTLY PROVIDED phone, JUST IN CASE THE QUERY RETURNS THE CURRENT CLIENT AS RESULT

--?UPDATE CLIENT DATA
UPDATE np_client_table SET name = ?, gender = ?, email = ?, dob = ?, mobile_num = ?, country_name = ?, state_name = ?, city_name = ?, address_home = ?, address_office = ?, telephone_home = ?, telephone_office = ?, martial_status = ?, about_client = ? WHERE int_delete_flag = 0 and id = ?;

--?DELETE CLIENT RECORD (JUST SET THE int_delete_flag to 1 TO DENOT THAT ROW AS DELETED)
UPDATE np_client_table SET int_delete_flag = 1 WHERE npct_id = ?;

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

--?INSERT CLIENT'S HELATH DATA
INSERT INTO np_client_health_table (enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

--?UPDATE CLIENT'S HEALTH DATA
UPDATE np_client_health_table SET enrollment_purpose = ?, diet = ?, occupation =? , travel_often = ?, out_side_meals = ?, peak_hunger_time = ?, acidity = ?, gas = ?, constipation = ?, hair_fall = ?, acne = ?, weakness = ?, insomnia = ?, any_other = ? WHERE int_delete_flag = 0 AND npcht_id = ?;

--?GET ALL CLIENTS HEALTH DATA
SELECT npcht_id, enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id FROM np_client_health_table WHERE int_delete_flag = 0;

--? GET CLIENT DATA WITH ID
SELECT npcht_id, enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id FROM np_client_health_table WHERE int_delete_flag = 0 AND npcht_id = ?;

--?JOIN DATA OF CLIENT TABLE AND CLIENT HEALTH TABLE FOR A SPECIFIC CLIENT
SELECT np_client_table.name, np_client_health_table.enrollment_purpose, np_client_health_table.diet, np_client_health_table.occupation,
np_client_health_table.travel_often, np_client_health_table.out_side_meals, np_client_health_table.peak_hunger_time, np_client_health_table.acidity,
np_client_health_table.gas, np_client_health_table.constipation, np_client_health_table.hair_fall, np_client_health_table.acne, np_client_health_table.weakness,
np_client_health_table.insomnia, np_client_health_table.any_other FROM np_client_table INNER JOIN np_client_health_table ON np_client_table.npct_id = np_client_health_table.client_id AND np_client_table.npct_id = ?;

--?JOIN DATA OF CLIENT TABLE AND CLIENT HEALTH TABLE FOR ALL CLIENTS
SELECT np_client_table.name, np_client_health_table.enrollment_purpose, np_client_health_table.diet, np_client_health_table.occupation,
np_client_health_table.travel_often, np_client_health_table.out_side_meals, np_client_health_table.peak_hunger_time, np_client_health_table.acidity,
np_client_health_table.gas, np_client_health_table.constipation, np_client_health_table.hair_fall, np_client_health_table.acne, np_client_health_table.weakness,
np_client_health_table.insomnia, np_client_health_table.any_other FROM np_client_table INNER JOIN np_client_health_table ON np_client_table.npct_id = np_client_health_table.client_id;

--?DELETE CLIENT HEALTH DATA
UPDATE np_client_health_table SET int_delete_flag = 1 WHERE client_id = ?;

-- ?TABLE TO HOLD CLIENT'S VITAMIN CONSUMPTION

CREATE TABLE np_client_vitamins (
    npcv_id BIGINT NOT NULL AUTO_INCREMENT, 
    vitamin_name LONGTEXT,
    vitamin_dosage LONGTEXT,
    vitamin_timing LONGTEXT,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npcv_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

--?INSERT CLIENT'S VITAMIN DATA
INSERT INTO np_client_vitamins (vitamin_name, vitamin_dosage, vitamin_timing, client_id) VALUES (?, ?, ?, ?);

--?DELETE ALL THE VITAMINS RELATED TO A CLIENT
UPDATE np_client_vitamins SET int_delete_flag = 1 WHERE client_id = ?;

--?JOIN CLIENT TABLE AND CLIENT VITAMINS TABLE
SELECT np_client_table.name, np_client_vitamins.vitamin_name, np_client_vitamins.vitamin_dosage, np_client_vitamins.vitamin_timing FROM np_client_table INNER JOIN np_client_vitamins ON np_client_table.npct_id = client_id = client_id = ?;

-- ?TABLE TO HOLD MEDICAL HISTORY OF CLIENT'S FAMILY

CREATE TABLE np_client_family_med_history (
    npcfmh_id BIGINT NOT NULL AUTO_INCREMENT,
    diabetes JSON NOT NULL,
    hypertension JSON NOT NULL,
    heart_disease JSON NOT NULL,
    hypothyroid JSON NOT NULL,
    cancer JSON NOT NULL,
    overweight JSON NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npcfmh_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

--? INSERT CLIENT'S FAMILY MEDICAL HISTORY
INSERT INTO np_client_family_med_history (diabetes, hypertension, heart_disease, hypothyroid, cancer, overweight,client_id) VALUES (?, ?, ?, ?, ?, ?, ?);

--?GET CLIENT FAMILT MEDICAL HISTORY
SELECT diabetes, hypertension, heart_disease, hypothyroid, cancer, overweight FROM np_client_family_med_history WHERE int_delete_flag = 0 AND client_id = ?;

--?JOIN CLIENT TABLE AND CLIENT FAMILY MEDICAL HISTORY
SELECT np_client_table.name, np_client_family_med_history.diabetes, np_client_family_med_history.hypertension, np_client_family_med_history.heart_disease,
np_client_family_med_history.hypothyroid, np_client_family_med_history.cancer, np_client_family_med_history.overweight FROM np_client_table INNER JOIN np_client_family_med_history WHERE npct_id = client_id AND client_id = ?;

--?DELETE CLIENT'S FAMILT MEDICAL HISTORY
UPDATE np_client_family_med_history SET int_delete_flag = 0 WHERE client_id = ?;

-- ?TABLE TO HOLD AVG EATING PATTERN OF CLIENT

CREATE TABLE np_avg_eating_pattern (
    npaep_id BIGINT NOT NULL AUTO_INCREMENT,
    breakfast ENUM("HOME", "OFFICE", "PACKED_TIFFIN", "RESTAURANT") NOT NULL,
    breakfast_detail LONGTEXT NOT NULL,
    lunch ENUM("HOME", "OFFICE", "PACKED_TIFFIN", "RESTAURANT") NOT NULL,
    lunch_detail LONGTEXT NOT NULL,
    snacks ENUM("HOME", "OFFICE", "PACKED_TIFFIN", "RESTAURANT") NOT NULL,
    snacks_detail LONGTEXT NOT NULL,
    dinner ENUM("HOME", "OFFICE", "PACKED_TIFFIN", "RESTAURANT") NOT NULL,
    dinner_detail LONGTEXT NOT NULL,
    client_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    int_delete_flag TINYINT DEFAULT 0,
    PRIMARY KEY (npaep_id),
    FOREIGN KEY (client_id) REFERENCES np_client_table(npct_id)
);

-- ?INSERT CLIENT'S AVG EATING PATTERN TO TABLE
INSERT INTO np_avg_eating_pattern (breakfast, lunch, snacks, dinner, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);

--?GET CLIENT'S AVG EATING PATTERN FROM TABLE
SELECT np_client_table.npct_id, np_avg_eating_pattern.breakfast, np_avg_eating_pattern.breakfast_detail, np_avg_eating_pattern.lunch,
np_avg_eating_pattern.lunch_detail, np_avg_eating_pattern.snacks, np_avg_eating_pattern.snacks_detail, np_avg_eating_pattern.dinner,
np_avg_eating_pattern.dinner_detail FROM np_client_table INNER JOIN np_avg_eating_pattern ON np_client_table.npct_id = client_id AND client_id = ?;


CREATE TABLE np_country_table (
    npct_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    PRIMARY KEY (npct_id)
);

INSERT INTO np_country_table (name) VALUES (?);

SELECT name FROM np_country_table;

CREATE TABLE np_state_table (
    npst_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    country_name LONGTEXT NOT NULL,
    PRIMARY KEY (npst_id)
);

INSERT INTO np_state_table (name, country_name) VALUES (?, ?);

SELECT name FROM np_state_table WHERE country_name = ?;

CREATE TABLE np_city_table (
    npct_id BIGINT NOT NULL AUTO_INCREMENT,
    name LONGTEXT NOT NULL,
    country_name LONGTEXT NOT NULL,
    state_name LONGTEXT NOT NULL,
    PRIMARY KEY (npct_id)
);

SELECT name FROM np_city_table WHERE country_name = ? AND state_name = ?;