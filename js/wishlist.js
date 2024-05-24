function addToWishlist(name, imageUrl, duration, rating, destinations, price) {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
    const wishlistItem = {
      name: name,
      imageUrl: imageUrl,
      duration: duration,
      rating: rating,
      destinations: destinations,
      price: price
    };

    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${loggedInUser}`)) || [];
    
    // Check if the item already exists in the wishlist
    const existingItemIndex = userWishlist.findIndex(item => 
      item.name === wishlistItem.name && 
      item.imageUrl === wishlistItem.imageUrl && 
      item.duration === wishlistItem.duration &&
      item.rating === wishlistItem.rating &&
      item.destinations === wishlistItem.destinations &&
      item.price === wishlistItem.price
    );

    if (existingItemIndex !== -1) {
      alert('This travel is already added to your wishlist.');
      return;
    }

    userWishlist.push(wishlistItem);
    localStorage.setItem(`wishlist_${loggedInUser}`, JSON.stringify(userWishlist));
  } else {
    console.log('User not logged in. Cannot add item to wishlist.');
  }
}




document.addEventListener('DOMContentLoaded', function() {
  const wishlistContainer = document.querySelector('.wishlist-container');
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${loggedInUser}`)) || [];
    let totalPrice = 0;
  
    userWishlist.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('wishlist-card');
  
      card.innerHTML = `
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="">
          <p>Duration: ${item.duration}</p>
          <p>Rating: ${item.rating}</p>
          <p>Destinations: ${item.destinations}</p>
          <p>Price: ${item.price}</p>
          <button onclick="deleteTravelItem('${loggedInUser}', ${index})">Delete</button>
      `;
  
      wishlistContainer.appendChild(card);
      totalPrice += parseFloat(item.price);
    });
  
    const totalPriceElement = document.getElementById('wishlist-total-price');
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  } else {
    console.log('User not logged in. Cannot display wishlist.');
  }
});

function deleteTravelItem(userKey, index) {
  const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userKey}`)) || [];
  userWishlist.splice(index, 1);
  localStorage.setItem(`wishlist_${userKey}`, JSON.stringify(userWishlist));
  location.reload();
}
function bookNow() {
  window.location.href = 'checkout.html'; 
}

