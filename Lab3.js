async function getRandomUserImage() {
  const proxyUrl = 'https://cors.bridged.cc/';
  const apiUrl = 'https://randomuser.me/api/';
  const response = await axios.get(proxyUrl + apiUrl);
  return response.data.results[0].picture.large;
}


async function hash(obj) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(obj));
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Función para leer archivos JSON Line y procesar cada línea

async function readJsonLines(jsonText, callback) {
     // Dividir el texto en líneas
  const lines = jsonText.split(/\r?\n/);

  // Procesar cada línea
  for (const line of lines) {
    if (line) {
      const obj = JSON.parse(line);
      callback(obj);
    }
  }
  }
  
  // Función para guardar los resultados en un archivo JSONL
  function saveJsonLine(data) {
 data = data; 
  }
  
  // Función principal para simular las subastas

  async function processFiles(customerFileContent, auctionFileContent) {
    const clientData = [];
    await readJsonLines(customerFileContent, (client) => {
      clientData.push(client);
    });
  // Leer datos de subastas y procesar cada subasta

    await readJsonLines(auctionFileContent, async (auction) => {
      
      var tree = new BinarySearchTree();
  // Insertar cada cliente en el árbol binario de búsqueda

      for (const customer of auction.customers) {
        tree.insert(customer);
      }
  // Eliminar los clientes con el menor presupuesto según el número de rechazos

      for (let i = 0; i < auction.rejection; i++) {
        const minNode = tree.getMinNode(tree.root);
        tree.remove(minNode.data);
      }
  // Encontrar el cliente ganador

      const winnerNode = tree.getMinNode(tree.root);
      const winnerClient = clientData.find((client) => client.dpi === winnerNode.data.dpi);
  // Crear el resultado con los datos del cliente ganador

      const result = {
        dpi: winnerClient.dpi,
        budget: winnerNode.data.budget,
        date: auction.customers[0].date,
        firstName: winnerClient.firstName,
        lastName: winnerClient.lastName,
        birthDate: winnerClient.birthDate,
        job: winnerClient.job,
        placeJob: winnerClient.placeJob,
        salary: winnerClient.salary,
        property: auction.property,
        signature: await hash(winnerClient),// Calcular el hash MD5 de los datos del cliente ganador
      };
  // Imprimir el resultado en la consola

      console.log(result);
      const resultsContainer = document.getElementById('results-container');

      // Crear un elemento div para cada resultado
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result');
    
      // Crear un elemento h3 para el nombre del cliente y agregarlo al div del resultado
      const nameElement = document.createElement('h3');
      nameElement.textContent = `${result.firstName} ${result.lastName}`;
      resultDiv.appendChild(nameElement);
    
      // Obtener una imagen aleatoria de la API 'Random User'
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const imageUrl = data.results[0].picture.large;
    
      // Crear un elemento img para la imagen del cliente y agregarlo al div del resultado
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = 'Random user';
    


      resultDiv.appendChild(imageElement);
    
      // Agregar el div del resultado al contenedor de resultados en el DOM
      resultsContainer.appendChild(resultDiv);


    });

  }