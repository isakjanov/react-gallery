import {
  IPictureModel
} from '../../models/picture/modelPicture'
import {
  ACTION_GALLERY_REQUEST,
  ACTION_GALLERY_REQUEST_FAIL,
  ACTION_GALLERY_REQUEST_SUCCESS,
  ACTION_GALLERY_SET_CURRENT_PICTURE
} from '../const'
import galleryService from '../../services/Gallery'

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

export const fetchGallery = () => (dispatch: any) => {
  dispatch(requestGallery())
  galleryService.getPictures()
    .then(items => dispatch(setGalleryRequestSuccess(items)))
    .catch(error => dispatch(setGalleryRequestFail(error)))
}

export function requestGallery(): IGalleryActionRequest {
  return {
    type: ACTION_GALLERY_REQUEST
  }
}

export function setGalleryRequestSuccess(items: { [key: string]: IPictureModel }) {
  return {
    type: ACTION_GALLERY_REQUEST_SUCCESS,
    items
  }
}

export function setGalleryRequestFail(error: string): IGalleryActionRequestFail {
  return {
    type: ACTION_GALLERY_REQUEST_FAIL,
    error
  }
}

export function setCurrentPicture(index: number): IGalleryActionSetCurrentPicture {
  return {
    type: ACTION_GALLERY_SET_CURRENT_PICTURE,
    index
  }
}
