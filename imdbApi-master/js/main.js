// Main JavaScript bruh

const apiKey = '8c565e9a';
randomTry = 0;
$(document).ready(() => {

    //Get search input
    $('#searchForm').on('keyup', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });

    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });

    //My favourites
    $('.myFavourites').click(function() {
        //Remove quote
        let films_deserialized = JSON.parse(localStorage.getItem('films'));
        // alert(films);
        var i;
        let output = '';
        
        //Loop through favourites
        if(films.length > 0){

            $('#no-listings').text('');
            $('#no-listings').removeClass('no-listings');
            $('#theForce').addClass('hide');
            $('#noResult').removeClass('noResult');

            for(i = 0; i < films.length; i++){
                axios.get('https://www.omdbapi.com?apiKey=' + apiKey + '&s=' + films[i])
                .then((response) => {
                    let movies = response.data.Search[0];
                        // if(movies.Poster == 'N/A'){
                        //     movies.Poster == '../img/comingsoon.jpg';
                        // }
                        output += `
                            <div class="col-md-3 col-sm-6 col-6 movie-listing">
                                <a onclick="movieSelected('${movies.imdbID}')" href="#" id="goToMovie">
                                    <div class="well text-center">
                                        <img src="${movies.Poster}" alt="${movies.Title}"/>
                                        <div class="middle">
                                          <h6 class="search-title">${movies.Title}</h5>
                                         <p class="search-year">Released: ${movies.Year}</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        `;
                    $('#movies').html(output);
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        } else {
            let output = 'Hm, no favourites. How sad';
            $('#no-listings').text(output);
            $('#no-listings').addClass('no-listings');
            $('#theForce').removeClass('hide');
            $('#theForce').attr('src', 'img/not-found.svg');
            $('#noResult').addClass('noResult');
            $('#movies').html('');
        }
    });

    //Lukes favourites
    $('.favourites').click(function(e) {
        //Remove quote
        $('#no-listings').text('');
        $('#no-listings').removeClass('no-listings');
        $('#theForce').addClass('hide');
        $('#noResult').removeClass('noResult');
        //Set hard coded favouites to find
        films = ['Joker', 'Halloween', 'Deadpool', 'The Walking Dead'];
        var i;
        let output = '';
        //Loop through favourites
        for(i = 0; i < films.length; i++){
            axios.get('https://www.omdbapi.com?apiKey=' + apiKey + '&s=' + films[i])
            .then((response) => {
                let movies = response.data.Search[0];
                    output += `
                        <div class="col-md-3 movie-listing">
                            <a onclick="movieSelected('${movies.imdbID}')" href="#" id="goToMovie">
                                <div class="well text-center">
                                    <img src="${movies.Poster}" alt="${movies.Title}"/>
                                    <div class="middle">
                                        <h6 class="search-title">${movies.Title}</h5>
                                        <p class="search-year">Released: ${movies.Year}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                $('#movies').html(output);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    });
});



function getMovies(searchText){
    // console.log(searchText);

    let film = 'Hm, can\'t find a movie with that name';

    if(searchText.length > 2){
        axios.get('https://www.omdbapi.com?apiKey=' + apiKey + '&s=' + searchText)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            
            if(response.data.Response == 'False'){
                $('#theForce').attr('src', 'img/not-found.svg');
                $('#theForce').removeClass('hide');
                $('#no-listings').addClass('no-listings');
                $('#no-listings').text(film);
                $('#noResult').addClass('noResult');
                console.log(film);
            } else{
                $('#theForce').addClass('hide');
                $('#no-listings').text('');
                $('#no-listings').removeClass('no-listings');
                $('#noResult').removeClass('noResult');
                $.each(movies, (index, movie) => {
                    
                    isFavourite = films.includes(`${movie.Title}`);
                    // alert('is the title in the array? : ' + isFavourite);
                    if(`${movie.Poster}` == 'N/A'){
                        movie.Poster = 'img/comingsoon.jpg';
                     }
                    output += `
                        <div class="col-md-3 col-sm-6 col-6 movie-listing">
                            <div class="well text-center">
                                <a onclick="movieSelected('${movie.imdbID}')" href="#" id="goToMovie"><img id="moviePoster" src="${movie.Poster}" alt="${movie.Title}"/></a>
                                <div class="middle">
                                    <h6 class="search-title">${movie.Title}</h6>
                                    <p class="search-year">Released: ${movie.Year}</p>
                    `;
                    if(isFavourite == true){
                        output += `
                                    <div class="delegatedFave"><i class="fas fa-star" id="checked"></i></div>
                                </div>
                            </div>
                        </div>
                    `;
                    } else {
                        output += `
                                    <div class="delegatedFave"><i class="far fa-star" id="not-checked"></i></div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                });
            }
           

            $('#movies').html(output);
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
    } else if(searchText.length < 1){
        let film = 'Find your favourite movie by searching!';
        let output = '';
        $('#theForce').attr('src', 'img/the-force.svg');
        $('#theForce').removeClass('hide');
        $('#no-listings').addClass('no-listings');
        $('#no-listings').text(film);
        $('#movies').html(output);
        $('#noResult').addClass('noResult');
    } else{
        let film = 'No films here, search to find your favourites!';
        let output = '';
        $('#theForce').attr('src', 'img/the-force.svg');
        $('#theForce').removeClass('hide');
        $('#no-listings').addClass('no-listings');
        $('#no-listings').text(film);
        $('#movies').html(output);
        $('#noResult').addClass('noResult');
    }
    
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com?apiKey=' + apiKey + '&i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" alt="${movie.Title}" id="specificPage" class="thumbnail"/>
                    </div>
                    <div class="col-md-8">
                        <h2 id="plotHeader">${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                    <h3 id="plot">Plot</h3>
                    <div class="col-md-12 list-group-item" id="plot">
                        <p>${movie.Plot}</p>
                    </div>
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" id="genBtn">View IMDB</a>
                    <!--THis looks better underlined-->
                    <a href="index.html" target="_blank" class="btn btn-primary" id="genBtn">Go back to search</a>
                </div>
                </div>
            `;

            $('#specMovie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getRandomMovie(){
    let movieId = "tt" + Math.floor(Math.random() * 10000000);
    console.log(movieId);
    //only try 10 times to stop infinite loop
    console.log(randomTry);
    if(randomTry < 10){
        axios.get('https://www.omdbapi.com?apiKey=' + apiKey + '&i=' + movieId)
            .then((response) => {
                if(response.data.Response == 'True'){
                    console.log(response);
                    let movie = response.data;

                    let output = `
                        <div class="row">
                            <div class="col-md-12">
                                <a href='javascript:getRandomMovie()' class="try-again-btn"><h3>Try again?</h3></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" alt="${movie.Title}" class="thumbnail"/>
                            </div>
                            <div class="col-md-8">
                                <h2>${movie.Title}</h2>
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                                    <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                        <div class="well">
                            <h3>Plot</h3>
                            <div class="co-md-12 list-group-item">
                                <p>${movie.Plot}</p>
                            </div>
                            <hr>
                            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                            <a href="index.html" class="btn btn-default">Go back to search</a>
                        </div>
                        </div>
                    `;

                    $('#movie').html(output);
                } else {
                    randomTry++;
                    getRandomMovie();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        let output = `
        <div class="row">
            <div class="col-md-12">
                <h3>Could not find anything. <a href='javascript:javascript:getRandomMovie()' class="try-again-btn">Try again?</a></h3>
                <a href="index.html" class="btn btn-default">Go back to search</a>
            </div>
        </div>
        `   
        $('#movie').html(output);
    }
}

//Global film array for my favourites
let films = [];
let films_serialized = JSON.stringify(films);
localStorage.setItem('films', films_serialized);

//Check if film is a favourite or not
$(document).on("click", '.fa-star', function(){
    if($(this).attr('id') == 'not-checked'){
        $(this).removeAttr('id');
        $(this).attr('id', 'checked');
        $(this).removeClass('far');
        $(this).addClass('fas');
        let title = $(this).closest('.well').find('.search-title').text();
        films.push(title);
        $('#favouriteLinks').html('&nbsp;Favourites&nbsp;<i class="fas fa-star" id="default"></i>' + films.length);
    } else{
        $(this).removeAttr('id');
        $(this).attr('id', 'not-checked');
        $(this).removeClass('fas');
        $(this).addClass('far');
        let title = $(this).closest('.well').find('.search-title').text();
        films = films.filter(e => e !== title);
        $('#favouriteLinks').html('&nbsp;Favourites<i class="fas fa-star" id="default"></i>' + films.length);
    }

    if(films.length < 1){
        $('#favouriteLinks').html('&nbsp;Favourites<i class="fas fa-star" id="default"></i>');
    }

  });



//Reset random movie try count
$(document).on("click", '.try-again-btn', function(){
    randomTry = 0;
});