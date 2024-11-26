document.addEventListener('DOMContentLoaded', () => {
    const tablaSalas = document.getElementById('tablaSalas');
    const salaReservaSelect = document.getElementById('salaReserva');
    const listaReservas = document.getElementById('listaReservas');
    const salaForm = document.getElementById('salaForm');
    const reservaForm = document.getElementById('reservaForm');
  
    // Función para actualizar la lista de salas (tabla y desplegable)
    function actualizarSalas() {
      fetch('http://localhost:3000/salas')
        .then(response => response.json())
        .then(salas => {
          // Limpiar tabla y desplegable
          tablaSalas.innerHTML = '';
          salaReservaSelect.innerHTML = '';
  
          salas.forEach(sala => {
            // Agregar a la tabla
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${sala.id}</td>
              <td>${sala.nombre}</td>
              <td>${sala.capacidad}</td>
              <td>${sala.estado}</td>
            `;
            tablaSalas.appendChild(row);
  
            // Agregar al desplegable si la sala está activa
            if (sala.estado === 'activo') {
              const option = document.createElement('option');
              option.value = sala.id;
              option.textContent = sala.nombre;
              salaReservaSelect.appendChild(option);
            }
          });
        });
    }
  
    // Función para actualizar la lista de reservas
    function actualizarReservas() {
      fetch('http://localhost:3000/reservas')
        .then(response => response.json())
        .then(reservas => {
          listaReservas.innerHTML = '';
          reservas.forEach(reserva => {
            const li = document.createElement('li');
            li.textContent = `Sala: ${reserva.salaId} - Reservante: ${reserva.nombre} - Inicio: ${reserva.inicio} - Fin: ${reserva.fin}`;
            listaReservas.appendChild(li);
          });
        });
    }
  
    // Agregar nueva sala
    salaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombreSala').value;
      const capacidad = document.getElementById('capacidadSala').value;
      const estado = document.getElementById('estadoSala').value;
  
      fetch('http://localhost:3000/salas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, capacidad, estado })
      }).then(() => {
        salaForm.reset();
        actualizarSalas();
      });
    });
  
    // Agregar nueva reserva
    reservaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const salaId = document.getElementById('salaReserva').value;
      const nombre = document.getElementById('nombreReservante').value;
      const inicio = document.getElementById('inicioReserva').value;
      const fin = document.getElementById('finReserva').value;
  
      fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salaId, nombre, inicio, fin })
      }).then(() => {
        reservaForm.reset();
        actualizarReservas();
      });
    });
  
    // Inicializar datos
    actualizarSalas();
    actualizarReservas();
  });

  