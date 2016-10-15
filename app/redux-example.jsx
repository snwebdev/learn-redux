var redux = require('redux');


console.log('starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

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

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('StewartyBoy'));
store.dispatch(actions.addHobby('sleeping'));
store.dispatch(actions.addHobby('walking'));
store.dispatch(actions.addMovie('Jaws', 'Action'));
store.dispatch(actions.addMovie('Kess', 'Drama'));
store.dispatch(actions.removeMovie(1));
store.dispatch(actions.changeName('Bob'));
