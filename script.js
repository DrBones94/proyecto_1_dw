// Simulacion de base de datos con local storage
const productos = [
  {id: 'img1', nombre: 'Floor chicken', precio: 100},
  {id: 'img2', nombre: 'Fear the old blood', precio: 55},
  {id: 'img3', nombre: 'Gameblast', precio: 60},
  {id: 'img4', nombre: 'Nuka cola cap', precio: 95},
  {id: 'img5', nombre: 'Vault boy', precio: 155}
];

localStorage.setItem('productos', JSON.stringify(productos));

var sumaTotal = 0.0;
var cantidadTotal = 0;

const imagenes = document.querySelectorAll('img[draggable="true"]');
const dropzones = document.querySelectorAll('.dropzone');

imagenes.forEach(i => {
  i.addEventListener('dragstart', dragStart);
});

dropzones.forEach(dz => {
  dz.addEventListener('dragover', dragOver);
  dz.addEventListener('dragleave', dragLeave);
  dz.addEventListener('drop', dropImage);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
  event.target.classList.add('dragover');
}

function dragLeave(event) {
  event.target.classList.remove('dragover');
}

function dropImage(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  const total = document.getElementById('total');
  const cantidad = document.getElementById('cantidad');
  const productosLocalStorage = JSON.parse(localStorage.getItem('productos'));
  const producto = productosLocalStorage.find(p => p.id == id);


  let html = `
    <div class='card-carrito'>
      <div class='card-body-carrito'>
        ${draggableElement.outerHTML}
      </div>
    </div>
  `

  if (dropzone.classList.contains('dropzone')) {
    dropzone.classList.remove('dragzone');
    dropzone.insertAdjacentHTML('beforeend', html);

   
    sumaTotal += producto.precio;
    cantidadTotal ++;
    total.innerHTML = 'Total de compra: GTQ ' + sumaTotal;
    cantidad.innerHTML = 'Cantidad de productos: ' + cantidadTotal;
  }
}