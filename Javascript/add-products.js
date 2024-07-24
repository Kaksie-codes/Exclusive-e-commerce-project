import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js';


document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const smallImages = document.querySelectorAll('.small-image');
  const largeImage = document.getElementById('largeImage');
  const clearAllButton = document.getElementById('clearAllButton');
  const removeLargeImageButton = document.getElementById('removeLargeImageButton');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const defaultImageSrc = '/Images/image_placeholder.jpg';

  let currentImageIndex = 0;
  let imagesArray = [];
  let imageFiles = [];

  function updateLargeImage() {
    if (imagesArray.length > 0) {
      largeImage.src = imagesArray[currentImageIndex];
    } else {
      largeImage.src = defaultImageSrc;
    }
    updateRemoveButtonVisibility();
  }

  function updateRemoveButtonVisibility() {
    removeLargeImageButton.style.display = (largeImage.src !== defaultImageSrc) ? 'block' : 'none';
  }

  imageInput.addEventListener('change', async function(event) {
    const files = event.target.files;
    const maxFiles = 4;

    if (files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    Array.from(files).forEach((file, index) => {
      if (imagesArray.length >= smallImages.length) {
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        imagesArray.push(e.target.result);
        smallImages[imagesArray.length - 1].src = e.target.result;

        if (imagesArray.length === 1) {
          updateLargeImage();
        }
      };
      reader.readAsDataURL(file);

      // Upload image to Firebase Storage
      const storageRef = ref(getStorage(), `images/${file.name}`);
      imageFiles.push(file); // Save file for later use
      uploadBytes(storageRef, file)
        .then(() => console.log('Image uploaded successfully!'))
        .catch((error) => console.error('Error uploading image:', error));
    });
  });

  clearAllButton.addEventListener('click', function() {
    imagesArray = [];
    imageFiles = [];
    smallImages.forEach(img => {
      img.src = defaultImageSrc;
    });

    updateLargeImage();
    imageInput.value = '';
    currentImageIndex = 0;
  });

  removeLargeImageButton.addEventListener('click', function() {
    if (imagesArray.length > 0) {
      imagesArray.splice(currentImageIndex, 1);
      imageFiles.splice(currentImageIndex, 1);

      for (let i = currentImageIndex; i < smallImages.length; i++) {
        if (i < imagesArray.length) {
          smallImages[i].src = imagesArray[i];
        } else {
          smallImages[i].src = defaultImageSrc;
        }
      }

      if (currentImageIndex >= imagesArray.length) {
        currentImageIndex = 0;
      }

      updateLargeImage();
    }
  });

  leftArrow.addEventListener('click', function() {
    if (imagesArray.length > 0) {
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      updateLargeImage();
    }
  });

  rightArrow.addEventListener('click', function() {
    if (imagesArray.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      updateLargeImage();
    }
  });

  document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const qty = document.getElementById('qty').value;
    const description = document.getElementById('description').value;

    // Upload images and get URLs
    const imageUrls = [];
    for (const file of imageFiles) {
      const storageRef = ref(getStorage(), `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image: ' + error.message);
      }
    }

    // Add product to Firestore
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        price: parseFloat(price),
        category: category,
        qty: parseInt(qty),
        description: description,
        images: imageUrls,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Product added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding product: " + e.message);
    }

    document.getElementById('productForm').reset();
    imagesArray = [];
    imageFiles = [];
    smallImages.forEach(img => {
      img.src = defaultImageSrc;
    });
    updateLargeImage();
  });

  updateRemoveButtonVisibility();
});
