







function openLoading() {
  document.body.classList.add("loading");
}

// Prevent form submission from refreshing the page and redirect with search value
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".home__search__bar");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      openLoading();
      const input = document.querySelector('.searchInput');
      const searchValue = input ? input.value : '';
      window.location.href = `movies.html?search=${encodeURIComponent(searchValue)}`;
    });
  }
});