document.getElementById('conceptoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/concepto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        fetchConceptos(); 
    })
    .catch(error => {
        alert('Error al enviar el concepto: ' + error.message);
    });
});



async function fetchConceptos() {
    try {
        const response = await fetch('http://localhost:3000/api/concepto');
        if (!response.ok) {
            throw new Error('Error al obtener los conceptos');
        }
        const conceptos = await response.json();
        displayConceptos(conceptos);
    } catch (error) {
        console.error('Error en fetchConceptos:', error);
    }
}


function displayConceptos(conceptos) {
    const conceptoList = document.getElementById('concepto-list');
    conceptoList.innerHTML = ''; 

    conceptos.forEach(concepto => {
        const listItem = document.createElement('li');
        listItem.className = 'concepto-item';
        
        
        listItem.style.backgroundImage = `url('${concepto.IMAGEN}')`;
        listItem.style.backgroundSize = 'cover'; 
        listItem.style.backgroundPosition = 'center'; 
        listItem.style.position = 'relative'; 

        listItem.innerHTML = `
            <div class="concepto-content">
                <strong>Concepto:</strong> ${concepto.CONCEPTO}<br>
                <strong>Descripción:</strong> ${concepto.DESCRIPCION}<br>
                <strong>Colaborador:</strong> ${concepto.COLABORADOR}<br>
            </div>
        `;
        
        conceptoList.appendChild(listItem);
    });
}
fetchConceptos();
