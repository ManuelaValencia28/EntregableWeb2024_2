const mysql = require('mysql2');

// Configura tu conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'electiva',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {
    // Búsqueda de un usuario por correo electrónico
    async findByEmail(email) {
        console.log(email);
        const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Búsqueda de un usuario por nombre de usuario (username)
    async findByUsername(username) {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Creación de un nuevo usuario
    async createUser(user) {
        const { username, email, password } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO users (username, email, password) 
                VALUES (?, ?, ?)`,
                [username, email, password]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();
