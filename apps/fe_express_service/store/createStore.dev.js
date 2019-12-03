/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootEpic from '../epics'
import rootReducer from '../reducers'

const configureStore = (preloadedState: Object) => {
  let store
  if (typeof window !== 'undefined') {
    // On client, and start side-effect thread (epics)
    const epicMiddleware = createEpicMiddleware()
    store = createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(epicMiddleware))
    )
    epicMiddleware.run(rootEpic)
  } else {
    store = createStore(rootReducer, preloadedState)
  }
  return store
}

export default configureStore
