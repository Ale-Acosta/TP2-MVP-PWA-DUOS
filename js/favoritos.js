const watchlist = document.getElementById('watchlist');

window.addEventListener('DOMContentLoaded', displayFavorites);

function displayFavorites() {
  const favorites = getFavorites();

  watchlist.innerHTML = '';

  if (favorites.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No tienes películas registradas como  favoritos.';
    watchlist.appendChild(message);
  } else {
    favorites.forEach(movie => {
      const movieElement = createMovieElement(movie);
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Quitar de favoritos';
      removeButton.className = 'btn btn-danger';
      removeButton.addEventListener('click', () => removeFromFavorites(movie));
      movieElement.querySelector('.card-body').appendChild(removeButton);
      watchlist.appendChild(movieElement);
    });
  }
}

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.className = 'card mb-3';

  const image = document.createElement('img');
  image.src = movie.Poster !== 'N/A' ? movie.Poster : 'images/default.jpeg';
  image.className = 'card-img-top';
  movieElement.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.textContent = movie.Title;
  title.className = 'card-title';
  cardBody.appendChild(title);

  const year = document.createElement('p');
  year.textContent = `Año: ${movie.Year}`;
  year.className = 'card-text';
  cardBody.appendChild(year);

  const actors = document.createElement('p');
  actors.textContent = `Actores: ${movie.Actors !== 'N/A' ? movie.Actors : 'No tenemos registro del elenco'}`;
  actors.className = 'card-text';
  cardBody.appendChild(actors);

  const director = document.createElement('p');
  director.textContent = `Director: ${movie.Director !== 'N/A' ? movie.Director : 'No tenemos registro del Direc.'}`;
  director.className = 'card-text';
  cardBody.appendChild(director);

  const imdbRating = document.createElement('p');
  imdbRating.textContent = `Calificación IMDb: ${movie.imdbRating !== 'N/A' ? movie.imdbRating : 'No tiene calificación'}`;
  imdbRating.className = 'card-text';
  cardBody.appendChild(imdbRating);

  movieElement.appendChild(cardBody);

  return movieElement;
}
function getFavorites() {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

function removeFromFavorites(movie) {
  const favorites = getFavorites();
  const index = favorites.findIndex(item => item.imdbID === movie.imdbID);
  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites); // Guardar el array actualizado
    displayFavorites();
  }
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

