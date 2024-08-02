import { products } from "../data/product.js";
import { Cart } from "./Cart.js";
console.log('hey');

export const displayProductInCart = () =>{
        let CartContainer = document.querySelector('.table-body')
    
        if(Cart.length === 0){
            console.log('You have not add any product to cart yet! please add your favourite items to cart now')
        }
    
        else{
            CartContainer.innerHTML = ''
            Cart.forEach((cartItem)=>{
                console.log('cart', cartItem);
                const subTotal = (cartItem.priceCents / 100 * cartItem.quantity).toFixed(2)
                
                CartContainer.innerHTML += `
                    <div class="table-row row1 flex flex-justify-center">
                    <div class="table-cell product">
                        <img src="${cartItem.image[0]}" alt="LCD Monitor">
                        <span>${cartItem.name}</span>
                        <i class="fa-solid fa-circle-xmark close-btn"></i>
                    </div>
                    <div class="table-cell">$${cartItem.priceCents}</div>
                    <div class="table-cell qty-box flex">
                        <!-- <select>
                            <option value="1">01</option>
                            <option value="1">02</option>
                            <option value="1">03</option>
                            <option value="1">04</option>
                            
                        </select> -->
                        ${cartItem.quantity}
                        <div class="up-down-icons flex flex-column">
                        <i class="fa-solid fa-chevron-up"></i>
                        <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                       
                        <div class="table-cell">$${subTotal}</div>
                </div>
                `
            })
        }
    }
    
   displayProductInCart()