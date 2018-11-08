import { connect } from 'react-redux'
import { IRootState } from '../../state/types'
import {
  getGalleryCurrentPicture,
  getGalleryPictures
} from '../../state/gallery/galleryReducer'
import GalleryDotsComponent from './GalleryDotsComponent'

const mapStateToProps = (state: IRootState, ownProps: any) => {
  return {
    currentImage: getGalleryCurrentPicture(state.gallery),
    count: getGalleryPictures(state.gallery).length,
    ...ownProps
  }
}

export default connect(mapStateToProps)(GalleryDotsComponent)