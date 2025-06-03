CREATE DATABASE feedback_db;

CREATE USER 'feedback_user'@'localhost' IDENTIFIED BY 'your_password';

GRANT ALL PRIVILEGES ON feedback_db.* TO 'feedback_user'@'localhost';

FLUSH PRIVILEGES;
USE feedback_db;
SELECT * FROM feedback;