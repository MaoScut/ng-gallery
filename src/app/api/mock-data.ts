import { Picture } from '../model/picture';


const pictureCount = 21;

function dataFactory(): Picture[] {
  const result: Picture[] = [];
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

export const mockPictures: Picture[] = dataFactory();
