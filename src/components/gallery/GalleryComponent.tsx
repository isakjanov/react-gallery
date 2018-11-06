import * as React from 'react'
import { IPictureModel } from '../../models/picture/modelPicture'

interface IGalleryComponentProps {
  pictures: IPictureModel[]
  requesting: boolean
  error: string
  onComponentMount: () => void
}

export default class GalleryComponent extends React.Component<IGalleryComponentProps> {

  public componentDidMount() {
    this.props.onComponentMount()
  }

  public render() {
    return (
      <div>
        Gallery will be soon
      </div>
    )
  }
}