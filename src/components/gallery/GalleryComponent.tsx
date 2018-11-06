import * as React from 'react'
import { IPictureModel } from '../../models/picture/modelPicture'

interface IGalleryComponentProps {
  pictures: IPictureModel[]
  requesting: boolean
  error: string
  currentPicture: number
  onComponentMount: () => void
  onCurrentPictureChange: (index: number) => void
}

export default class GalleryComponent extends React.Component<IGalleryComponentProps> {

  public componentDidMount() {
    this.props.onComponentMount()
  }

  public render() {
    const { pictures, requesting, currentPicture } = this.props
    const position = -currentPicture * 600

    return (
      <div className='gallery'>
        {requesting && (
          <div>
            Loading
          </div>
        )}

        <div className='container'>
          <ul style={{left: position}}>
            {pictures.map(it => (
              <li>
                <img src={it.url}/>
              </li>
            ))}
          </ul>
        </div>

        <div onClick={this.handlePrevClick} className='cursor--pointer'>prev</div>
        <div onClick={this.handleNextClick} className='cursor--pointer'>next</div>

      </div>
    )
  }

  private handleNextClick = () => {
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const newIndex = currentPicture === pictures.length - 1 ? 0 : currentPicture + 1
    onCurrentPictureChange(newIndex)
  }

  private handlePrevClick = () => {
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const newIndex = currentPicture === 0 ? pictures.length - 1 : currentPicture - 1
    onCurrentPictureChange(newIndex)
  }
}