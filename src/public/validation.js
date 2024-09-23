document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    console.log("Iniciando validaciones");
    event.preventDefault();
    
    clearErrors();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    if (!validateUsername(username)) {
        showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (!validatePassword(password)) {
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Las contraseñas no coinciden.');
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password
                })
            });

            if (response.ok) {
                alert('Registro completado.');
                document.getElementById('registrationForm').reset();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar el usuario.');
        }
    }
});

document.getElementById('password').addEventListener('input', function() {
    let password = document.getElementById('password').value;
    let strengthBar = document.getElementById('passwordStrength');
    strengthBar.className = 'password-strength';

    if (password.length < 8) {
        strengthBar.classList.add('strength-weak');
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres.');
    } else if (password.length >= 8 && /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;])/.test(password)) {
        if (password.length >= 12) {
            strengthBar.classList.add('strength-strong');
            showError('passwordError', 'La contraseña es muy segura.');
        } else if (password.length >= 10) {
            strengthBar.classList.add('strength-good');
            showError('passwordError', 'La contraseña es segura.');
        } else {
            strengthBar.classList.add('strength-fair');
            showError('passwordError', 'La contraseña es débil.');
        }
    } else {
        strengthBar.classList.add('strength-weak');
        showError('passwordError', 'La contraseña es débil.');
    }
});

function validateUsername(username) {
    let usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}
