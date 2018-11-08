import * as React from 'react'
import { MoonLoader } from 'react-spinners'

interface IPreloaderProps {
  loading: boolean
}

const Preloader = (props: IPreloaderProps) => (
  <MoonLoader
    sizeUnit={'px'}
    size={27}
    color={'#185fc7'}
    loading={props.loading}
  />
)

export default Preloader