import { Observable, fromEvent, forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface ImageInfo {
  naturalWidth: number;
  naturalHeight: number;
  // 宽比高
  proportion: number;
}

export function getImageInfo(url: string): Observable<ImageInfo> {
  const imgEle = document.createElement('img');
  imgEle.src = url;
  return fromEvent(imgEle, 'load').pipe(
    take(1),
    map(_ => ({
    naturalWidth: imgEle.naturalWidth,
    naturalHeight: imgEle.naturalHeight,
    proportion: imgEle.naturalWidth / imgEle.naturalHeight,
  })));
}

export function getImagesInfo(urls: string[]): Observable<ImageInfo[]> {
  return forkJoin(urls.map(url => getImageInfo(url)));
}

