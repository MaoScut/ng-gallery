import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GalleryPicture } from '../interface';
import { PicturesService } from '@api/pictures.service';
import { getIntRandomWithUpper } from '@utils/random';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
  data: BehaviorSubject<GalleryPicture[]> = new BehaviorSubject([]);
  @ViewChild('gallery') galleryDom: ElementRef<HTMLDivElement>;
  constructor(
    private entitiesService: PicturesService
  ) { }

  ngOnInit(): void {
    this.entitiesService.getAll().subscribe(res => {
      this.data.next(res.map(o => {
        const layout = {
          x: this.getMaxLeft(),
          y: this.getMaxTop(),
          rotate: 1,
          isReversed: false,
        };
        return {
          ...o,
          ...layout,
        };
      }));
    });
  }

  getMaxLeft(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientWidth);
  }

  getMaxTop(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientHeight);
  }

}
