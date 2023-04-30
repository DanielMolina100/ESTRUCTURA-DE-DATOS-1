// Importar el módulo 'fs' para trabajar con el sistema de archivos.

// Definición de la clase House con sus propiedades.

class House {
    constructor() {
        this.zoneDangerous = "";
        this.address = "";
        this.price = 0.0;
        this.contactPhone = "";
        this.id = "";
    }
}
// Definición de la clase Apartment con sus propiedades.

class Apartment {
    constructor() {
        this.isPetFriendly = false;
        this.address = "";
        this.price = 0.0;
        this.contactPhone = "";
        this.id = "";
    }
}
// Definición de la clase Premise con sus propiedades.

class Premise {
    constructor() {
        this.commercialActivities = [];
        this.address = "";
        this.price = 0.0;
        this.contactPhone = "";
        this.id = "";
    }
}

// Definición de la clase Builds que almacena arreglos de diferentes tipos de propiedades.


class Builds {
    constructor() {
        this.Premises = [];
        this.Apartments = [];
        this.Houses = [];
    }
}
// Definición de la clase Input1 con sus propiedades.

class Input1 {
    constructor() {
        this.services = new Map();
        this.builds = new Builds();
    }
}

// Definición de la clase Input2 con sus propiedades.


class Input2 {
    constructor() {
        this.budget = 0.0;
        this.typeBuilder = "";
        this.requiredServices = [];
        this.commercialActivity = null;
        this.wannaPetFriendly = null;
        this.minDanger = null;
    }
}

// Definición de la clase InputLab con sus propiedades.

class InputLab {
    constructor() {
        this.input1 = [];
        this.input2 = new Input2();
    }
}

// Función principal del programa.

function main(jsonText) {

    // Leer datos de entrada del archivo JSONL.

    for (let r = 0; r < 100; r++) {
        //const jsonText = fs.readFileSync('lab1/input_challenge_lab_2.jsonl', 'utf8');
        const jsonObjects = jsonText.split(/\r?\n/).filter(line => line.length > 0);
            // Parsear los objetos JSON y mapear los servicios a un objeto Map.

        const input = JSON.parse(jsonObjects[r], (key, value) => {
            if (key === 'services') {
                return new Map(Object.entries(value));
            }
            return value;
        });
    // Variables de control para resultados.

        let pricee = new Array(1000).fill(0);
        let DeterminarVacio = [false, false, false];
        let ColorD = 0;
        let res = 0;
        let idr = new Array(1000).fill("");
    // Búsqueda de apartamentos según los criterios.

        if (input.input2.typeBuilder === "Apartments") {
            input.input1.forEach(item => {
                if (item.builds.Apartments) {
                    item.builds.Apartments.forEach(apartment => {
                        if (apartment.isPetFriendly === input.input2.wannaPetFriendly && apartment.price <= input.input2.budget) {
                            idr[res] = apartment.id;
                            pricee[res] = apartment.price;
                            res++;
                        }
                    });
                }
            });
        }
    // Búsqueda de casas según los criterios.

        if (input.input2.typeBuilder === "Houses") {
            input.input1.forEach(item => {
                if (!item.builds.Houses) {
                    return;
                }

                DeterminarVacio[1] = true;
            // Iterar sobre las casas disponibles.

                item.builds.Houses.forEach(house => {
                    let id = house.id;
                    let precio = house.price;
                // Determinar el nivel de peligro de la zona de la casa.

                    let Color;
                    switch (house.zoneDangerous) {
                        case "Green":
                            Color = 3;
                            break;
                        case "Yellow":
                            Color = 2;
                            break;
                        case "Orange":
                            Color = 1;
                            break;
                        case "Red":
                            Color = 0;
                            break;
                        default:
                            Color = -1;
                    }
                // Verificar si la casa cumple con los criterios y almacenarla en los resultados.

                    if (Color <= ColorD && precio <= input.input2.budget) {
                        idr[res] = id;
                        pricee[res] = precio;
                         res++;
                }
            });

            DeterminarVacio[1] = false;
        });
    }
    // Búsqueda de locales comerciales según los criterios.

    if (input.input2.typeBuilder === "Premises") {
        let totalPremises = 0;
                // Calcular el número total de locales comerciales disponibles.

        input.input1.forEach(item => {
            if (item.builds.Premises) {
                totalPremises += item.builds.Premises.length;
            }
        });
        // Inicializar los arrays para almacenar los resultados de la búsqueda de locales comerciales.

        idr = new Array(totalPremises).fill("");
        pricee = new Array(totalPremises).fill(0);
        res = 0;
        let index = 0;
        // Iterar sobre los locales comerciales disponibles y verificar si cumplen con los criterios.

        input.input1.forEach(item => {
            if (item.builds.Premises) {
                item.builds.Premises.forEach(premise => {
                    if (premise.commercialActivities.includes(input.input2.commercialActivity) && premise.price <= input.input2.budget) {
                        idr[index] = premise.id;
                        pricee[index] = premise.price;
                        index++;
                        res++;
                    }
                });
            }
        });
    }
    // Funciones para implementar el algoritmo de ordenamiento quicksort.

    function quicksort(arr, ids, left, right) {
        if (left < right) {
            const pivotIndex = partition(arr, ids, left, right);
            quicksort(arr, ids, left, pivotIndex - 1);
            quicksort(arr, ids, pivotIndex + 1, right);
        }
    }

    function partition(arr, ids, left, right) {
        const pivotValue = arr[right];
        let pivotIndex = left - 1;

        for (let i = left; i < right; i++) {
            if (arr[i] <= pivotValue) {
                pivotIndex++;
                swap(arr, ids, pivotIndex, i);
            }
        }
        swap(arr, ids, pivotIndex + 1, right);
        return pivotIndex + 1;
    }

    function swap(arr, ids, i, j) {
        const tempD = arr[i];
        const tempS = ids[i];
        arr[i] = arr[j];
        ids[i] = ids[j];
        arr[j] = tempD;
        ids[j] = tempS;
    }
    // Llamar a la función quicksort para ordenar los resultados.

    quicksort(pricee, idr, 0, res - 1);

    const respuestaFinal = [];

    for (let i = 0; i < res; i++) {
      respuestaFinal.push(idr[i]);
    }
    
    console.log(respuestaFinal);
    const resultsContainer = document.getElementById('results-container');

// Llamar a la API de Pexels
// Llamar a la API de Pexels
fetch('https://api.pexels.com/v1/search?query=houses', {
  headers: {
    Authorization: '510UQgiafasXEiAOksNfya31RganFc0xIPHsZ0Wxtdwur3nGryQhKtJc'
  }
})
  .then(response => response.json())
  .then(data => {
    // Iterar sobre los resultados y crear un div con cada imagen y su nombre
    data.photos.forEach((photo, index) => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result');

      const nameElement = document.createElement('h3');
      nameElement.textContent = respuestaFinal[index];
      if(nameElement != "" || nameElement != null || nameElement != ''){
        resultDiv.appendChild(nameElement);
      
        const imageElement = document.createElement('img');
        imageElement.style.width = '60%';
  imageElement.style.height = 'auto';
        imageElement.src = photo.src.large;
        imageElement.alt = 'House';
        resultDiv.appendChild(imageElement);
        
        resultsContainer.appendChild(resultDiv);
      }
      
    });
  })
  .catch(error => {
    console.error(error);
  });
}
}

main();