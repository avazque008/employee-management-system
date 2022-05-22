INSERT INTO department (name)
VALUES 
    ('Marketing'),
    ('Engineering'),
    ('Laboratory'),
    ('Programming'),
    ('Social Media'),
    ('Executive');

INSERT INTO role (title, salary, department_id)
VALUES('Account Executive', 100000, 1),
('Sr. Account Executive', 150000, 1),
('Sales Director', 200000, 1),
('Coordinator', 75000, 2),
('Intern', 85000, 2),
('Scientist Director', 100000, 2),
('Jr. Developer', 85000, 3),
('Beginner Developer', 125000, 3),
('Programming Director', 225000, 3),
('Social Media Manager', 850000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alex', 'Vazquez', 1, NULL),
('Reet', 'Velasquez', 3, NULL),
('Blanca', 'Guillermo', 4, 1);

