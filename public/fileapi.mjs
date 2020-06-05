
function handleFile(e) {
  const files = e.target.files;

  console.log(files);
}

function handleDrop({ dataTransfer: { files } }) {
  console.log('files', files);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function run() {
  const selectFile = document.getElementById('select-file');
  const dropzone = document.getElementById('dropzone');

  selectFile.addEventListener('change', handleFile, false);
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false)
  })
  dropzone.addEventListener('drop', handleDrop, false);
}

window.addEventListener('DOMContentLoaded', run)
