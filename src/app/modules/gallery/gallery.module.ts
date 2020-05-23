import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryUnitComponent } from './gallery-unit/gallery-unit.component';



@NgModule({
  declarations: [GalleryComponent, GalleryUnitComponent],
  imports: [
    CommonModule,
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
