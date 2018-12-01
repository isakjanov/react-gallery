import * as React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

interface IPreviewProps {
  imageUrl: string
}

interface IPreviewState {
  size: number
  left: number
  top: number
}

class Preview extends React.Component<IPreviewProps, IPreviewState> {

  public state: IPreviewState = {
    size: 70,
    left: 50,
    top: 50
  }

  private minHorizontal = -100
  private maxHorizontal = 200
  private minVertical = -100
  private maxVertical = 200
  private minSize = 30
  private maxSize = 300


  public render() {
    return (
      <div
        style={{
          paddingTop: 10
        }}
        className='flex flex-column align-items-center'>
        <div
          style={{
            width: 700,
            height: 500,
            backgroundImage: `url(${this.props.imageUrl})`,
            backgroundSize: `${this.state.size}%`,
            backgroundPosition: `${this.state.left}% ${this.state.top}%`,
            backgroundRepeat: 'no-repeat',
            border: '1px solid #dedede'
          }}/>


        <div>

          <div style={{ width: 400, margin: 20 }}>
            <div>Size:</div>
            <Slider
              min={this.minSize}
              max={this.maxSize}
              defaultValue={this.state.size}
              onChange={this.handleSizeChange}/>
          </div>

          <div style={{ width: 400, margin: 20 }}>
            <div>Horizontal:</div>
            <Slider
              min={this.minHorizontal}
              max={this.maxHorizontal}
              defaultValue={this.state.left}
              onChange={this.handleHorizontalChange}/>
          </div>

          <div style={{ width: 400, margin: 20 }}>
            <div>Vertical:</div>
            <Slider
              min={this.minVertical}
              max={this.maxVertical}
              defaultValue={this.state.top}
              onChange={this.handleVerticalChange}/>
          </div>
        </div>
      </div>
    )
  }

  private handleSizeChange = (value: number) => {
    this.setState({
      size: value
    })
  }

  private handleVerticalChange = (value: number) => {
    this.setState({
      top: value
    })
  }

  private handleHorizontalChange = (value: number) => {
    this.setState({
      left: value
    })
  }
}

export default Preview