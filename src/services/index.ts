import { IPictureModel } from '../models/picture/modelPicture'

export interface IGalleryService {

  getPictures(): Promise<{ [key: string]: IPictureModel }>
}