import * as React from 'react'
import GalleryContainer from './gallery/GalleryContainer'
import {
  Route,
  Switch
} from 'react-router'
import PreviewPane from './preview/PreviewPane'

const App = () => (
  <div className='App'>
    <Switch>
      <Route path='/preview' component={PreviewPane}/>
      <Route path='/' component={GalleryContainer}/>
    </Switch>
  </div>
)

export default App