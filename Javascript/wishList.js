// Array to hold the wishlist items' IDs
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(productId) {
  // Check if the item is already in the wishlist
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistIcon(productId, true);
    console.log(`Product ${productId} added to wishlist.`);
  } else {
    console.log(`Product ${productId} is already in the wishlist.`);
  }
}

function removeFromWishlist(productId) {
  // Remove the item from the wishlist
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistIcon(productId, false);
  console.log(`Product ${productId} removed from wishlist.`);
}

function updateWishlistIcon(productId, added) {
  const productElement = document.querySelector(`[data-product-id="${productId}"]`);
  const heartIcon = productElement.querySelector('.fa-heart');
  if (added) {
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid');
  } else {
    heartIcon.classList.remove('fa-solid');
    heartIcon.classList.add('fa-regular');
  }
}

function handleWishlist() {
  document.querySelectorAll('.wishlist-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
      const productElement = event.target.closest('.box');
      const productId = productElement.getAttribute('data-product-id');
      if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    });
  });

  // Update UI for items already in wishlist
  wishlist.forEach(productId => updateWishlistIcon(productId, true));
}

export { handleWishlist };
