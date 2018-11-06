import { IGalleryState } from '../types'
import {
  IGalleryAction,
  IGalleryActionRequestFail,
  IGalleryActionRequestSuccess
} from './galleryActions'
import {
  ACTION_GALLERY_REQUEST,
  ACTION_GALLERY_REQUEST_FAIL,
  ACTION_GALLERY_REQUEST_SUCCESS
} from '../const'
import { IPictureModel } from '../../models/picture/modelPicture'

// Reducers for the Gallery entity

function setGalleryRequesting(state: IGalleryState, action: IGalleryAction): IGalleryState {
  return Object.assign({}, state, {
    metadata: {
      ...state.metadata,
      fetching: true
    }
  })
}

function setGalleryRequestSuccess(state: IGalleryState, action: IGalleryAction): IGalleryState {
  const items = (action as IGalleryActionRequestSuccess).items
  return Object.assign({}, state, {
    items,
    metadata: {
      ...state.metadata,
      fetching: false,
      fetchingError: ''
    }
  })
}

function setGalleryRequestFail(state: IGalleryState, action: IGalleryAction): IGalleryState {
  const error = (action as IGalleryActionRequestFail).error
  return Object.assign({}, state, {
    metadata: {
      ...state.metadata,
      fetching: false,
      fetchingError: error
    }
  })
}

const initialState: IGalleryState = {
  items: {},
  metadata: {
    fetching: false,
    fetchingError: '',
    currentPicture: 0
  }
}

export const galleryReducer = (state: IGalleryState = initialState, action: IGalleryAction): IGalleryState => {
  switch (action.type) {
    case ACTION_GALLERY_REQUEST:
      return setGalleryRequesting(state, action)
    case ACTION_GALLERY_REQUEST_SUCCESS:
      return setGalleryRequestSuccess(state, action)
    case ACTION_GALLERY_REQUEST_FAIL:
      return setGalleryRequestFail(state, action)
    default:
      return state
  }
}


// Selectors for the Gallery entity
// Selectors are extremely useful when redux's store is going to be changed.

export function getGalleryRequesting(state: IGalleryState): boolean {
  return state.metadata.fetching
}

export function getGalleryRequestError(state: IGalleryState): string {
  return state.metadata.fetchingError
}

export function getGalleryPictures(state: IGalleryState): IPictureModel[] {
  return Object.values(state.items)
}
