import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import * as sinon from 'sinon'

import GalleryComponent from './GalleryComponent'
import { IPictureModel } from '../../models/picture/modelPicture'

enzyme.configure({ adapter: new Adapter() })

describe('<GalleryComponent/>', () => {

  const mockPictures: IPictureModel[] = [
    { id: '1', url: 'url1'},
    { id: '2', url: 'url2'}
  ]

  it('should display all elements', () => {
    const wrapper = enzyme.shallow(
      <GalleryComponent
        pictures={[]}
        requesting={true}
        error={''}
        currentPicture={0}
        onComponentMount={() => null}
        onCurrentPictureChange={() => null}/>
    )

    expect(wrapper.find('#carousel').length).toEqual(1)
    expect(wrapper.find('IconArrowLeft').length).toEqual(1)
    expect(wrapper.find('IconArrowRight').length).toEqual(1)
    expect(wrapper.find('Preloader').length).toEqual(1)
  })

  it('should be rendered right number of pictures', () => {
    const wrapper = enzyme.shallow(
      <GalleryComponent
        pictures={mockPictures}
        requesting={false}
        error={''}
        currentPicture={0}
        onComponentMount={() => null}
        onCurrentPictureChange={() => null}/>
    )

    expect(wrapper.find('#carousel').children().length).toEqual(2)
    expect(wrapper.find('#carousel').childAt(0).find('img').prop('src')).toEqual('url1')
    expect(wrapper.find('#carousel').childAt(1).find('img').prop('src')).toEqual('url2')
  })

  it('preloader should get right properties', () => {
    const wrapper = enzyme.shallow(
      <GalleryComponent
        pictures={mockPictures}
        requesting={false}
        error={''}
        currentPicture={0}
        onComponentMount={() => null}
        onCurrentPictureChange={() => null}/>
    )

    expect(wrapper.find('Preloader').prop('loading')).toEqual(false)

    wrapper.setProps({requesting: true})
    expect(wrapper.find('Preloader').prop('loading')).toEqual(true)
  })

  it('onComponentMount should be called when component has been mounted', () => {
    const onComponentMountMock = sinon.stub()
    enzyme.shallow(
      <GalleryComponent
        pictures={mockPictures}
        requesting={false}
        error={''}
        currentPicture={0}
        onComponentMount={onComponentMountMock}
        onCurrentPictureChange={() => null}/>
    )

    expect(onComponentMountMock.calledOnce).toEqual(true)
  })
})