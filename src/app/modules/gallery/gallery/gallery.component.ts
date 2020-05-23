import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GalleryPicture } from '../interface';
import { PicturesService } from '@api/pictures.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
  data: BehaviorSubject<GalleryPicture[]> = new BehaviorSubject([]);
  constructor(
    private entitiesService: PicturesService
  ) { }

  ngOnInit(): void {
    this.entitiesService.getAll().subscribe(res => {
      this.data.next(res.map(o => {
        const layout = {
          x: 1,
          y: 1,
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

}
