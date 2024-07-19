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
  
    imageInput.addEventListener('change', function(event) {
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
      });
    });
  
    clearAllButton.addEventListener('click', function() {
      imagesArray = [];
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
  
    updateRemoveButtonVisibility();
  });
  