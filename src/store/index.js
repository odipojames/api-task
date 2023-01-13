import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import recordsReducer from "./reducers/recordsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// persist store code
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();


const store = createStore(
  combineReducers({
    records: recordsReducer,

  }),
   persistedState,
  composeEnhancers(applyMiddleware(thunk))
);


// This is actually call every time when store saved
store.subscribe(() => {
  saveState(store.getState());
});


export default store;
