import { Picture } from 'src/app/model/picture';

export interface GalleryPicture extends Picture {
  x: number;
  y: number;
  rotate: number;
  isReversed: boolean;
}
