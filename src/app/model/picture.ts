import { ImageInfo } from '@utils/image';

export interface Picture extends ImageInfo {
  name: string;
  description: string;
  url: string;
  id: string;
}
