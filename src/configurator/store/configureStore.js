import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
let configureStore;


if (process.env.NODE_ENV === 'production') {
  configureStore = function(initialState) {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
  };
}else{
  configureStore = function(initialState) {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
  };
}


export default configureStore;
