const inputElement = document.querySelector('.searchInput');
const formElement = document.querySelector("form");
const resultsElement = document.querySelector(".searchResults");

formElement.addEventListener("submit", async (event) => {
event.preventDefault();
resultsElement.innerHTML = "";
// const inputValue = inputElement.value;
const response = await fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=43083548${inputValue}`,);

const data = await response.json();
// console.log(data);
if (data.response === "False"){
    return;}
const movies = data.Search;
movies.forEach((movie) => {
    resultsElement.innerHTML += `
    <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>${movie.Plot}</p>
    </div>
    `;
 });
});








