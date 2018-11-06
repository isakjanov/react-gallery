import {
  IPictureModel
} from '../models/picture/modelPicture'

const mockGalleryResponse: { [key: string]: IPictureModel } = {
  '1': { id: '1', url: '/images/1.jpg' },
  '2': { id: '2', url: '/images/2.jpg' },
  '3': { id: '3', url: '/images/3.jpg' },
  '4': { id: '4', url: '/images/4.jpg' },
  '5': { id: '5', url: '/images/5.jpg' }
}

class GalleryService {
  // private baseUrl = '/api/picture'

  public getPictures = (): Promise<{ [key: string]: IPictureModel }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockGalleryResponse)
        //reject('Failed to load pictures')
      }, 1000)
    })

  }
}

const galleryService = new GalleryService()

export default galleryService