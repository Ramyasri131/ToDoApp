import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaSizeService {

  constructor() { }

  getMediaSize() {
    const width = window.innerWidth;
   
    if (width >= 1024) {
      return 'Desktop';
    } else if (width >= 768) {
      return 'Tablet';
    } else {
      return 'Mobile';
    }
  }
  
}
