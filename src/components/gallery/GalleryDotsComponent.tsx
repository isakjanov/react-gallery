import * as React from 'react'
import IconBaseLineDot from '../../icons/IconBaselineDot'
import IconOutLineDot from '../../icons/IconOutlineDot'

interface IGalleryDotsComponentProps {
  currentImage: number
  count: number
  className?: string
}

interface IDotComponentProps {
  index: number
  currentImage: number
}

const GalleryDotsComponent = (props: IGalleryDotsComponentProps) => {
  return (
    <div className={`flex flex-row ${props.className}`}>
      {
        Array.from(new Array(props.count))
          .map((value, index) => (<DotComponent index={index} currentImage={props.currentImage}/>))
      }
    </div>
  )
}

const DotComponent = (props: IDotComponentProps) => {
  if (props.index === props.currentImage) {
    return <IconBaseLineDot/>
  }
  return <IconOutLineDot/>
}

export default GalleryDotsComponent