import { products } from "../data/product.js";

export const handleBestSellingProducts=()=>{
    let productContainer = document.querySelector('#our-products')
    
    productContainer.innerHTML = ''

    products.forEach((product)=>{
        productContainer.innerHTML += `
            <div class="box">
                <div class="image-container">
                    <img src="${product.image[0]}" alt="img loading...">
                    <div class="img-icon">
                        <div class="icon-holder">
                            <i class="fa-regular fa-heart" id="${product.id}"></i>
                        </div>
                        <div class="icon-holder">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </div>
                    <button class="product-btn" id="${product.id}">Add to Cart</button>
                </div>
                <div class="product-details">
                    <h1 class="product-name">${product.name}</h1>
                    <div class="price">
                        <div class="price-cents">$${product.priceCents}</div>
                        <div class="discount">$${product.discounts}</div>
                    </div>
                    <div class="ratings">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span class="rating-num">(65px)</span>
                    </div>
                </div>
            </div>
        `
    })
}