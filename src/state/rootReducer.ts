import { combineReducers } from 'redux'
import { galleryReducer } from './gallery/galleryReducer'

const rootReducer = combineReducers({
  gallery: galleryReducer
})

export default rootReducer