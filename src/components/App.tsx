import * as React from 'react'
import GalleryContainer from './gallery/GalleryContainer'
import {
  Route,
  Switch
} from 'react-router'

const App = () => (
  <div className='App'>
    <Switch>
      <Route path='/' component={GalleryContainer}/>
    </Switch>
  </div>
)

export default App