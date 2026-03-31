


// Helper to get query parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const inputElement = document.querySelector(".searchInput");
const formElement = document.querySelector("form");
const resultsElement = document.querySelector(".movies");

// If search param exists, set input value and trigger search
document.addEventListener("DOMContentLoaded", () => {
  const searchValue = getQueryParam('search');
  if (searchValue && inputElement) {
    inputElement.value = searchValue;
    formElement.dispatchEvent(new Event('submit'));
  }
});


// Store last fetched movies for sorting
let lastFetchedMovies = [];

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultsElement.innerHTML = "";
  const inputValue = inputElement.value;
  const response = await fetch(
    `https://www.omdbapi.com/?s=${inputValue}&apikey=43083548`,
  );

  const data = await response.json();
  if (data.Response === "False" || !Array.isArray(data.Search)) {
    resultsElement.innerHTML = '<p>No movies found.</p>';
    lastFetchedMovies = [];
    return;
  }
  lastFetchedMovies = data.Search;
  renderMovies(lastFetchedMovies);
});




function renderMovies(movies) {
  const movieWrapper = document.querySelector(".movies");
  if (Array.isArray(movies) && movies.length > 0) {
    const movieHTML = movies.map((movie) => {
      return `<div class="movie">
          <figure class="movie__wrapper">
              <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
          </figure>
          <div class="movie__info">
              <h2 class="movie__title">${movie.Title}</h2>
              <p class="movie__year">${movie.Year}</p>
          </div>
      </div>`;
    }).join('');
    movieWrapper.innerHTML = movieHTML;
  } else {
    movieWrapper.innerHTML = '<p>No movies found.</p>';
  }
}

function filterMovies(event) {
  if (!Array.isArray(lastFetchedMovies) || lastFetchedMovies.length === 0) {
    return;
  }
  let sortedMovies = [...lastFetchedMovies];
  if (event.target.value === "A-Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (event.target.value === "Z-A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  renderMovies(sortedMovies);
}






