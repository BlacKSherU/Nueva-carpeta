document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let valid = true;
    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value
    // Validar el campo de nombre
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');
    if (name.trim() === '') {
        nameError.textContent = 'El nombre es obligatorio.';
        valid = false;
    } else if (/\d/.test(name)) {
        nameError.textContent = 'El nombre no puede contener números.';
        valid = false;
    } else {
        nameError.textContent = '';
    }

    // Validar el campo de email
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.includes('@') || !email.endsWith('.com')) {
        emailError.textContent = 'El correo electrónico debe contener "@" y terminar con ".com".';
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Por favor, introduce una dirección de correo electrónico válida.';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    // Validar el campo de mensaje
    const message = document.getElementById('message').value;
    const messageError = document.getElementById('messageError');
    if (message.trim() === '') {
        messageError.textContent = 'Por favor, introduce un mensaje.';
        valid = false;
    } else {
        messageError.textContent = '';
    }

    // Mostrar mensaje de éxito si el formulario es válido
    const formSuccess = document.getElementById
        ('formSuccess');
    const formError = document.getElementById('formError');
    if (valid) {
        // Realizar una solicitud AJAX para enviar los datos del formulario
        console.log("hola")
        $.ajax({
            url: '/emailapi',
            type: "POST",
            data: {
                titulo: name,
                correo: email,
                contenido: message,
                csrfmiddlewaretoken: csrf_token,
            },
            success: function (data) {
                formSuccess.style.display = 'block';
                formSuccess.textContent = `${name} - Correo enviado con éxito, Nos vamos a comunicar contigo en unas horas hábiles.`;

                // Limpiar los campos del formulario
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';

                // Ocultar el mensaje de éxito después de 5 segundos
                setTimeout(function () {
                    formSuccess.style.display = 'none';
                }, time_notification);
                /*else {
                formError.style.display = 'block';
                formError.textContent = `${name} - Hubo un error al enviar el correo. Por favor, intenta nuevamente.`;

                // Ocultar el mensaje de error después de 5 segundos
                setTimeout(function() {
                    formError.style.display = 'none';
                }, time_notification);*/
            }
        });
    } else {
        formSuccess.style.display = 'none';
        formError.style.display = 'none';
    }
});