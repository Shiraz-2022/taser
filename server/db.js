import mysql from 'mysql2';
import process from 'process';

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting mysql database', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
})


export { connection };
