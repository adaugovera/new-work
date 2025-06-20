//test
// Toggle dropdown menus on click
 document.addEventListener('DOMContentLoaded', function(){
fetchCategory('movie/popular'); // Default category on load
 })
document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent event bubbling
    closeAllDropdownsExcept(dropdown);
    dropdown.classList.toggle('show');
  });
});

// Close dropdowns if clicked outside
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
});

function closeAllDropdownsExcept(current) {
  document.querySelectorAll('.dropdown').forEach(drop => {
    if (drop !== current) drop.classList.remove('show');
  });
}



const API_KEY = '137a8cccf72c93792b83e7e8c54a2cff'; // Replace with your API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const content = document.getElementById('content');

// Fetch by category
async function fetchCategory(endpoint) {
  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  const results = data.results || [data]; // support for endpoints that return an object

  displayResults(results);
}

// Search
async function searchMovies() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  displayResults(data.results);
}

// Display
function displayResults(items) {
  content.innerHTML = '<div class="movies-grid"></div>';
  const grid = document.querySelector('.movies-grid');

  if (!items || items.length === 0) {
    content.innerHTML = "<p style='text-align:center;'>No results found.</p>";
    return;
  }

  items.forEach(item => {
    const title = item.title || item.name || "Untitled";
    const poster = item.poster_path ? `${IMG_URL}${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";

    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
      <img src="${poster}" alt="${title}">
      <h4>${title}</h4>
    `;
    grid.appendChild(card);
  });
}

