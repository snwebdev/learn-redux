var redux = require('redux');

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var oldReducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};



  switch (action.type) {
    case 'CHANGE_NAME':
    return {
      ...state,
      name: action.name
    };
    case 'ADD_HOBBY':
    return {
      ...state,
      hobbies: [
        ...state.hobbies,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    };
    case 'REMOVE_HOBBY':
    return {
      ...state,
      hobbies:  state.hobbies.filter((hobby) => hobby.id !== action.id)
    };
    case 'ADD_MOVIE':
    return {
      ...state,
      movies: [
        ...state.movies,
        {
          id: nextMovieId++,
          title: action.title,
          gendre: action.gendre
        }
      ]
    };
    case 'REMOVE_MOVIE':
    return {
      ...state,
      movieies:  state.movies.filter((movie) => movie.id !== action.id)
    };
    default:
    return state;
  };
};

var nameReducer = (state='Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
    return action.name
    default:
    return state;
  }
};

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

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;
  console.log('New state', store.getState());
});
// unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Stewart'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'running'
});


store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'walking'
});


store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bob'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "The Sound of music",
  gendre: 'Musical'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "Kess",
  gendre: 'Drama'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});
