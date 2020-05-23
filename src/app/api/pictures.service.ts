import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { mockPictures } from './mock-data';
import { map } from 'rxjs/operators';
import { Picture } from '@model/picture';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor() { }

  getAll(): Observable<Picture[]> {
    return timer(1000).pipe(map(() => mockPictures));
  }
}
