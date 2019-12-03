/* @flow */

import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from '../epics'
import rootReducer from '../reducers'

const configureStore = (preloadedState: Object) => {
  let store
  if (typeof window !== 'undefined') {
    // On client, and start side-effect thread (epics)
    const epicMiddleware = createEpicMiddleware()
    store = createStore(rootReducer, preloadedState, applyMiddleware(epicMiddleware))
    epicMiddleware.run(rootEpic)
  } else {
    store = createStore(rootReducer, preloadedState)
  }
  return store
}

export default configureStore
