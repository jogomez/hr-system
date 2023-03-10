INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Customer Service"),
        (3, "Engineering"),
        (4, "Marketing"),
        (5, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales agent", 14000, 1),
        (2, "Sales Manager", 21000, 1),
        (3, "Customer Service Rep", 12000, 2),
        (4, "Engineer jr", 16500, 3),
        (5, "Engineer sr", 23000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Maria", "DB", 2, 1),
        (2, "Robert", "Half", 1, 1),
        (3, "Ernest", "Young", 3, 1),
        (4, "Michael", "Bloomberg", 5, 4),
        (5, "Michael", "Dell", 4, 4);

