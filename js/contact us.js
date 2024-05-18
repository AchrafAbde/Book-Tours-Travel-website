function showContactPopup() {
  document.getElementById("contact-popup").style.display = "block";
}

function closeContactPopup() {
  document.getElementById("contact-popup").style.display = "none";
}

document.getElementById("contact-link").addEventListener("click", showContactPopup);

window.addEventListener("click", function(event) {
  var popup = document.getElementById("contact-popup");
  if (event.target == popup) {
    closeContactPopup();
  }
});

document.getElementById("close-btn").addEventListener("click", closeContactPopup);
