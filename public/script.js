document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const resizeForm = document.getElementById('resize');
  const imageNameInput = document.getElementById('imageName');
  const resizeResult = document.getElementById('resized');
  const uploadForm = document.getElementById('upload');
  const fileInput = document.getElementById('file');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');

  if (!gallery || !resizeForm || !imageNameInput || !resizeResult || !uploadForm || !fileInput || !widthInput || !heightInput) {
    console.error('One or more required elements are missing');
    return;
  }

  uploadForm.addEventListener('submit', handleUpload);
  resizeForm.addEventListener('submit', handleResize);

  async function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Image uploaded successfully');
        await loadGallery();
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  async function handleResize(event) {
    event.preventDefault();
    const imageName = imageNameInput.value;
    const width = widthInput.value;
    const height = heightInput.value;

    try {
      const response = await fetch(`/api/images?filename=${imageName}&width=${width}&height=${height}`);
      const imageUrl = response.url;

      if (response.ok) {
        resizeResult.innerHTML = `Your Resized Image is here: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;

      
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        resizeResult.appendChild(imgElement);
      } else {
        resizeResult.textContent = `Failed to resize image: ${response.statusText}`;
      }
    } catch (error) {
      console.error('Resize error:', error);
    }
  }

  async function loadGallery() {
    try {
      const response = await fetch('/api/images/list');
      const images = await response.json();

      gallery.innerHTML = '';

      images.forEach(image => {
        const container = document.createElement('div');
        container.classList.add('image');

        const imgElement = document.createElement('img');
        imgElement.src = `/api/images?filename=${image}`;
        imgElement.onerror = () => console.error(`Failed to load image: ${imgElement.src}`);

        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');

        const imageText = document.createElement('p');
        imageText.textContent = image;

        imageInfo.appendChild(imageText);
        container.appendChild(imgElement);
        container.appendChild(imageInfo);

        container.addEventListener('click', () => {
          imageNameInput.value = image;
          resizeForm.style.display = 'block';
        });

        gallery.appendChild(container);
      });
    } catch (error) {
      console.error('Gallery load error:', error);
    }
  }

  loadGallery();
});
