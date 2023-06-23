const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const moviesList = document.getElementById('movies-list');
const favorites = [];
const loadingIndicator = document.getElementById('loading-indicator');
searchButton.addEventListener('click', searchMovies);

function searchMovies() {
  const searchTerm = searchInput.value;
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=f752675d`;

  loadingIndicator.classList.add('show'); // Mostrar indicador de carga

  fetch(url)
    .then(response => response.json())
    .then(data => {
      loadingIndicator.classList.remove('show'); // Ocultar indicador de carga

      if (data.Response === 'True') {
        const movies = data.Search;
        const moviePromises = movies.map(movie => fetchMovieDetails(movie.imdbID));
        Promise.all(moviePromises)
          .then(movieDetails => {
            movies.forEach((movie, index) => {
              movie.Year = movieDetails[index].Year;
              movie.Actors = movieDetails[index].Actors;
              movie.Director = movieDetails[index].Director;
              movie.imdbRating = movieDetails[index].imdbRating;
            });
            displayMovies(movies);
          })
          .catch(error => {
            console.error('Error al obtener los detalles de la película:', error);
            displayMessage('Error al obtener los detalles de la película.');
          });
      } else {
        displayMessage('No se encontraron películas.');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      displayMessage('Error al buscar películas.');
    });
}

function fetchMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=f752675d`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error al obtener los detalles de la película:', error);
      return {};
    });
}

function displayMovies(movies) {
  moviesList.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    moviesList.appendChild(movieElement);
  });
}

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.className = 'card mb-3';

  const image = document.createElement('img');
  image.src = movie.Poster !== 'N/A' ? movie.Poster : 'images/default.jpeg';
  image.className = 'postero';
  movieElement.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h2');
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

  const addToFavoritesButton = document.createElement('button');
  addToFavoritesButton.textContent = 'Agregar a favoritos';
  addToFavoritesButton.className = 'btn btn-primary';
  addToFavoritesButton.addEventListener('click', () => addToFavorites(movie));
  cardBody.appendChild(addToFavoritesButton);

  movieElement.appendChild(cardBody);

  return movieElement;
}

function addToFavorites(movie) {
  favorites.push(movie);
  saveFavorites();
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}