/*document.addEventListener('DOMContentLoaded', function() {
    // Manejar el registro de una persona
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;

        const soapRequest = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
                <soapenv:Header/>
                <soapenv:Body>
                    <pers:registerPerson>
                        <nombre>${nombre}</nombre>
                        <apellido>${apellido}</apellido>
                    </pers:registerPerson>
                </soapenv:Body>
            </soapenv:Envelope>`;

        console.log("SOAP Request:", soapRequest);

        try {
            const response = await fetch('http://localhost:8000/person', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'registerPerson'
                },
                body: soapRequest,
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const resultText = await response.text();
            console.log("SOAP Response:", resultText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(resultText, "text/xml");
            const message = xmlDoc.getElementsByTagName("message")[0]?.textContent;

            if (message) {
                alert(message);
            } else {
                console.error('Error: Response did not contain a message element');
                alert('Error: Response did not contain a message element');
            }
        } catch (error) {
            console.error('Error registering person:', error);
            alert('Error registering person');
        }
    });

    // Manejar la consulta de una persona
    document.getElementById('get-person-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const idCliente = document.getElementById('idCliente').value;

        const soapRequest = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
                <soapenv:Header/>
                <soapenv:Body>
                    <pers:getPerson>
                        <idCliente>${idCliente}</idCliente>
                    </pers:getPerson>
                </soapenv:Body>
            </soapenv:Envelope>`;

        console.log("SOAP Request:", soapRequest);

        try {
            const response = await fetch('http://localhost:8000/person', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'getPerson'
                },
                body: soapRequest,
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const resultText = await response.text();
            console.log("SOAP Response:", resultText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(resultText, "text/xml");
            const person = xmlDoc.getElementsByTagName("person")[0];

            if (person) {
                const nombre = person.getElementsByTagName("nombre")[0]?.textContent;
                const apellido = person.getElementsByTagName("apellido")[0]?.textContent;
                alert(`Nombre: ${nombre}, Apellido: ${apellido}`);
            } else {
                console.error('Error: Response did not contain a person element');
                alert('Error: Person not found');
            }
        } catch (error) {
            console.error('Error getting person:', error);
            alert('Error getting person');
        }
    });

    // Actualizar Persona
    document.getElementById('update-person-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const idCliente = document.getElementById('updateIdCliente').value;
        const nombre = document.getElementById('updateNombre').value;
        const apellido = document.getElementById('updateApellido').value;
    
        const soapRequest = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
                <soapenv:Header/>
                <soapenv:Body>
                    <pers:updatePerson>
                        <idCliente>${idCliente}</idCliente>
                        <nombre>${nombre}</nombre>
                        <apellido>${apellido}</apellido>
                    </pers:updatePerson>
                </soapenv:Body>
            </soapenv:Envelope>`;
    
        console.log("SOAP Request:", soapRequest);
    
        try {
            const response = await fetch('http://localhost:8000/person', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'updatePerson'
                },
                body: soapRequest,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
    
            const resultText = await response.text();
            console.log("SOAP Response:", resultText);
    
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(resultText, "text/xml");
            const message = xmlDoc.getElementsByTagName("message")[0]?.textContent;
            alert(message);
        } catch (error) {
            console.error('Error updating person:', error);
            alert('Error updating person');
        }
    });
    

    // Manejar la eliminación de una persona
    document.getElementById('delete-person-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const idCliente = document.getElementById('deleteIdCliente').value;

        const soapRequest = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
                <soapenv:Header/>
                <soapenv:Body>
                    <pers:deletePerson>
                        <idCliente>${idCliente}</idCliente>
                    </pers:deletePerson>
                </soapenv:Body>
            </soapenv:Envelope>`;

        console.log("SOAP Request:", soapRequest);

        try {
            const response = await fetch('http://localhost:8000/person', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'deletePerson'
                },
                body: soapRequest,
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const resultText = await response.text();
            console.log("SOAP Response:", resultText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(resultText, "text/xml");
            const message = xmlDoc.getElementsByTagName("message")[0]?.textContent;

            if (message) {
                alert(message);
            } else {
                console.error('Error: Response did not contain a message element');
                alert('Error: Response did not contain a message element');
            }
        } catch (error) {
            console.error('Error deleting person:', error);
            alert('Error deleting person');
        }
    });
});*/

