import {
  fetchGallery,
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
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { IGalleryService } from '../../services'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockGallerySuccessService: IGalleryService = {
  getPictures: async () => {
    return await {
      '1': { id: '1', url: 'testUrl' }
    }
  }
}

const mockGalleryFailService: IGalleryService = {
  getPictures: async () => {
    throw 'test error'
  }
}

describe('Gallery actions', () => {

  it('fetchGallery creates ACTION_GALLERY_REQUEST and ACTION_GALLERY_REQUEST_SUCCESS actions', async () => {
    const store = mockStore()
    const expectedActions = [
      { type: ACTION_GALLERY_REQUEST },
      {
        type: ACTION_GALLERY_REQUEST_SUCCESS,
        items: {'1': { id: '1', url: 'testUrl' }}
      }
    ]
    await store.dispatch(fetchGallery(mockGallerySuccessService))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('fetchGallery creates ACTION_GALLERY_REQUEST and ACTION_GALLERY_REQUEST_FAIL actions', async () => {
    const store = mockStore()
    const expectedActions = [
      { type: ACTION_GALLERY_REQUEST },
      {
        type: ACTION_GALLERY_REQUEST_FAIL,
        error: 'test error'
      }
    ]
    await store.dispatch(fetchGallery(mockGalleryFailService))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('requestGallery should create ACTION_GALLERY_REQUEST action', () => {
    expect(requestGallery()).toEqual({
      type: ACTION_GALLERY_REQUEST
    })
  })

  it('setGalleryRequestSuccess should create ACTION_GALLERY_REQUEST_SUCCESS', () => {
    const mockItems = {
      '1': { id: '1', url: 'test/url1' },
      '2': { id: '2', url: 'test/url2' }
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