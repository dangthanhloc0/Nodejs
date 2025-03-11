import { pool } from "../config/db.js";

// Create Users Table
const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15), 
    password VARCHAR(255) NOT NULL,
    userType ENUM('user','admin') DEFAULT 'user',
    address VARCHAR(100),
    numberorderedtour INT,
    numberorderedtourexsist INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// Create TypeOfTours Table
const typeoftourTableQuery = `CREATE TABLE IF NOT EXISTS typeoftours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;



// Create Tours Table
const tourTableQuery = `CREATE TABLE IF NOT EXISTS tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    typeoftours_id INT NOT NULL,
    startplace VARCHAR(50) NOT NULL,
    endplace VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    day_number INT NOT NULL,
    night_number INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (typeoftours_id) REFERENCES typeoftours(id) ON DELETE CASCADE
);`;


// create type of tour Table
const typeoforderTableQuery = `CREATE TABLE IF NOT EXISTS typeoforders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// Create transporter of tour Table
const transportertourTableQuery = `CREATE TABLE IF NOT EXISTS transportertours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// Create DetailTours Table
const detailtourTableQuery = `CREATE TABLE IF NOT EXISTS detailtours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  startday DATETIME NOT NULL,
  endday DATETIME NOT NULL,
  description VARCHAR(255) NOT NULL,
  numberpeoplebooked INT NOT NULL,
  numerseatunoccupied INT NOT NULL,
  transportertourid INT NOT NULL,
  price DOUBLE NOT NULL,
  tour_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
  FOREIGN KEY (transportertourid) REFERENCES transportertours(id) ON DELETE CASCADE
);`;
// Create OrderTours Table
const ordertourTableQuery = `CREATE TABLE IF NOT EXISTS ordertours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  typeoforderid INT NOT NULL,
  user_id INT NOT NULL,
  numberpeople INT NOT NULL,
  totalprice DOUBLE NOT NULL,
  date DATETIME NOT NULL,
  detailtour_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (typeoforderid) REFERENCES  typeoforders(id) ON DELETE CASCADE,
  FOREIGN KEY (detailtour_id) REFERENCES detailtours(id) ON DELETE CASCADE
);`;


const scheduletourTableQuery = `CREATE TABLE IF NOT EXISTS scheduletours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const scheduletourdetailTableQuery = `CREATE TABLE IF NOT EXISTS scheduletourdetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  detailtourid INT NOT NULL,
  scheduletourid INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (detailtourid) REFERENCES detailtours(id) ON DELETE CASCADE,
  FOREIGN KEY (scheduletourid) REFERENCES scheduletours(id) ON DELETE CASCADE 
);`;



// Method to Create Query
const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

// Create All Tables
const createAllTable = async () => {
  try {
    await createTable("Users", userTableQuery);
    await createTable('transportertours',transportertourTableQuery);
    await createTable("TypeOfTours", typeoftourTableQuery);
    await createTable("Tours", tourTableQuery);
    await createTable("typeoforders",typeoforderTableQuery);
    await createTable("DetailTours", detailtourTableQuery);
    await createTable("OrderTours", ordertourTableQuery);
    await createTable('scheduletours',scheduletourTableQuery);
    await createTable('scheduletourdetails',scheduletourdetailTableQuery);

    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
