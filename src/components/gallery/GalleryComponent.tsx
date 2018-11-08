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

export default class GalleryComponent extends React.Component<IGalleryComponentProps> {

  private sliding = false

  public componentDidMount() {
    this.props.onComponentMount()
  }

  public render() {

    this.assignTransitionCompleteListener()

    const { pictures, requesting } = this.props

    return (
      <>
        <div className='gallery flex flex-row justify-center align-items-center'>
          <div onClick={this.handlePrevClick} className='cursor--pointer'>
            <IconArrowLeft/>
          </div>
          <div className='container'>
            <ul id='carousel' className='animate'>
              {pictures.map((it, index) => (
                <li className='animate'>
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
          </div>
          <div onClick={this.handleNextClick} className='cursor--pointer'>
            <IconArrowRight/>
          </div>
        </div>
      </>
    )
  }

  private handleNextClick = () => {
    const carouselNode = document.getElementById('carousel')
    if (!carouselNode || this.sliding) {
      return
    }
    this.sliding = true

    const picturesNodes = carouselNode.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === pictures.length - 1 ? 0 : currentPicture + 1

    // Move all pictures to their initial positions
    for (let i = 0; i < picturesNodes.length; i++) {
      (picturesNodes[i] as HTMLElement).style.opacity = '0';
      (picturesNodes[i] as HTMLElement).style.transform = `translateX(${-(i - 1) * 600}px)`
    }

    // Move current picture left
    (picturesNodes[currentPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[currentPicture] as HTMLElement).style.transform = `translateX(${-(currentPicture + 1) * 600}px)`;

    // Move next picture left
    (picturesNodes[nextPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[nextPicture] as HTMLElement).style.transform = `translateX(${-(nextPicture) * 600}px)`

    onCurrentPictureChange(nextPicture)
  }

  private handlePrevClick = () => {
    const carouselNode = document.getElementById('carousel')
    if (!carouselNode || this.sliding) {
      return
    }
    this.sliding = true

    const picturesNodes = carouselNode.children
    const { currentPicture, pictures, onCurrentPictureChange } = this.props
    const nextPicture = currentPicture === 0 ? pictures.length - 1 : currentPicture - 1

    // Move all pictures to their initial positions
    for (let i = 0; i < picturesNodes.length; i++) {
      (picturesNodes[i] as HTMLElement).style.opacity = '0';
      (picturesNodes[i] as HTMLElement).style.transform = `translateX(${-(i + 1) * 600}px)`
    }

    // Move current picture right
    (picturesNodes[currentPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[currentPicture] as HTMLElement).style.transform = `translateX(${-(currentPicture - 1) * 600}px)`;

    // Move next picture left
    (picturesNodes[nextPicture] as HTMLElement).style.opacity = '1';
    (picturesNodes[nextPicture] as HTMLElement).style.transform = `translateX(${-(nextPicture) * 600}px)`

    onCurrentPictureChange(nextPicture)
  }

  private assignTransitionCompleteListener = () => {
    const carouselNode = document.getElementById('carousel')
    if (!carouselNode) {
      return
    }

    for (let i = 0; i < carouselNode.children.length; i++) {
      carouselNode.children[i].addEventListener('transitionend', this.slidingCompleted, true)
      carouselNode.children[i].addEventListener('webkitTransitionEnd', this.slidingCompleted, true)
      carouselNode.children[i].addEventListener('oTransitionEnd', this.slidingCompleted, true)
      carouselNode.children[i].addEventListener('MSTransitionEnd', this.slidingCompleted, true)
    }
  }

  private slidingCompleted = () => {
    this.sliding = false
  }
}