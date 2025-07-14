document.getElementById('formContacto').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const formData = {
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        consulta: document.getElementById('query-type').value,
        productos: getSelectedProducts(),
        cantidad: document.getElementById('quantity').value || 'No especificada',
        mensaje: document.getElementById('message').value
    };

    // Generar tabla
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Llenar tabla con los datos del formulario
    for (const [key, value] of Object.entries(formData)) {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';

        // Celda del campo
        const cellField = document.createElement('td');
        cellField.className = 'p-3 text-sm text-gray-700 font-medium whitespace-nowrap align-top';
        cellField.textContent = formatFieldName(key);

        // Celda del valor
        const cellValue = document.createElement('td');
        cellValue.className = 'p-3 text-sm text-gray-900';

        if (key === 'mensaje') {
            // Para mensajes largos, usamos un div con scroll controlado
            const messageContainer = document.createElement('div');
            messageContainer.className = 'max-h-32 overflow-y-auto max-w-[300px] md:max-w-full whitespace-pre-wrap';
            messageContainer.textContent = value;
            cellValue.appendChild(messageContainer);
        } else {
            // Para otros campos
            cellValue.textContent = value;
            cellValue.className += ' break-words max-w-[150px] md:max-w-none';
        }

        row.appendChild(cellField);
        row.appendChild(cellValue);
        tableBody.appendChild(row);
    }

    // Mostrar tabla
    document.getElementById('resultTable').classList.remove('hidden');
    document.getElementById('resultTable').scrollIntoView({ behavior: 'smooth' });
});

// Función para obtener checkboxes seleccionados de productos
function getSelectedProducts() {
    const productCheckboxes = document.querySelectorAll('.product-checkbox:checked');
    return Array.from(productCheckboxes).map(cb => cb.nextElementSibling.textContent).join(', ') || 'Ningún producto seleccionado';
}

// Función para formatear los nombres de los campos
function formatFieldName(key) {
    const fieldNames = {
        'nombres': 'Nombres',
        'apellidos': 'Apellidos',
        'email': 'Correo electrónico',
        'telefono': 'Teléfono/Celular',
        'consulta': 'Tipo de consulta',
        'productos': 'Productos de interés',
        'cantidad': 'Cantidad estimada',
        'mensaje': 'Mensaje'
    };
    return fieldNames[key] || key;
}