import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { db } from '../firebaseConfig.js';

document.addEventListener('DOMContentLoaded', async () => {
  const productDetails = document.getElementById('productDetails');
  const loadingMessage = document.getElementById('loadingMessage'); // Element to show loading state

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const productId = getQueryParam('id');

  if (productId) {
    try {
      loadingMessage.style.display = 'block'; // Show loading message

      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        const product = productDoc.data();
        displayProductDetails(product);
      } else {
        productDetails.innerHTML = '<p>Product not found</p>';
      }
    } catch (error) {
      console.error("Error fetching product details: ", error);
      productDetails.innerHTML = '<p>Error fetching product details</p>';
    } finally {
      loadingMessage.style.display = 'none'; // Hide loading message
    }
  } else {
    productDetails.innerHTML = '<p>No product ID provided</p>';
  }

  function displayProductDetails(product) {
    productDetails.innerHTML = `
      <h2>${product.name}</h2>
      <div>
        ${product.images.map(image => `<img src="${image}" alt="${product.name}" class="product-image">`).join('')}
      </div>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Quantity: ${product.qty}</p>
      <p>Description: ${product.description}</p>
    `;
  }
});
