document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Limpiar mensajes de error previos
        document.getElementById('userError').innerText = "";
        document.getElementById('passwordError').innerText = "";
        document.getElementById('loginError').innerText = "";

        const user = form.elements['user'].value.trim();
        const password = form.elements['password'].value.trim();

        let isValid = true;

        // Validar campo de usuario no esté vacío
        if (user === "") {
            isValid = false;
            document.getElementById('userError').innerText = "El campo Usuario no puede estar vacío.";
        }

        // Validar campo de contraseña no esté vacío
        if (password === "") {
            isValid = false;
            document.getElementById('passwordError').innerText = "El campo Contraseña no puede estar vacío.";
        }

        // Validar credenciales
        if (isValid && (user !== 'Admin' || password !== 'Admin')) {
            isValid = false;
            document.getElementById('loginError').innerText = "Usuario o contraseña incorrectos.";
        }

        if (isValid) {
            document.getElementById('loginError').innerText = "Inicio de sesión exitoso.";
            // Redirigir a otra página
            window.location.href = "/administrador/home"; // 
        }
    });
});
