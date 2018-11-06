import * as React from 'react'
import * as ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import {
  applyMiddleware,
  createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  Route,
  Router,
  Switch
} from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './components/App'
import rootReducer from './state/rootReducer'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
)

const history = createBrowserHistory()

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(
  <Root/>,
  document.getElementById('root') as HTMLElement
);