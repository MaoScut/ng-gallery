import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryUnitComponent } from './gallery-unit/gallery-unit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NumberToRotatePipe } from './pipes/number-to-rotate.pipe';



@NgModule({
  declarations: [GalleryComponent, GalleryUnitComponent, NumberToRotatePipe],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
