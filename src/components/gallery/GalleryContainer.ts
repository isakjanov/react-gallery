import { connect } from 'react-redux'
import { IRootState } from '../../state/types'
import {
  getGalleryCurrentPicture,
  getGalleryPictures,
  getGalleryRequestError,
  getGalleryRequesting
} from '../../state/gallery/galleryReducer'
import {
  fetchGallery,
  setCurrentPicture
} from '../../state/gallery/galleryActions'
import GalleryComponent from './GalleryComponent'
import galleryService from '../../services/impl/Gallery'

const mapStateToProps = (state: IRootState, ownProps: any) => {
  return {
    pictures: getGalleryPictures(state.gallery),
    requesting: getGalleryRequesting(state.gallery),
    error: getGalleryRequestError(state.gallery),
    currentPicture: getGalleryCurrentPicture(state.gallery)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onComponentMount: () => {
      dispatch(fetchGallery(galleryService))
    },
    onCurrentPictureChange: (index: number) => {
      dispatch(setCurrentPicture(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryComponent)
