import * as React from 'react'
import IconBaseLineDot from '../../icons/IconBaselineDot'
import IconOutLineDot from '../../icons/IconOutlineDot'

interface IGalleryDotsComponentProps {
  currentImage: number
  count: number
  className?: string
}

interface IDotComponentProps {
  selected: boolean
}

const GalleryDotsComponent = (props: IGalleryDotsComponentProps) => {
  return (
    <div className={`flex flex-row ${props.className}`}>
      {
        Array.from(new Array(props.count))
          .map((value, index) => (
            <DotComponent selected={index === props.currentImage} key={`dot-${index}`}/>)
          )
      }
    </div>
  )
}

export const DotComponent = (props: IDotComponentProps) => {
  if (props.selected) {
    return <IconBaseLineDot/>
  }
  return <IconOutLineDot/>
}

export default GalleryDotsComponent