var dropdownMenu = document.getElementById('dropdown-menu');
var profilePictureContainer = document.querySelector('.profile-picture-container');
var timeoutId;

// Function to show the dropdown menu
document.getElementById('profile-picture').addEventListener('click', function() {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Function to handle profile picture change
document.getElementById('change-picture').addEventListener('click', function() {
  document.getElementById('profile-picture-input').click();
});

// Function to load the profile picture from localStorage
function loadProfilePicture() {
  var loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    var savedImage = localStorage.getItem('profilePicture_' + loggedInUser);
    if (savedImage) {
      document.getElementById('profile-picture').src = savedImage;
    }
  }
}

// Function to handle the profile picture input change
document.getElementById('profile-picture-input').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      var imageUrl = e.target.result;
      document.getElementById('profile-picture').src = imageUrl;
      var loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        localStorage.setItem('profilePicture_' + loggedInUser, imageUrl); // Save image to localStorage
      }
    };
    reader.readAsDataURL(file);
  }
  dropdownMenu.style.display = 'none';
});

// Function to handle logout
document.getElementById('logout').addEventListener('click', function() {
  var loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    localStorage.removeItem('loggedInUser'); // Remove logged in user from localStorage on logout
  }
  window.location.href = 'login.html';
});

// Delay hiding the dropdown menu by 400ms after the cursor leaves the profile picture container
profilePictureContainer.addEventListener('mouseleave', function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    dropdownMenu.style.display = 'none';
  }, 400); // 400 milliseconds = 0.4 seconds
});

// Clear the timeout when the cursor enters the dropdown menu
dropdownMenu.addEventListener('mouseenter', function() {
  clearTimeout(timeoutId);
});

// Hide the dropdown menu when the cursor leaves the dropdown menu
dropdownMenu.addEventListener('mouseleave', function() {
  dropdownMenu.style.display = 'none';
});

// Load the profile picture when the page loads
window.onload = loadProfilePicture;
