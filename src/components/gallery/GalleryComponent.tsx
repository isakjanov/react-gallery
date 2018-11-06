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
    const { pictures, requesting } = this.props

    return (
      <div>
        {requesting && (
          <div>
            Loading
          </div>
        )}

        {pictures.map(it => (
          <img src={it.url}/>
        ))}
      </div>
    )
  }
}