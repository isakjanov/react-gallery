import {
  IPictureModel
} from '../../models/picture/modelPicture'
import { IGalleryService } from '../index'

const mockGalleryResponse: { [key: string]: IPictureModel } = {
  '1': { id: '1', url: '/images/1.jpg' },
  '2': { id: '2', url: '/images/2.jpg' },
  '3': { id: '3', url: '/images/3.jpg' },
  '4': { id: '4', url: '/images/4.jpg' },
  '5': { id: '5', url: '/images/5.jpg' }
}

const testTimeoutMs = 1000

/**
 *  GalleryService exposes methods to send http request related to
 *  the Gallery entity
 */
class GalleryService implements IGalleryService {
  // private baseUrl = '/api/picture'

  // getPictures sends http request to get pictures data
  public getPictures = (): Promise<{ [key: string]: IPictureModel }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockGalleryResponse)
        //reject('Failed to load pictures')
      }, testTimeoutMs)
    })

  }
}

const galleryService = new GalleryService()

export default galleryService