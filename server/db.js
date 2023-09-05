import mysql from 'mysql2';
import process from 'process';

const connection = mysql.createConnection({
    host:process.env.MYSQL_ADDON_HOST,
    user:process.env.MYSQL_ADDON_USER,
    password:process.env.MYSQL_ADDON_PASSWORD,
    database:process.env.MYSQL_ADDON_DB,
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
