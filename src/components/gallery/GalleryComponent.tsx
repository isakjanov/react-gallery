import * as React from 'react'
import { IPictureModel } from '../../models/picture/modelPicture'
import GalleryDotsContainer from './GalleryDotsContainer'
import IconArrowRight from '../../icons/IconArrowRight'
import IconArrowLeft from '../../icons/IconArrowLeft'
import Preloader from '../ui/Preloader'
import { element } from 'prop-types'

interface IGalleryComponentProps {
  pictures: IPictureModel[]
  requesting: boolean
  error: string
  currentPicture: number
  onComponentMount: () => void
  onCurrentPictureChange: (index: number) => void
}

const autoRotationMs = 3000

export default class GalleryComponent extends React.Component<IGalleryComponentProps> {

  // flag that is used to ignore 'next'/'previous' buttons click while picture is moving
  private sliding = false

  // Reference to .carousel DOM component
  private refCarousel: any

  private autoRotationInterval: any

  private pictureWidth: number

  constructor(props: IGalleryComponentProps) {
    super(props)
    this.refCarousel = React.createRef()
  }

  public componentDidMount() {
    this.props.onComponentMount()
    this.pictureWidth = window.innerWidth
  }

  public componentDidUpdate(prevProps: IGalleryComponentProps) {
    this.assignTransitionCompleteListener()
    if (prevProps.pictures.length === 0 && this.props.pictures.length > 0) {
      this.fixPrevAnimation()
      this.assignAutoRotation()
    }
  }

  public render() {

    const { pictures, requesting, error } = this.props
    const carouselCalculatedStyle = {
      width: pictures.length * this.pictureWidth
    }

    return (
      <div className='gallery flex flex-row justify-center align-items-center'>

        <div className='container'>
          <ul id='carousel' className='animate' style={carouselCalculatedStyle} ref={this.refCarousel}>
            {pictures.map((it, index) => (
              <li
                className='animate'
                key={`gallery-image-${it.id}`}
                style={{
                  width: this.pictureWidth,
                  backgroundImage: `url(${it.url})`
                }}/>
            ))}
          </ul>

          <div
            onClick={this.handlePrevClick}
            className='left-btn'>
            <IconArrowLeft/>
          </div>
          <div
            onClick={this.handleNextClick}
            className='right-btn'>
            <IconArrowRight/>
          </div>

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


      </div>
    )
  }

  private handleNextClick = () => {
    clearInterval(this.autoRotationInterval)
    this.movePicturesLeft()
  }

  private handlePrevClick = () => {
    clearInterval(this.autoRotationInterval)
    this.movePicturesRight()
  }

  private movePicturesLeft = () => {
    if (this.sliding || this.props.pictures.length === 0) {
      return
    }
    this.sliding = true

    const picturesNodes = this.refCarousel.current.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === pictures.length - 1 ? 0 : currentPicture + 1

    // Move all pictures to their initial positions
    picturesNodes.forEach((element: HTMLElement, index: number) => {
      this.movePictureToPosition(element, index - 1)
    })

    // Move current picture left
    this.moveCurrentPictureToPosition(picturesNodes[currentPicture], currentPicture + 1);

    // Move next picture left
    this.moveNextPictureToPosition(picturesNodes[nextPicture], nextPicture);

    onCurrentPictureChange(nextPicture)
  }

  private movePicturesRight = () => {
    if (this.sliding || this.props.pictures.length === 0) {
      return
    }
    this.sliding = true

    const picturesNodes = this.refCarousel.current.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === 0 ? pictures.length - 1 : currentPicture - 1

    // Move all pictures to their initial positions
    picturesNodes.forEach((element: HTMLElement, index: number) => {
      this.movePictureToPosition(element, index + 1)
    })

    // Move current picture right
    this.moveCurrentPictureToPosition(picturesNodes[currentPicture], currentPicture - 1);

    // Move next picture left
    this.moveNextPictureToPosition(picturesNodes[nextPicture], nextPicture);
    onCurrentPictureChange(nextPicture)
  }

  private movePictureToPosition = (pictureNode: HTMLElement, position: number) => {
    pictureNode.style.opacity = '0'
    pictureNode.style.transform = `translateX(${-position * this.pictureWidth}px)`
  }

  private moveCurrentPictureToPosition = (pictureNode: HTMLElement, nextPosition: number) => {
    pictureNode.style.opacity = '1';
    pictureNode.style.transform = `translateX(${-nextPosition * this.pictureWidth}px)`;
  }

  private moveNextPictureToPosition = (pictureNode: HTMLElement, nextPosition: number) => {
    pictureNode.style.opacity = '1';
    pictureNode.style.transform = `translateX(${-nextPosition * this.pictureWidth}px)`
  }

  // Add event listeners to carousel nodes; update 'sliding' flag when animation is completed
  private assignTransitionCompleteListener = () => {
    const carousel = this.refCarousel.current
    if (!carousel) {
      return
    }
    const picturesNodes = carousel.children

    picturesNodes.forEach((element: HTMLElement) => {
      element.addEventListener('transitionend', this.slidingCompleted, true)
      element.addEventListener('webkitTransitionEnd', this.slidingCompleted, true)
      element.addEventListener('oTransitionEnd', this.slidingCompleted, true)
      element.addEventListener('MSTransitionEnd', this.slidingCompleted, true)
    })
  }

  private assignAutoRotation = () => {
    this.autoRotationInterval = setInterval(this.movePicturesLeft, autoRotationMs)
  }

  // Set flag 'sliding' to false
  private slidingCompleted = () => {
    this.sliding = false
  }

  // Set initial transform style to the last picture. It fixes sliding right animation
  private fixPrevAnimation = () => {
    const picturesNodes = this.refCarousel.current.children
    if (picturesNodes && picturesNodes.length > 0) {
      const lastPictureIndex = picturesNodes.length - 1
      const translate = -picturesNodes.length * this.pictureWidth;
      (picturesNodes[lastPictureIndex] as HTMLElement).style.transform = `translateX(${translate}px)`
    }
  }
}