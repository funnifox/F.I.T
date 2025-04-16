const pool = require("../services/db");

const SQLSTATEMENT = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username TEXT NOT NULL,
      description TEXT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      group_id INT,
      created_at TIMESTAMP
    );

    DROP TABLE IF EXISTS gatherings;
    CREATE TABLE gatherings (
      gathering_id INT AUTO_INCREMENT PRIMARY KEY,
      groupname TEXT NOT NULL,
      creator_id INT,
      created_at TIMESTAMP
    );

    DROP TABLE IF EXISTS workouts;
    CREATE TABLE workouts (
        workout_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token TEXT NOT NULL
    );
`;


pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});