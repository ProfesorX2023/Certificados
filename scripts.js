document.addEventListener("DOMContentLoaded", function () {
    // Agrega el event listener al botón de búsqueda
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', searchAndGeneratePDF);
    }
  
    // Agrega el event listener al botón de descarga
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
      downloadButton.addEventListener('click', generatePDF);
    }
  });
  
  function searchAndGeneratePDF() {
    const studentNumber = document.getElementById('studentNumber').value;
    
    // Fetch the JSON data
    fetch('alumnos.json')
      .then(response => response.json())
      .then(data => {
        // Busca el alumno con el número proporcionado
        const student = data.alumnos.find(alumno => alumno.No == studentNumber);
  
        if (student) {
          // Use los datos para llenar el certificado
          document.getElementById('studentName').textContent = student.Nombre;
          document.getElementById('courseName').textContent = student.Curso;
          document.getElementById('completionDate').textContent = student.FechaTermino;
          document.getElementById('practiceHours').textContent = student.HorasPractica;
  
          // Muestra el botón de descarga
          const downloadButton = document.getElementById('downloadButton');
          if (downloadButton) {
            downloadButton.style.display = 'inline-block';
          }
        } else {
          alert('No se encontró un alumno con el número proporcionado.');
        }
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }
  
  function generatePDF() {
    const doc = new jsPDF();
  
    const studentName = document.getElementById('studentName').textContent;
    const courseName = document.getElementById('courseName').textContent;
    const completionDate = document.getElementById('completionDate').textContent;
    const practiceHours = document.getElementById('practiceHours').textContent;
  
    const content = `
      Certificado de Finalización
  
      Este certificado se otorga a:
      ${studentName}
  
      por completar con éxito el curso de:
      ${courseName}
  
      Fecha de finalización:
      ${completionDate}
  
      Horas de práctica:
      ${practiceHours}
    `;
  
    doc.text(content, 20, 20);
  
    // Guarda el archivo usando FileSaver.js
    doc.save('Certificado.pdf');
  }
  
  