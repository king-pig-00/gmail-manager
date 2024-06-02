import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
  getData() {
    return [
      {
        itemImageSrc: './assets/images/slider/1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: './assets/images/slider/2.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc: './assets/images/slider/3.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }
}
