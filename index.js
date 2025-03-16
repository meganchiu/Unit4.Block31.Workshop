/* import express and pg */
const express = require('express');
const pg = require('pg');

const client = new pg.Client(
  process.env.DATABASE_URL || 
  'postgres://megan.chiu:password@localhost:5432/acme_notes_db',
);

// Initialize application
const app = express();
const port = 3000;

const init = async() => {
  await client.connect();
  console.log('DB connected...')
  const SQL = /*sql*/ `
    DROP TABLE IF EXISTS employees;
    CREATE TABLE employees(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      phone VARCHAR(50),
      isAdmin BOOLEAN DEFAULT FALSE
    );
  `
  await client.query(SQL);
  console.log('Table created...');

  for (let employee of employees) {
    await client.query(
      `INSERT INTO employees (name, phone, isAdmin) VALUES ($1, $2, $3)`,
      [employee.name, employee.phone, employee.isAdmin]
    );
  }
  console.log('Data seeded...');

  app.listen(port, () => console.log(`listening on port ${port}`));
}

/* this middleware deals with CORS errors and allows the client on port 5173 to access the server */
const cors = require('cors');
/* morgan is a logging library that allows us to see the requests being made to the server */
const morgan = require('morgan');

/* set up express middleware */
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* set up intial hello world route */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* set up api route */
const employees = require("./db/index.js"); // Import employees array
app.get("/employees", async (req, res) => {
  try {
    const SQL = /* sql */ `
      SELECT id, name, phone, isadmin AS "isAdmin" FROM employees;
      `
    const response = await client.query(SQL);
    console.log('response: ', response);
    res.send(response.rows);
  } catch (error) {
  }
});

/* our middleware won't capture 404 errors, so we're setting up a separate error handler for those*/
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});
/* initialize server (listen) */

init();