import mysql from 'mysql2';
import process from 'process';

const connection = mysql.createConnection({
    host:process.env.DB_HOST||'localhost',
    user:process.env.DB_USER||'shiraz',
    password:process.env.DB_PASSWORD||'shiraz2017',
    database:process.env.DB_DATABASE||'todolistdb',
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
