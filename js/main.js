import { createCatalog } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.courses');

  if (!section) {
    return;
  }

  createCatalog(section);
});
