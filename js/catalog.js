import { CATEGORIES, COURSES, getCategoryLabel } from './data.js';

const PAGE_SIZE = 9;

function buildCategoryCounts() {
  const counts = {};
  counts['all'] = COURSES.length;
  CATEGORIES.forEach(({ id }) => {
    if (id !== 'all') {
      counts[id] = COURSES.filter((c) => c.category === id).length;
    }
  });
  return counts;
}

export function createCatalog(root) {
  const categoryCounts = buildCategoryCounts();

  const state = {
    activeCategory: 'all',
    searchQuery: '',
    visibleCount: PAGE_SIZE,
  };

  const elements = {
    filters: root.querySelector('.courses__filters'),
    search: root.querySelector('.courses__search-input'),
    grid: root.querySelector('.courses__grid'),
    empty: root.querySelector('.courses__empty'),
    loadMore: root.querySelector('.courses__load-more'),
  };

  let searchTimer = null;

  function getFilteredCourses() {
    const query = state.searchQuery.trim().toLowerCase();

    return COURSES.filter((course) => {
      const matchesCategory =
        state.activeCategory === 'all' || course.category === state.activeCategory;
      const matchesSearch = !query || course.title.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  function createCard(course) {
    const card = document.createElement('article');
    card.className = 'course-card';
    card.setAttribute('role', 'listitem');
    card.dataset.category = course.category;

    card.innerHTML = `
      <div class="course-card__media">
        <img
          class="course-card__image"
          src="${course.image}"
          alt="${course.author}"
          width="390"
          height="240"
          loading="lazy"
        >
      </div>
      <div class="course-card__content">
        <span class="course-card__badge course-card__badge--${course.category}">
          ${getCategoryLabel(course.category)}
        </span>
        <h3 class="course-card__title">${course.title}</h3>
        <div class="course-card__footer">
          <span class="course-card__price">$${course.price}</span>
          <span class="course-card__separator" aria-hidden="true">|</span>
          <span class="course-card__author">by ${course.author}</span>
        </div>
      </div>
    `;

    return card;
  }

  function renderFilters() {
    elements.filters.innerHTML = '';

    CATEGORIES.forEach((category) => {
      const item = document.createElement('li');
      item.className = 'courses__filters-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'courses__filter';
      button.dataset.category = category.id;

      if (category.id === state.activeCategory) {
        button.classList.add('courses__filter--active');
      }

      const labelSpan = document.createElement('span');
      labelSpan.className = 'courses__filter-label';
      labelSpan.textContent = category.label;
      button.appendChild(labelSpan);

      const countSup = document.createElement('sup');
      countSup.className = 'courses__filter-count';
      countSup.textContent = categoryCounts[category.id];
      button.appendChild(countSup);

      item.appendChild(button);
      elements.filters.appendChild(item);
    });
  }

  function render() {
    const filtered = getFilteredCourses();
    const visible = filtered.slice(0, state.visibleCount);
    const fragment = document.createDocumentFragment();

    visible.forEach((course) => {
      fragment.appendChild(createCard(course));
    });

    elements.grid.replaceChildren(fragment);
    elements.empty.hidden = visible.length > 0;
    elements.loadMore.hidden = filtered.length <= state.visibleCount;
  }

  function resetPagination() {
    state.visibleCount = PAGE_SIZE;
  }

  function setCategory(categoryId) {
    if (state.activeCategory === categoryId) {
      return;
    }

    state.activeCategory = categoryId;
    resetPagination();
    renderFilters();
    render();
  }

  function setSearchQuery(value) {
    state.searchQuery = value;
    resetPagination();
    render();
  }

  function loadMore() {
    state.visibleCount += PAGE_SIZE;
    render();
  }

  elements.filters.addEventListener('click', (event) => {
    const button = event.target.closest('.courses__filter');

    if (!button) {
      return;
    }

    setCategory(button.dataset.category);
  });

  elements.search.addEventListener('input', (event) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setSearchQuery(event.target.value);
    }, 150);
  });

  elements.loadMore.addEventListener('click', loadMore);

  renderFilters();
  render();

  return {
    setCategory,
    setSearchQuery,
    loadMore,
    getState: () => ({ ...state }),
  };
}
