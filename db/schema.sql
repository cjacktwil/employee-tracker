DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER UNSIGNED,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED,
    CONSTRAINT fk_roles FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER UNSIGNED,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    PRIMARY KEY (id) 
);