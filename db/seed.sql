INSERT INTO departments (department_name) VALUES 
("Administraton"), 
("Marketing"), 
("IT"), 
("Sales");

INSERT INTO roles (title, salary, department_id) VALUES 
("Executive Director", 150000, 1), 
("Secretary", 60000, 1),
("Director", 90000, 2),
("Specialist", 45000, 2),
("Director", 100000, 3),
("Engineer", 80000, 3),
("Director", 90000, 4),
("Associate", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
("Bob", "Smith", 1, NULL),
("Betty", "Ross", 2, 1),
("Maria", "Fain", 3, 1),
("Elizabeth", "Rogers", 4, 3),
("Craig", "Andrews", 5, 1),
("Dawn", "Wilson", 6, 5),
("Amber", "Jefferson", 7, 1),
("Josh", "Reid", 8, 7);