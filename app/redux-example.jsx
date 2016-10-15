var redux = require('redux');
var axios = require('axios');

console.log('starting redux example');


// Name reducer and action generators
// ----------------------------------
var nameReducer = (state='Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
    return action.name
    default:
    return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};


// Hobies reducer and action generators
// ------------------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
    return [
      ...state,
      {
        id: nextHobbyId++,
        hobby: action.hobby
      }
    ];
    case 'REMOVE_HOBBY':
    return state.filter((hobby) => hobby.id !== action.id)
    default:
    return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// Movies reducer and action generators
// ------------------------------------
var nextMovieId = 1;
var moviesReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
    return [
      ...state,
      {
        id: nextMovieId++,
        title: action.title,
        gendre: action.gendre
      }
    ];
    case 'REMOVE_MOVIE':
    return state.filter((movie) => action.id !== movie.id);
    default:
    return state;
  }
};

var addMovie = (title, gendre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    gendre
  }
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};

// Map reducer and action generators
// ---------------------------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
    return {
      isFetching: true,
      url: undefined
    };
    case 'COMPLETE_LOCATION_FETCH':
    return {
      isFetching: false,
      url: action.url
    };
    default:
    return state
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res) {
    var loc = res.data.loc;
    var baseUrl = "http://maps.google.com?q"

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('New state', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML= "Loading...";
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="'+state.map.url+'"{target="_blank">View your location</a>'
  }
});
// unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

fetchLocation();

store.dispatch(changeName('StewartyBoy'));
store.dispatch(addHobby('sleeping'));
store.dispatch(addHobby('walking'));
store.dispatch(addMovie('Jaws', 'Action'));
store.dispatch(addMovie('Kess', 'Drama'));
store.dispatch(removeMovie(1));
store.dispatch(changeName('Bob'));
