function host(endpoint){
    return `https://api.backendless.com/56BC5191-A89D-8053-FFE1-5C7AA9824100/DA5F1542-64FC-4FA6-A227-34DD5668382C/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIES_BY_ID: 'data/movies/'
}

export async function register(email, password){

    
    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();


    return result;
}

export async function login(email, password){

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: email,
            password
        })
    })).json();

    sessionStorage.setItem('userToken', result['user-token']);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('userId', result.objectId);


    return result;
}

export async function logout(){


    const token = sessionStorage.getItem('user-token');

    const result = fetch(host(endpoints.LOGOUT),{
        headers: {
            mothod: "GET",
            'user-token': token
        }
    });


    return result;

}

export async function getMovies(search){

    const token = sessionStorage.getItem('userToken');

    let result;

    if(!search){
        result = await (await fetch(host(endpoints.MOVIES), {
            method: "GET",
            headers: {
                'user-token': token
            }
        })).json();
    }
    else{
        result = (await fetch(host(endpoints.MOVIES + `?where=${escape(`title LIKE '%${search}%'`)}` + '&'), {
            headers: {
                'user-token': token
            }
        })).json();
    }

    return result;
}


export async function getMovieById(movieId){


    const token = sessionStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES_BY_ID + movieId), {
        method: "GET",
        headers: {
            'user-token': token
        }
    })).json();


    return result;
}

export async function createMovie(movie){


    const token = sessionStorage.getItem('userToken');

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

export async function editMovie(id, updatedProperties){

    const token = sessionStorage.getItem('userToken');

    const result = await (await fetch(host(endpoints.MOVIES_BY_ID + id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProperties)
    })).json();


    return result;
}

export async function deleteMovie(movieId){


    const token = sessionStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES_BY_ID + movieId), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();


    return result;
}

export async function likeMovie(movieId, personWhoLiked){

    const movie = await getMovieById(movieId);

    const newList = movie.peopleLiked += `,${personWhoLiked}`;

    const editedMovied = {
        peopleLiked: newList,
        likesCounter: movie.likesCounter += 1
    }

    const result = await editMovie(movieId, editedMovied);

    return result;
}

