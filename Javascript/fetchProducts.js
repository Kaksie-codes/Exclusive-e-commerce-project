import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { db } from '../firebaseConfig.js'

document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const productsList = document.getElementById('productsList');
  const loadingMessage = document.getElementById('loadingMessage');

  let products = [];

  async function retrieveItems() {
    const productsCollection = collection(db, "products");
    try {
      showLoading(); // Show the loading message
      const querySnapshot = await getDocs(productsCollection);
      products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      populateCategories(products);
      filterAndDisplayProducts();
    } catch (error) {
      console.error("Error retrieving items: ", error);
      alert("Error retrieving items: " + error.message);
    } finally {
      hideLoading(); // Hide the loading message
    }
  }

  function populateCategories(products) {
    const categories = new Set(products.map(product => product.category));
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function filterAndDisplayProducts() {
    const selectedCategory = categoryFilter.value;
    const searchQuery = searchInput.value.toLowerCase();
    const selectedPrice = priceFilter.value;

    let filteredProducts = products;

    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery));
    }

    const averagePrice = filteredProducts.reduce((sum, product) => sum + product.price, 0) / filteredProducts.length;

    if (selectedPrice !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        if (selectedPrice === 'cheap') return product.price < averagePrice;
        if (selectedPrice === 'average') return product.price >= averagePrice && product.price <= averagePrice * 1.5;
        if (selectedPrice === 'expensive') return product.price > averagePrice * 1.5;
      });
    }

    displayProducts(filteredProducts);
  }

  function displayProducts(products) {
    productsList.innerHTML = '';

    if (products.length === 0) {
      productsList.innerHTML = '<p>Product unavailable</p>';
      return;
    }

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <div>
          <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">     
          </div>
        </div>
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>Category: ${product.category}</p>
        <p>Quantity: ${product.qty}</p>  
      `;
      productDiv.addEventListener('click', () => {
        window.location.href = `more-info.html?id=${product.id}`;
      });
      productsList.appendChild(productDiv);
    });
  }

  function showLoading() {
    loadingMessage.style.display = 'block';
  }

  function hideLoading() {
    loadingMessage.style.display = 'none';
  }

  categoryFilter.addEventListener('change', filterAndDisplayProducts);
  searchInput.addEventListener('input', filterAndDisplayProducts);
  priceFilter.addEventListener('change', filterAndDisplayProducts);

  retrieveItems();
});
