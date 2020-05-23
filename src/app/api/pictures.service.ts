import { Injectable } from '@angular/core';
import { timer, Observable, forkJoin } from 'rxjs';
import { mockPictures } from './mock-data';
import { map, flatMap } from 'rxjs/operators';
import { Picture } from '@model/picture';
import { getImagesInfo, getImageInfo } from '@utils/image';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor() { }

  getAll(): Observable<Picture[]> {
    return timer(1000).pipe(flatMap(() => {
      return forkJoin(mockPictures.map(p => getImageInfo(p.url).pipe(map(res => ({
        ...res,
        ...p,
      })))));
    }));
  }
}
