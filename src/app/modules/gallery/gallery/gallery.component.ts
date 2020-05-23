import { Component, OnInit, ViewChild, ElementRef, TrackByFunction } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { GalleryPicture } from '../interface';
import { PicturesService } from '@api/pictures.service';
import { getIntRandomWithUpper, getRandomRotate } from '@utils/random';
import { getImageInfo } from '@utils/image';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less'],
})
export class GalleryComponent implements OnInit {
  data: BehaviorSubject<GalleryPicture[]> = new BehaviorSubject([]);
  @ViewChild('gallery') galleryDom: ElementRef<HTMLDivElement>;
  trackByFn: TrackByFunction<GalleryPicture> = (index, item) => item.id;
  constructor(
    private entitiesService: PicturesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    this.spinner.show();
    this.entitiesService
      .getAll()
      .pipe(
        tap((res) => {
          this.data.next(
            res.map((o) => {
              const layout = {
                x: 0,
                y: 0,
                rotate: 1,
                isReversed: false,
              };
              return {
                ...o,
                ...layout,
              };
            })
          );
        }),
        flatMap(() => timer(500)),
        // finalize和顺序无关，固定最后一个执行
        finalize(() => this.spinner.hide()),
      )
      .subscribe((_) => {
        this.data.next(
          this.data.getValue().map((o) => {
            const layout = {
              x: this.getRandomLeft(),
              y: this.getRandomTop(),
              rotate: getRandomRotate(),
              isReversed: false,
            };
            return {
              ...o,
              ...layout,
            };
          })
        );
      });
  }

  getRandomLeft(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientWidth);
  }

  getRandomTop(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientHeight);
  }

}
