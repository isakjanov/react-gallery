import {
  IPictureModel
} from '../models/picture/modelPicture'

const mockGalleryResponse: { [key: string]: IPictureModel } = {
  '1': { id: '1', url: '' },
  '2': { id: '2', url: '' },
  '3': { id: '3', url: '' },
  '4': { id: '4', url: '' },
  '5': { id: '5', url: '' }
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