/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
  
      const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
          <soapenv:Header/>
          <soapenv:Body>
            <pers:registerPerson>
              <nombre>${nombre}</nombre>
              <apellido>${apellido}</apellido>
            </pers:registerPerson>
          </soapenv:Body>
        </soapenv:Envelope>`;
  
      try {
        const response = await fetch('http://localhost:8000/person', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml',
            'SOAPAction': 'registerPerson'
          },
          body: soapRequest,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
  
        const resultText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(resultText, "text/xml");
        const message = xmlDoc.getElementsByTagName("message")[0]?.textContent;
  
        if (message) {
          alert(message);
        } else {
          console.error('Error: Response did not contain a message element');
          alert('Error: Response did not contain a message element');
        }
  
        loadPersonTable(); // Reload table after registration
      } catch (error) {
        console.error('Error registering person:', error);
        alert('Error registering person');
      }
    });
  
    async function loadPersonTable() {
      try {
        const soapRequest = `
          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
            <soapenv:Header/>
            <soapenv:Body>
              <pers:getAllPersons/>
            </soapenv:Body>
          </soapenv:Envelope>`;
  
        const response = await fetch('http://localhost:8000/person', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml',
            'SOAPAction': 'getAllPersons'
          },
          body: soapRequest
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
  
        const resultText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(resultText, "text/xml");
        const persons = xmlDoc.getElementsByTagName("person");
  
        const personTableBody = document.getElementById('person-table-body');
        personTableBody.innerHTML = '';
  
        for (const person of persons) {
          const idCliente = person.getElementsByTagName("idCliente")[0].textContent;
          const nombre = person.getElementsByTagName("nombre")[0].textContent;
          const apellido = person.getElementsByTagName("apellido")[0].textContent;
  
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${idCliente}</td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>
              <button class="btn btn-primary btn-sm edit-btn" data-id-cliente="${idCliente}" data-nombre="${nombre}" data-apellido="${apellido}">Editar</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id-cliente="${idCliente}">Eliminar</button>
            </td>
          `;
          personTableBody.appendChild(row);
        }
  
        // Agregar eventos a los botones de editar y eliminar
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
          button.addEventListener('click', () => {
            const idCliente = button.dataset.idCliente;
            const nombre = button.dataset.nombre;
            const apellido = button.dataset.apellido;
            // Aquí puedes agregar la lógica para editar la persona
            alert(`Editar persona: ID ${idCliente}, Nombre ${nombre}, Apellido ${apellido}`);
          });
        });
  
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
          button.addEventListener('click', () => {
            const idCliente = button.dataset.idCliente;
            // Aquí puedes agregar la lógica para eliminar la persona
            alert(`Eliminar persona: ID ${idCliente}`);
          });
        });
      } catch (error) {
        console.error('Error loading person table:', error);
      }
    }
  
    loadPersonTable();
  });*/
  

  document.addEventListener('DOMContentLoaded', function() {
    const personTableBody = document.getElementById('person-table-body');
    const editPersonForm = document.getElementById('edit-person-form');
    const editPersonModal = new bootstrap.Modal(document.getElementById('edit-person-modal'));

    // Manejar el registro de una persona
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;

        const soapRequest = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pers="http://www.example.org/person">
                <soapenv:Header/>
                <soapenv:Body>
                    <pers:registerPerson>
                        <nombre>${nombre}</nombre>
                        <apellido>${apellido}</apellido>
                    </pers:registerPerson>
                </soapenv:Body>
            </soapenv:Envelope>`;

        console.log("SOAP Request:", soapRequest);

        try {
            const response = await fetch('http://localhost:8000/person', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'registerPerson'
                },
                body: soapRequest,
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const resultText = await response.text();
            console.log("SOAP Response:", resultText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(resultText, "text/xml");
            const message = xmlDoc.getElementsByTagName("message")[0]?.textContent;

            if (message) {
                alert(message);
            } else {
                console.error('Error: Response did not contain a message element');
                alert('Error: Response did not contain a message element');
            }
        } catch (error) {
            console.error('Error registering person:', error);
            alert('Error registering person');
        }
    });

    // Función para cargar todas las personas
    async function loadPersons() {
        try {
            const response = await fetch('/getAllPersons');
            const persons = await response.json();
            personTableBody.innerHTML = '';
            persons.forEach(person => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${person.idCliente}</td>
                    <td>${person.nombre}</td>
                    <td>${person.apellido}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${person.idCliente}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${person.idCliente}">Eliminar</button>
                    </td>
                `;
                personTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading persons:', error);
        }
    }

    // Función para manejar la edición de personas
    personTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            const row = event.target.closest('tr');
            const nombre = row.children[1].textContent;
            const apellido = row.children[2].textContent;

            document.getElementById('edit-idCliente').value = id;
            document.getElementById('edit-nombre').value = nombre;
            document.getElementById('edit-apellido').value = apellido;

            editPersonModal.show();
        }
    });

    // Función para enviar el formulario de edición
    editPersonForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const idCliente = document.getElementById('edit-idCliente').value;
        const nombre = document.getElementById('edit-nombre').value;
        const apellido = document.getElementById('edit-apellido').value;

        try {
            const response = await fetch('/person', {
                method: 'POST',
                headers: { 'Content-Type': 'application/soap+xml' },
                body: `
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:per="http://www.example.org/person-service">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <per:updatePerson>
                                <per:idCliente>${idCliente}</per:idCliente>
                                <per:nombre>${nombre}</per:nombre>
                                <per:apellido>${apellido}</per:apellido>
                            </per:updatePerson>
                        </soapenv:Body>
                    </soapenv:Envelope>
                `
            });
            const text = await response.text();
            if (response.ok) {
                alert('Person updated successfully');
                loadPersons();
                editPersonModal.hide();
            } else {
                console.error('Error updating person:', text);
            }
        } catch (error) {
            console.error('Error updating person:', error);
        }
    });

    // Función para manejar la eliminación de personas
    personTableBody.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');

            if (confirm('Are you sure you want to delete this person?')) {
                try {
                    const response = await fetch('/person', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/soap+xml' },
                        body: `
                            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:per="http://www.example.org/person-service">
                                <soapenv:Header/>
                                <soapenv:Body>
                                    <per:deletePerson>
                                        <per:idCliente>${id}</per:idCliente>
                                    </per:deletePerson>
                                </soapenv:Body>
                            </soapenv:Envelope>
                        `
                    });
                    const text = await response.text();
                    if (response.ok) {
                        alert('Person deleted successfully');
                        loadPersons();
                    } else {
                        console.error('Error deleting person:', text);
                    }
                } catch (error) {
                    console.error('Error deleting person:', error);
                }
            }
        }
    });

    // Inicializar la carga de personas
    loadPersons();
});
