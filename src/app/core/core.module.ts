import { Interceptor } from './interceptor/interceptor.service';
import { SpinnerService } from './../shared/services/spinner.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  exports: [],
})
export class CoreModule {}
