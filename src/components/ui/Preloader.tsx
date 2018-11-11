import * as React from 'react'
import { MoonLoader } from 'react-spinners'

interface IPreloaderProps {
  loading: boolean
}

const preloaderSize = 27
const preloaderColor = '#185fc7'

const Preloader = (props: IPreloaderProps) => (
  <MoonLoader
    sizeUnit={'px'}
    size={preloaderSize}
    color={preloaderColor}
    loading={props.loading}
  />
)

export default Preloader