// // Función para mostrar las citas almacenadas en localStorage
//     function mostrarCitas() {
//         const citas = [];

//         // Obtener todas las entradas de localStorage que empiecen con 'cita_'
//         for (let i = 0; i < localStorage.length; i++) {
//             const key = localStorage.key(i);
//             if (key.startsWith('cita_')) {
//                 const citaData = JSON.parse(localStorage.getItem(key));
//                 citas.push(citaData);
//             }
//         }

//         // Obtener el tbody de la tabla donde se mostrarán los datos
//         const tbody = document.querySelector('.table tbody');
//         tbody.innerHTML = ''; // Limpiar el contenido anterior de la tabla

//         // Recorrer todas las citas y construir las filas de la tabla
//         citas.forEach((cita, index) => {
//             const row = `
//                 <tr class="text-center">
//                     <td>${index + 1}</td>
//                     <td>${cita.id}</td>
//                     <td>${cita.nombre}</td>
//                     <td>${cita.apellido}</td>
//                     <td>${cita.email}</td>
//                     <td>${cita.fecha}</td>
//                     <td>${cita.hora}</td>
//                     <td>
//                         <a href="client-update.html" class="btn btn-success">
//                             <i class="fas fa-sync-alt"></i>
//                         </a>
//                     </td>
//                     <td>
//                         <button type="button" class="btn btn-warning eliminar-cita" data-id="${cita.id}">
//                             <i class="far fa-trash-alt"></i>
//                         </button>
//                     </td>
//                 </tr>
//             `;
//             tbody.innerHTML += row;
//         });

//         // Asociar función para eliminar citas a los botones correspondientes
//         const botonesEliminar = document.querySelectorAll('.eliminar-cita');
//         botonesEliminar.forEach(boton => {
//             boton.addEventListener('click', function() {
//                 eliminarCita(boton.dataset.id);
//             });
//         });
//     }

//     // Llama a la función mostrarCitas() después de que la página se haya cargado completamente
//     document.addEventListener('DOMContentLoaded', function() {
//         mostrarCitas();
//     });