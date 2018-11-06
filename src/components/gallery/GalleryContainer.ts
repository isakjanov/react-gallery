import { connect } from 'react-redux'
import { IRootState } from '../../state/types'
import {
  getGalleryPictures,
  getGalleryRequestError,
  getGalleryRequesting
} from '../../state/gallery/galleryReducer'
import { fetchGallery } from '../../state/gallery/galleryActions'
import GalleryComponent from './GalleryComponent'

const mapStateToProps = (state: IRootState, ownProps: any) => {
  return {
    pictures: getGalleryPictures(state.gallery),
    requesting: getGalleryRequesting(state.gallery),
    error: getGalleryRequestError(state.gallery)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onComponentMount: () => {
      dispatch(fetchGallery())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryComponent)
