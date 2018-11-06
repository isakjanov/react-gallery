import * as React from 'react'
import { IPictureModel } from '../../models/picture/modelPicture'

interface IGalleryProps {
  pictures: IPictureModel[]
  requesting: boolean
  error: string
  onComponentMount: () => void
}

export default class Gallery extends React.Component<IGalleryProps> {

  public componentDidMount() {
    this.props.onComponentMount()
  }

  public render() {
    return (
      <div>
        Gallery is going to be here
      </div>
    )
  }
}