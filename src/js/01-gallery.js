// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import _ from 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const ul = document.querySelector('.gallery');

galleryItems.forEach(item => {
  const newLi = document.createElement('li');
  newLi.classList.add('gallery__item');

  ul.appendChild(newLi);
  newLi.insertAdjacentHTML(
    'beforeend',
    `<a class= "gallery__link" href="${item.original}">

  <img
  class="gallery__image"
  src="${item.preview}"
alt="${item.description}" />
 </a>`
  );
});
const lightbox = new SimpleLightbox('.gallery li a', {
  captionData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
