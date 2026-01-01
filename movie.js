const OMDB_KEY = "e919cb6";

const movieDetail = document.getElementById("movieDetail");
const params = new URLSearchParams(window.location.search);
const imdbID = params.get("imdbID");

if (!imdbID) {
  movieDetail.innerHTML = "<p>Movie not found</p>";
}

fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&plot=full`)
  .then(res => res.json())
  .then(movie => {
    movieDetail.innerHTML = `
      <div class="detail-grid">
        <div class="poster">
          <img src="${movie.Poster}" alt="${movie.Title}">
        </div>

        <div class="info">
          <h1>${movie.Title}</h1>
          <p class="meta">
            ⭐ ${movie.imdbRating} | ⏱ ${movie.Runtime} | 📅 ${movie.Year}
          </p>

          <p><b>Genre:</b> ${movie.Genre}</p>
          <p><b>Director:</b> ${movie.Director}</p>
          <p><b>Actors:</b> ${movie.Actors}</p>

          <p class="plot">${movie.Plot}</p>
        </div>
      </div>
    `;
  })
  .catch(() => {
    movieDetail.innerHTML = "<p>Error loading movie</p>";
  });
