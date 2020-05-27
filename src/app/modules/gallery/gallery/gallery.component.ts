import { Component, OnInit, ViewChild, ElementRef, TrackByFunction } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { GalleryPicture } from '../interface';
import { PicturesService } from '@api/pictures.service';
import { getIntRandomWithUpper, getRandomRotate, getRandomLayout } from '@utils/random';
import { getImageInfo } from '@utils/image';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less'],
})
export class GalleryComponent implements OnInit {
  constructor(
    private entitiesService: PicturesService,
    private spinner: NgxSpinnerService
  ) {}
  data: BehaviorSubject<GalleryPicture[]> = new BehaviorSubject([]);
  @ViewChild('gallery') galleryDom: ElementRef<HTMLDivElement>;
  pictureUnitDefaultWidth = 300;
  trackByFn: TrackByFunction<GalleryPicture> = (index, item) => item.id;

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
        this.layoutUnit();
      });
  }

  getRandomLeft(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientWidth);
  }

  getRandomTop(): number {
    return getIntRandomWithUpper(this.galleryDom.nativeElement.clientHeight);
  }
  handleUnitClick(id: string): void {
    const data = this.data.getValue();
    const unit = data.find(o => o.id === id);
    if (unit.isCenter) {
      unit.isReversed = !unit.isReversed;
      this.data.next(data);
    } else {
      this.layoutUnit(unit.id);
    }
  }
  layoutUnit(centerId?: string): void {
    let centerIndex = 0;
    if (centerId) {
      centerIndex = this.data.getValue().findIndex(o => o.id === centerId);
    }
    const defaultWidth = this.pictureUnitDefaultWidth;
    const randomLayouts = getRandomLayout({
      width: this.galleryDom.nativeElement.clientWidth,
      height: this.galleryDom.nativeElement.clientHeight,
    }, this.data.getValue().map(o => {
      return {
        width: defaultWidth,
        height: defaultWidth / o.proportion
      };
    }),
    centerIndex,
    );
    const nextData = this.data.getValue().map((o, index) => {
      const layout = randomLayouts[index];
      return {
        ...o,
        x: layout.x - defaultWidth / 2,
        y: layout.y - (defaultWidth / o.proportion) / 2,
        isReversed: false,
        rotate: layout.rotate,
        isCenter: layout.isCenter,
      };
    });
    this.data.next(nextData);
  }

}
