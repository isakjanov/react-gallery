import { IGalleryState } from '../types'
import { galleryReducer } from './galleryReducer'
import { IGalleryAction } from './galleryActions'
import {
  ACTION_GALLERY_REQUEST,
  ACTION_GALLERY_REQUEST_FAIL,
  ACTION_GALLERY_REQUEST_SUCCESS,
  ACTION_GALLERY_SET_CURRENT_PICTURE
} from '../const'

describe('galleryReducer tests', () => {
  const initialState: IGalleryState = {
    items: {},
    metadata: {
      fetching: false,
      fetchingError: '',
      currentPicture: 0
    }
  }

  it('Returns initial state', () => {
    expect(galleryReducer(undefined, {} as IGalleryAction)).toEqual(initialState)
  })

  it('Handles ACTION_GALLERY_REQUEST', () => {
    expect(galleryReducer(initialState, { type: ACTION_GALLERY_REQUEST}))
      .toEqual({
        ...initialState,
        metadata: {
          ...initialState.metadata,
          fetching: true
        }
      })
  })

  it('Handles ACTION_GALLERY_REQUEST_SUCCESS', () => {
    const action = {
      type: ACTION_GALLERY_REQUEST_SUCCESS,
      items: { '1': {id: '1', url: 'url'}}
    }
    expect(galleryReducer(initialState, action))
      .toEqual({
        ...initialState,
        items: {
          '1': {id: '1', url: 'url'}
        }
      })
  })

  it('Handles ACTION_GALLERY_REQUEST_FAIL', () => {
    const action = {
      type: ACTION_GALLERY_REQUEST_FAIL,
      error: 'test'
    }
    expect(galleryReducer(initialState, action))
      .toEqual({
        ...initialState,
        metadata: {
          ...initialState.metadata,
          fetching: false,
          fetchingError: 'test'
        }
      })
  })

  it('Handles ACTION_GALLERY_SET_CURRENT_PICTURE', () => {
    const action = {
      type: ACTION_GALLERY_SET_CURRENT_PICTURE,
      index: 7
    }
    expect(galleryReducer(initialState, action))
      .toEqual({
        ...initialState,
        metadata: {
          ...initialState.metadata,
          currentPicture: 7
        }
      })
  })
})