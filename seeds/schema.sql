DROP DATABASE IF EXISTS shadygoodsinc;
CREATE DATABASE shadygoodsinc;

Use shadygoodsinc;

CREATE TABLE departments(
    id INT NOT NULL AUTO_increment Primary Key
    , name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_increment Primary Key
    , title VARCHAR(30) NOT NULL
    , salary DECIMAL(15,2) NOT NULL
    , department_id INT
    , foreign key (department_id)
    references departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_increment Primary Key
    , first_name VARCHAR(30) NOT NULL
    , last_name VARCHAR(30) NOT NULL
    , role_id INT
    , manager_id INT
    , foreign key (role_id) 
    references roles(id)
    ON DELETE SET NULL
);