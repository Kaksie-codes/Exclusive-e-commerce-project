document.addEventListener('DOMContentLoaded', () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistHolder = document.querySelector('.wishlist-holder');
  
    if (wishlist.length === 0) {
      wishlistHolder.innerHTML = '<p>No items in the wishlist.</p>';
    } else {
      wishlist.forEach(productId => {
        const productHTML = getProductHTML(productId);
        wishlistHolder.innerHTML += productHTML;
      });
    }
  });
  
  function getProductHTML(productId) {
    // Example placeholder HTML; replace with actual data retrieval logic
    return `
      <div class="box" data-product-id="${productId}">
        <div class="image-container">
          <img src="images/products/clothes.png" alt="img loading...">
          <div class="img-icon">
            <div class="icon-holder">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
          <button class="product-btn">Add to Cart</button>
        </div>
        <div class="product-details">
          <h1 class="product-name">Product Name</h1>
          <div class="price">
            <div class="price-cents">$300</div>
          </div>
        </div>
      </div>
    `;
  }
  