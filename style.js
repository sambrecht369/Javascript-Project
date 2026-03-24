
function openLoading() {
    document.body.classList.add("loading");
}


const inputElement = document.querySelector(".searchInput");
const formElement = document.querySelector("form");
const resultsElement = document.querySelector(".movies");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  resultsElement.innerHTML ="";
  const inputValue = inputElement.value;
  const response = await fetch(
    `http://www.omdbapi.com/?s=${inputValue}&apikey=43083548`,
  );

  const data = await response.json();
  if (data.response === "False") {
    return;
  }
  const movies = data.Search;
  movies.forEach((movie) => {
    resultsElement.innerHTML += `
    <div class="movie">
        <figure class="movie__wrapper">
            <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
        </figure>
        <div class="movie__info">
            <h2 class="movie__title">${movie.Title}</h2>
            <p class="movie__year">${movie.Year}</p>
        </div>
    </div>
    `;
  });
});




