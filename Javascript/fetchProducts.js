// fetchProducts.js
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

export default fetchProducts;
