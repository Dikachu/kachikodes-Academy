function openModal(modalBody) {
    document.getElementById('modal').classList.add('show');
    document.getElementById('modal-body').innerHTML = modalBody;
};


function closeModal() {
  document.getElementById('modal').classList.remove('show');

  if (document.getElementById('modal').querySelector('.assignment-modal-body')) {
    resetForm()
  };
  
}


// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.classList.remove('show');
    }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
  }
});