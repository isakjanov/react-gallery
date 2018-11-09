import {
  requestGallery,
  setCurrentPicture,
  setGalleryRequestFail,
  setGalleryRequestSuccess
} from './galleryActions'
import {
  ACTION_GALLERY_REQUEST,
  ACTION_GALLERY_REQUEST_FAIL,
  ACTION_GALLERY_REQUEST_SUCCESS,
  ACTION_GALLERY_SET_CURRENT_PICTURE
} from '../const'

describe('Gallery actions', () => {

  it('requestGallery should create ACTION_GALLERY_REQUEST action', () => {
    expect(requestGallery()).toEqual({
      type: ACTION_GALLERY_REQUEST
    })
  })

  it('setGalleryRequestSuccess should create ACTION_GALLERY_REQUEST_SUCCESS', () => {
    const mockItems = {
      '1': { id: '1', url: 'test/url1'},
      '2': { id: '2', url: 'test/url2'}
    }
    expect(setGalleryRequestSuccess(mockItems)).toEqual({
      type: ACTION_GALLERY_REQUEST_SUCCESS,
      items: mockItems
    })
  })

  it('setGalleryRequestFail should create ACTION_GALLERY_REQUEST_FAIL', () => {
    const mockError = 'test error'
    expect(setGalleryRequestFail(mockError)).toEqual({
      type: ACTION_GALLERY_REQUEST_FAIL,
      error: mockError
    })
  })

  it('setCurrentPicture should create ACTION_GALLERY_SET_CURRENT_PICTURE', () => {
    const mockCurrentPicture = 2
    expect(setCurrentPicture(mockCurrentPicture)).toEqual({
      type: ACTION_GALLERY_SET_CURRENT_PICTURE,
      index: mockCurrentPicture
    })
  })

})