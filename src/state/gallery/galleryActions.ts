import {
  IPictureModel
} from '../../models/picture/modelPicture'
import {
  ACTION_GALLERY_REQUEST,
  ACTION_GALLERY_REQUEST_FAIL,
  ACTION_GALLERY_REQUEST_SUCCESS,
  ACTION_GALLERY_SET_CURRENT_PICTURE
} from '../const'
import { IGalleryService } from '../../services'

export interface IGalleryAction {
  type: string
}

export interface IGalleryActionRequest extends IGalleryAction {
}

export interface IGalleryActionRequestSuccess extends IGalleryAction {
  items: { [key: string]: IPictureModel }
}

export interface IGalleryActionRequestFail extends IGalleryAction {
  error: string
}

export interface IGalleryActionSetCurrentPicture extends IGalleryAction{
  index: number
}

// Async action. Load pictures
export const fetchGallery = (service: IGalleryService) => (dispatch: any) => {
  dispatch(requestGallery())
  return service.getPictures()
    .then(items => dispatch(setGalleryRequestSuccess(items)))
    .catch(error => dispatch(setGalleryRequestFail(error)))
}

// Broadcasts that pictures are being loaded
export function requestGallery(): IGalleryActionRequest {
  return {
    type: ACTION_GALLERY_REQUEST
  }
}

// Broadcasts that pictures have been loaded
export function setGalleryRequestSuccess(items: { [key: string]: IPictureModel }) {
  return {
    type: ACTION_GALLERY_REQUEST_SUCCESS,
    items
  }
}

// Broadcasts that failed to load pictures
export function setGalleryRequestFail(error: string): IGalleryActionRequestFail {
  return {
    type: ACTION_GALLERY_REQUEST_FAIL,
    error
  }
}

// Broadcasts that current picture parameter was changed
export function setCurrentPicture(index: number): IGalleryActionSetCurrentPicture {
  return {
    type: ACTION_GALLERY_SET_CURRENT_PICTURE,
    index
  }
}
