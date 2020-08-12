function host(endpoint){
    return `https://api.backendless.com/56BC5191-A89D-8053-FFE1-5C7AA9824100/DA5F1542-64FC-4FA6-A227-34DD5668382C/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

export async function register(username, password){
    
    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    return result;
}

export async function login(username, password){
    
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export async function logout(){

    const token = localStorage.getItem('user-token');

    const result = fetch(host(endpoints.LOGOUT),{
        headers: {
            mothod: "GET",
            'user-token': token
        }
    });

    return result;

}

//get All Movies
export async function getMovies(){

    const token = localStorage.getItem('userToken');

    const result = await (await fetch(host(endpoints.MOVIES), {
        method: "GET",
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

//get movie by Id
export async function getMovieById(movieId){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + movieId), {
        method: "GET",
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

//create movie
export async function createMovie(movie){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    return result;
}

//edit movie
export async function updateMovie(id, updatedProperties){

    const token = localStorage.getItem('userToken');

    const result = await (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProperties)
    })).json();

    return result;
}

//delete movie
export async function deleteMovie(movieId){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + movieId), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}

//get movie by user Id (user collection)
export async function getMovieByOwner(){

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId');

    const result = await (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}

export async function buyTicket(movie){
    
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });
}

