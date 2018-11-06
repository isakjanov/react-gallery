import * as React from 'react'
import GalleryContainer from './gallery/GalleryContainer'
import {
  Route,
  Switch
} from 'react-router'

class App extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className='App clearfix'>
        <Switch>
          <Route path='/' component={GalleryContainer}/>
        </Switch>
      </div>
    )
  }
}

export default App