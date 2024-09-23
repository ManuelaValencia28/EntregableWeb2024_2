const UserRepository = require('../repositories/userRepository');

class UserService {
    async registerUser(userData) {
        const { email, username } = userData;

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUserByEmail = await UserRepository.findByEmail(email);
        if (existingUserByEmail) {
            throw new Error('El correo electrónico ' + email + ' ya está registrado.');
        }

        // Verificar si ya existe un usuario con el mismo nombre de usuario (username)
        const existingUserByUsername = await UserRepository.findByUsername(username);
        if (existingUserByUsername) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        // Si todo es válido, proceder a registrar el usuario
        return UserRepository.createUser(userData);
    }
}

module.exports = new UserService();
