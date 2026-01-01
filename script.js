$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active');
        $('#nav-menu').toggleClass('active');
    });

    $('.nav-search i').click(function () {
        $('.nav-search input').focus();
    });  
     

    // setting owl carousel

    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#hero-carousel').owlCarousel({
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: navText,
    autoplay: true,
    autoplayHoverPause: true,

    /** SPEED FIX **/

    smartSpeed: 600,        
    autoplayTimeout: 2500,  
    autoplaySpeed: 600,     
    dragEndSpeed: 400       
});

$('#top-movies-slide').owlCarousel({
    items: 6,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 2
        },
        500: {
            items: 3
        },
        1280: {
            items: 4
        },
        1600: {
            items: 6
        }
    }
});


$('.movies-slide').owlCarousel({
        loop: true,
        dots: false,
        nav: true,
        navText: navText,
        margin: 12,
       responsive: {
        0: { items: 2 },
        480: { items: 2 },
        768: { items: 3 },
        1024: { items: 4 },
        1400: { items: 6 }
    }
    });



    const OMDB_KEY = "e919cb6";

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchResults = document.getElementById("search-results");
    const searchSection = document.getElementById("search-section");

    searchBtn.addEventListener("click", searchMovie);
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") searchMovie();
    });

    function searchMovie() {
        const query = searchInput.value.trim();
        if (!query) return;

        fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    renderResults(data.Search);
                } else {
                    searchResults.innerHTML = "<p style='color:white'>No movies found</p>";
                    searchSection.style.display = "block";
                }
            })
            .catch(err => console.error("OMDb error:", err));
    }

    function renderResults(movies) {
        searchResults.innerHTML = "";
        searchSection.style.display = "block";
        searchSection.scrollIntoView({ behavior: "smooth" });


        movies.forEach(movie => {
            if (movie.Poster === "N/A") return;

            searchResults.innerHTML += `
                <a href="movie.html?imdbID=${movie.imdbID}" class="movie-item">
                    <img src="${movie.Poster}">
                    <div class="movie-item-content">
                        <div class="movie-item-title">${movie.Title}</div>
                        <div class="movie-infos">
                            <div class="movie-info">
                                <span>${movie.Year}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });

        if ($('#search-results').hasClass('owl-loaded')) {
            $('#search-results').trigger('destroy.owl.carousel');
        }

        $('#search-results').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            margin: 12,
            responsive: {
                0: { items: 2 },
                768: { items: 4 },
                1200: { items: 6 }
            }
        });
    }

document.addEventListener("click", function (e) {
  const movieCard = e.target.closest(".movie-item");
  if (!movieCard) return;

  const imdbID = movieCard.dataset.imdbid;
  if (!imdbID) return;

  window.location.href = `movie.html?imdbID=${imdbID}`;
});



    
});



