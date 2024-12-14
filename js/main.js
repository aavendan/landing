const databaseURL = 'https://landing-8e71d-default-rtdb.firebaseio.com/coleccion.json';

let sendData = () => {

    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

    // new Date().toLocaleString( locales, options )
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()

            // Recuperación de datos
            getData()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });

}

let getData = async () => {  

    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: "GET"
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map()

            if (Object.keys(data).length > 0) {
                for (let key in data) {

                    let { email, saved } = data[key]
                       
                    let date = saved.split(",")[0]
                       
                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1)
                }
            }
            // END

            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countSuscribers.size > 0) {

                subscribers.innerHTML = ''
       
                let index = 1;
                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                    <tr>
                        <th>${index}</th>
                        <td>${date}</td>
                        <td>${count}</td>
                    </tr>`
                    subscribers.innerHTML += rowTemplate
                    index++;
                }
            }
            // END

        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}

let ready = () => {
    console.log('DOM está listo')

    // Recuperación de datos
    getData()
}

let loaded = () => {

    let myform = document.getElementById('form');

    myform.addEventListener('submit', function (eventSubmit) {
        eventSubmit.preventDefault(); // Evita el comportamiento por defecto del formulario

        var emailElement = document.querySelector('.form-control-lg'); // Asigna el elemento con la clase 'form-control-lg'
        var emailText = emailElement.value; // Obtiene el valor del elemento

        if (emailText.length === 0) { // Verifica si la longitud es 0
            emailElement.focus(); // Lleva el enfoque al elemento

            emailElement.animate([
                { transform: 'translateX(0)' },  // Inicio
                { transform: 'translateX(50px)' }, // A 50px a la derecha
                { transform: 'translateX(-50px)' }, // A -50px a la izquierda
                { transform: 'translateX(0)' }  // De vuelta a la posición original
            ], {
                duration: 400, // Duración de la animación en milisegundos
                easing: 'linear' // Efecto de suavizado
            });

            return;

        }

        //Llamada a la función sendData()
     	sendData();

    });

}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)