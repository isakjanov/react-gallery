import { IPictureModel } from '../models/picture/modelPicture'

export interface IRootState {
  gallery: IGalleryState
}

export interface IGalleryState {
  items: {[key: string]: IPictureModel}
  metadata: IGalleryMetadata
}

export interface IGalleryMetadata {
  fetching: boolean
  fetchingError: string
  currentPicture: number
}