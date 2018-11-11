import * as React from 'react'
import { IPictureModel } from '../../models/picture/modelPicture'
import GalleryDotsContainer from './GalleryDotsContainer'
import IconArrowRight from '../../icons/IconArrowRight'
import IconArrowLeft from '../../icons/IconArrowLeft'
import Preloader from '../ui/Preloader'

interface IGalleryComponentProps {
  pictures: IPictureModel[]
  requesting: boolean
  error: string
  currentPicture: number
  onComponentMount: () => void
  onCurrentPictureChange: (index: number) => void
}

const pictureWidth = 600

export default class GalleryComponent extends React.Component<IGalleryComponentProps> {

  // flag that is used to ignore 'next'/'previous' buttons click while picture is moving
  private sliding = false

  // Reference to .carousel DOM component
  private refCarousel: any

  constructor(props: IGalleryComponentProps) {
    super(props)
    this.refCarousel = React.createRef()
  }

  public componentDidMount() {
    this.props.onComponentMount()
  }

  public componentDidUpdate(prevProps: IGalleryComponentProps) {
    this.assignTransitionCompleteListener()
    if (prevProps.pictures.length === 0 && this.props.pictures.length > 0) {
      this.fixPrevAnimation()
    }
  }

  public render() {

    const { pictures, requesting, error } = this.props

    return (
      <div className='gallery flex flex-row justify-center align-items-center'>

        <div onClick={this.handlePrevClick} className='cursor--pointer'>
          <IconArrowLeft/>
        </div>
        <div className='container'>
          <ul id='carousel' className='animate' ref={this.refCarousel}>
            {pictures.map((it, index) => (
              <li className='animate' key={`gallery-image-${it.id}`}>
                <img src={it.url}/>
              </li>
            ))}
          </ul>

          <div className='absolute gallery-dots flex justify-center'>
            <GalleryDotsContainer/>
          </div>
          <div className='absolute preloader flex justify-center align-items-center'>
            <Preloader loading={requesting}/>
          </div>
          {error && (
            <div className='error flex justify-center'>{error}</div>
          )}
        </div>
        <div onClick={this.handleNextClick} className='cursor--pointer'>
          <IconArrowRight/>
        </div>

      </div>
    )
  }

  private handleNextClick = () => {
    if (this.sliding || this.props.pictures.length === 0) {
      return
    }
    this.sliding = true

    const picturesNodes = this.refCarousel.current.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === pictures.length - 1 ? 0 : currentPicture + 1

    // Move all pictures to their initial positions
    for (let i = 0; i < picturesNodes.length; i++) {
      (picturesNodes[i] as HTMLElement).style.opacity = '0';
      (picturesNodes[i] as HTMLElement).style.transform = `translateX(${-(i - 1) * pictureWidth}px)`
    }

    // Move current picture left
    (picturesNodes[currentPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[currentPicture] as HTMLElement).style
      .transform = `translateX(${-(currentPicture + 1) * pictureWidth}px)`;

    // Move next picture left
    (picturesNodes[nextPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[nextPicture] as HTMLElement).style.transform = `translateX(${-(nextPicture) * pictureWidth}px)`

    onCurrentPictureChange(nextPicture)
  }

  private handlePrevClick = () => {
    if (this.sliding || this.props.pictures.length === 0) {
      return
    }
    this.sliding = true

    const picturesNodes = this.refCarousel.current.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === 0 ? pictures.length - 1 : currentPicture - 1

    // Move all pictures to their initial positions
    for (let i = 0; i < picturesNodes.length; i++) {
      (picturesNodes[i] as HTMLElement).style.opacity = '0';
      (picturesNodes[i] as HTMLElement).style.transform = `translateX(${-(i + 1) * pictureWidth}px)`
    }

    // Move current picture right
    (picturesNodes[currentPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[currentPicture] as HTMLElement).style
      .transform = `translateX(${-(currentPicture - 1) * pictureWidth}px)`;

    // Move next picture left
    (picturesNodes[nextPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[nextPicture] as HTMLElement).style.transform = `translateX(${-(nextPicture) * pictureWidth}px)`

    onCurrentPictureChange(nextPicture)
  }

  // Add event listeners to carousel nodes; update 'sliding' flag when animation is completed
  private assignTransitionCompleteListener = () => {
    const carousel = this.refCarousel.current
    if (!carousel) {
      return
    }
    const picturesNodes = carousel.children

    for (let i = 0; i < picturesNodes.length; i++) {
      picturesNodes[i].addEventListener('transitionend', this.slidingCompleted, true)
      picturesNodes[i].addEventListener('webkitTransitionEnd', this.slidingCompleted, true)
      picturesNodes[i].addEventListener('oTransitionEnd', this.slidingCompleted, true)
      picturesNodes[i].addEventListener('MSTransitionEnd', this.slidingCompleted, true)
    }
  }

  // Set flag 'sliding' to false
  private slidingCompleted = () => {
    this.sliding = false
  }

  // Set initial transform style to the last picture. It fixes sliding right animation
  private fixPrevAnimation = () => {
    const picturesNodes = this.refCarousel.current.children
    if (picturesNodes && picturesNodes.length > 0) {
      const lastPictureIndex = picturesNodes.length - 1;
      const translate = -picturesNodes.length * pictureWidth;
      (picturesNodes[lastPictureIndex] as HTMLElement).style.transform = `translateX(${translate}px)`
    }
  }
}