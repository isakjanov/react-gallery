import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import Preloader from './Preloader'
import { MoonLoader } from 'react-spinners'

enzyme.configure({ adapter: new Adapter() })

describe('<Preloader/>', () => {
  it('should render elements correctly', () => {
    const wrapper = enzyme.shallow(<Preloader loading={true}/>)
    expect(wrapper.find(MoonLoader).length).toEqual(1)
  })

  it('pass correct params to MoonLoader', () => {
    const wrapper = enzyme.shallow(<Preloader loading={true}/>)
    expect(wrapper.find(MoonLoader).prop('loading')).toEqual(true)

    wrapper.setProps({loading: false})
    expect(wrapper.find(MoonLoader).prop('loading')).toEqual(false)
  })
})
