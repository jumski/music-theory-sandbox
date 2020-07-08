
function handleFile(file) {
  console.log('file', file);
}

function handleSelectFile(e) {
  const files = e.target.files;

  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleDrop({ dataTransfer: { files } }) {
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}


function run() {
  // file input
  const selectFile = document.getElementById('select-file');
  selectFile.addEventListener('change', handleSelectFile, false);

  // drop zone
  const dropzone = document.getElementById('dropzone');
  function highlight()   { dropzone.classList.add('highlight') }
  function unhighlight() { dropzone.classList.remove('highlight') }

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false)
  })
  ;['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, highlight, false);
  });
  ;['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, unhighlight, false);
  });
  dropzone.addEventListener('drop', handleDrop, false);
}

window.addEventListener('DOMContentLoaded', run)
