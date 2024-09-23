const path = require('path');
const UserService = require('../services/userService');

class RegisterController {
    // Renderizar la página de registro
    getRegisterPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    }

    // Manejar el registro de usuarios
    async register(req, res) {
        try {
            const userData = req.body;
            console.log("Datos recibidos del formulario: ", userData); // Mejorar el log para mayor claridad
            const user = await UserService.registerUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RegisterController();
