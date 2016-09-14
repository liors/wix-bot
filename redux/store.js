import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import { reducer, initial_state} from './reducer'

let finalCreateStore = compose(
  applyMiddleware()
)(createStore)

export default function configureStore (initialState = initial_state) {
  return finalCreateStore(reducer, initialState);
}