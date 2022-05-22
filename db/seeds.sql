INSERT INTO department (name)
VALUES 
    ('Marketing'),
    ('Engineering'),
    ('HR'),
    ('Programming'),
    ('IT'),
    ('Executive');

INSERT INTO role (title, salary, department_id)
VALUES('Account Executive', 100000, 1),
('Sr. Account Executive', 150000, 1),
('Sales Director', 200000, 1),
('HR Coordinator', 75000, 2),
('HR Generalist', 85000, 2),
('HR Director', 100000, 2),
('Jr. Developer', 85000, 3),
('Sr. Developer', 125000, 3),
('Programming Director', 225000, 3),
('IT Project Manager', 850000, 4),
('IT Project Director', 100000, 4),
('Chief Executive Officer', 300000, 5),
('Chief Operating Officer', 275000, 5),
('Chief Financial Officer', 275000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dottie', 'O''Neil', 1, NULL),
('Becky', 'Houlihan', 3, NULL),
('April', 'Romper', 4, 1);

