import { Component, OnInit, Input } from '@angular/core';
import { GalleryPicture } from '../interface';

@Component({
  selector: 'app-gallery-unit',
  templateUrl: './gallery-unit.component.html',
  styleUrls: ['./gallery-unit.component.less']
})
export class GalleryUnitComponent implements OnInit {
  @Input() galleryPicture: GalleryPicture;
  constructor() { }

  ngOnInit(): void {
  }

}
