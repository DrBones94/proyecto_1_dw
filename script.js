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
  console.log(event)
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const imagenClonada = draggableElement.cloneNode(true);
  const dropzone = event.target;
  console.log(draggableElement);
  console.log(imagenClonada);

  let html = `
    <div class='card-carrito'>
      <div class='card-body-carrito'>
        
      </div>
    </div>
  `

  if (dropzone.classList.contains('dropzone')) {
    dropzone.classList.remove('dragzone');
    dropzone.innerHTML = '';
    dropzone.appendChild(imagenClonada);
  }
}