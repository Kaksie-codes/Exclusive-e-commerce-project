import { products } from "../data/product.js";

export let Cart = JSON.parse(localStorage.getItem('carts')) || [];

export const handleCart = () =>{
    const addToCart = () =>{
        const addToCartBtn = document.querySelectorAll('.product-btn')
        // console.log(addToCartBtn)

        Array.from(addToCartBtn).forEach(btn =>{
            btn.addEventListener('click', (e) => {
                const productID = e.target.getAttribute('id');
                const isProductInCart = Cart.some(cartItem => cartItem.id === productID);
                console.log(isProductInCart);

                if (isProductInCart) {
                    const productInCart = Cart.find(cartItem => cartItem.id === productID);
                    productInCart.quantity++;
                    localStorage.setItem('carts', JSON.stringify(Cart));
                    // displayProductInCart();
                  } else {
                    const productToAdd = products.find(product => product.id === productID);
                    productToAdd.quantity = 1; 
                    Cart.push(productToAdd);
                    localStorage.setItem('carts', JSON.stringify(Cart));
                    // displayProductInCart();
                  }
                  console.log(Cart)
            })

        })
        
    }
        
    
    addToCart();

// const displayProductInCart = () =>{
    //     let CartContainer = document.querySelector('.table-body')
    
    //     if(Cart.length === 0){
    //         console.log('You have not add any product to cart yet! please add your favourite items to cart now')
    //     }
    
    //     else{
    //         CartContainer.innerHTML = ''
    //         Cart.forEach((cartItem)=>{
    //             const subTotal = (cartItem.priceCents / 100 * cartItem.quantity).toFixed(2)
                
    //             CartContainer.innerHTML += `
    //                 <div class="table-row row1 flex flex-justify-center">
    //                 <div class="table-cell product">
    //                     <img src="${cartItem.image}" alt="LCD Monitor">
    //                     <span>${cartItem.name}</span>
    //                     <i class="fa-solid fa-circle-xmark close-btn"></i>
    //                 </div>
    //                 <div class="table-cell">$${cartItem.priceCents}</div>
    //                 <div class="table-cell qty-box flex">
    //                     <!-- <select>
    //                         <option value="1">01</option>
    //                         <option value="1">02</option>
    //                         <option value="1">03</option>
    //                         <option value="1">04</option>
                            
    //                     </select> -->
    //                     ${cartItem.quantity}
    //                     <div class="up-down-icons flex flex-column">
    //                     <i class="fa-solid fa-chevron-up"></i>
    //                     <i class="fa-solid fa-chevron-down"></i>
    //                     </div>
    //                 </div>
                       
    //                     <div class="table-cell">$${subTotal}</div>
    //             </div>
    //             `
    //         })
    //     }
    // }
    
    // displayProductInCart()

    
}