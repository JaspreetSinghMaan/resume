(() => {
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const photo = document.getElementById('profile-photo');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const searchInput = document.getElementById('publication-search');
  const publications = Array.from(document.querySelectorAll('.publication-item'));
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');
  let activeFilter = 'all';

  if (photo) photo.addEventListener('error', () => photo.classList.add('is-missing'));

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Close sections' : 'Sections';
      nav.classList.toggle('is-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Sections';
        nav.classList.remove('is-open');
      })
    );
  }

  function updatePublications() {
    if (!searchInput || !resultsCount) return;

    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    publications.forEach((item) => {
      const matchesFilter =
        activeFilter === 'all' || item.dataset.kind === activeFilter;
      const matchesSearch =
        !query || item.textContent.toLowerCase().includes(query);
      const show = matchesFilter && matchesSearch;

      item.hidden = !show;
      if (show) visible += 1;
    });

    resultsCount.textContent =
      'Showing ' + visible + ' of ' + publications.length + ' publications';

    if (noResults) noResults.hidden = visible !== 0;
  }

  filterButtons.forEach((button) =>
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      updatePublications();
    })
  );

  if (searchInput) searchInput.addEventListener('input', updatePublications);
})();
