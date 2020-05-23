import { Picture } from '@model/picture';

const pictureCount = 21;

type BasicPicture = Pick<Picture, 'name' | 'description' | 'url' | 'id'>;

function dataFactory(): BasicPicture[] {
  const result: BasicPicture[] = [];
  for (let i = 0; i < pictureCount; i ++) {
    result.push({
      name: 'name' + i,
      description: 'description' + i,
      url: `assets/images/${i + 1}.jpg`,
      id: 'id' + i,
    });
  }
  return result;
}

export const mockPictures: BasicPicture[] = dataFactory();
