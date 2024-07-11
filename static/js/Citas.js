$(function () {
    $('#date').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6],  // Disable Saturdays and Sundays
        minDate: new Date()  // Disable past dates
    });

    $('#time').datetimepicker({
        format: 'LT',
        stepping: 30,
        enabledHours: [8, 9, 10, 11, 12, 13, 14, 15, 16]
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const $form = document.querySelector('#contactForm');
    console.log('Formulario cargado:', $form);

    $form.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log('Evento submit detectado');

        const form = new FormData($form);

        // Validaciones
        let isValid = true;

        // Clear previous error messages and success message
        document.getElementById('nombreError').innerText = "";
        document.getElementById('apellidoError').innerText = "";
        document.getElementById('emailError').innerText = "";
        document.getElementById('fechaError').innerText = "";
        document.getElementById('horaError').innerText = "";
        document.getElementById('servicioError').innerText = "";
        document.getElementById('successMessage').innerText = "";

        // Validar campos de texto solo permiten letras y caracteres especiales
        const textFields = ['nombre', 'apellido'];
        textFields.forEach(field => {
            const value = form.get(field);
            if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
                isValid = false;
                document.getElementById(`${field}Error`).innerText = `El campo ${field} solo debe contener letras.`;
            }
        });

        // Validar campo de email
        const email = form.get('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            document.getElementById('emailError').innerText = 'El campo email debe ser un correo electrónico válido.';
        }

        // No permitir campos vacíos
        for (let [key, value] of form.entries()) {
            if (!value.trim() && key !== 'fecha' && key !== 'hora') {
                isValid = false;
                document.getElementById(`${key}Error`).innerText = `El campo ${key} no puede estar vacío.`;
            }
        }

        // Validar campo de selección "servicio"
        const servicio = form.get('servicio');
        if (servicio === '') {
            isValid = false;
            document.getElementById('servicioError').innerText = 'Debe seleccionar un servicio.';
        }

        // Validar fecha
        const fecha = form.get('fecha');
        const fechaSeleccionada = moment(fecha, 'MM/DD/YYYY').toDate();
        if (!fecha || fechaSeleccionada < new Date()) {
            isValid = false;
            document.getElementById('fechaError').innerText = 'Seleccione una fecha válida.';
        } else if (fechaSeleccionada.getDay() === 0 || fechaSeleccionada.getDay() === 6) {
            isValid = false;
            document.getElementById('fechaError').innerText = 'Seleccione una fecha de lunes a viernes.';
        }

        // Validar hora
        const hora = form.get('hora');
        const [horaSeleccionada, periodo] = hora.split(' ');
        const [horaHoras, horaMinutos] = horaSeleccionada.split(':').map(Number);
        const horaEn24Horas = periodo === 'PM' && horaHoras !== 12 ? horaHoras + 12 : horaHoras;
        if (!hora || horaEn24Horas < 8 || (horaEn24Horas === 16 && horaMinutos > 30) || horaEn24Horas > 16) {
            isValid = false;
            document.getElementById('horaError').innerText = 'Seleccione una hora entre 8:00 AM y 4:30 PM.';
        }

        if (!isValid) {
            return;
        }

        console.log('Datos del formulario:', form);
        const nombre = form.get("nombre");
        const apellido = form.get("apellido");
        const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value
        console.log(form.get("fecha"));
        console.log(form.get("hora"));
        $.ajax({
            url: '',
            type: "POST",
            data: {
                "dni": "nolopedimo",
                "nombre": nombre,
                "apellido": apellido,
                "telefono": "no lo pedimos",
                "direccion": "no lo pedimos",
                "email": email,
                csrfmiddlewaretoken: csrf_token,
            },
            success: function (data) {
                const id = data.id;
                $.ajax({
                    url: 'api/citas/',
                    type: "POST",
                    data: {
                        "fecha_reserva": fecha,
                        "fecha_entrega": fecha,
                        "estado": "reservacion",
                        "total_pagar": 1000,
                        "total_pagado": 100,
                        "cliente": id,
                        csrfmiddlewaretoken: csrf_token,
                    },
                    success: function (data) {
                        $form.reset();
                        $('#successModal').modal('show');
                        setTimeout(() => {
                            $('#successModal').modal('hide');
                        }, 4000);
                        document.getElementById('successMessage').innerText = "Formulario enviado correctamente.";
                    }
                });
            }
        });
        /**try {
            console.log("sexooooooooooooooooooooooooo")
            const response = await fetch($form.action, {
                method: $form.method,
                body: new URLSearchParams(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (response.ok) {
                $form.reset();
                $('#successModal').modal('show');
                setTimeout(() => {
                    $('#successModal').modal('hide');
                }, 4000);
                document.getElementById('successMessage').innerText = "Formulario enviado correctamente.";
            } else {
                document.getElementById('successMessage').innerText = "Hubo un problema con el envío del formulario. Intente nuevamente.";
            }
        } catch (error) {
            console.error('Error!', error.message);
            document.getElementById('successMessage').innerText = "Hubo un error al procesar la solicitud. Por favor, inténtelo nuevamente.";
        }*/
    });
});