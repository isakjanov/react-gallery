import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import GalleryDotsComponent, { DotComponent } from './GalleryDotsComponent'

enzyme.configure({ adapter: new Adapter() })

describe('<GalleryDotsComponent/>', () => {
  it('should display correct amount of dots', () => {
    const wrapper = enzyme.shallow(
      <GalleryDotsComponent
        currentImage={0}
        count={5}/>
    )

    expect(wrapper.find(DotComponent).length).toEqual(5)
  })

  it('should pass right properties to DotComponent depending on currentImage', () => {
    const wrapper = enzyme.shallow(
      <GalleryDotsComponent
        currentImage={0}
        count={2}/>
    )

    expect(wrapper.find(DotComponent).at(0).prop('selected')).toEqual(true)
    expect(wrapper.find(DotComponent).at(1).prop('selected')).toEqual(false)

    wrapper.setProps({currentImage: 1})
    expect(wrapper.find(DotComponent).at(0).prop('selected')).toEqual(false)
    expect(wrapper.find(DotComponent).at(1).prop('selected')).toEqual(true)
  })

})

describe('<DotComponent/>', () => {
  it ('should display outlined dot', () => {
    const wrapper = enzyme.shallow(<DotComponent selected={false}/>)
    expect(wrapper.find('IconOutLineDot').length).toEqual(1)
    expect(wrapper.find('IconBaseLineDot').length).toEqual(0)
  })

  it ('should display baseline dot', () => {
    const wrapper = enzyme.shallow(<DotComponent selected={true}/>)
    expect(wrapper.find('IconBaseLineDot').length).toEqual(1)
    expect(wrapper.find('IconOutLineDot').length).toEqual(0)
  })
})
