import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Galleria } from 'primeng/galleria';
import { PhotoService } from './photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ProgressBarModule,
    DividerModule,
    DialogModule,
    InputTextareaModule,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
  providers: [PhotoService],
})
export class WalletComponent {
  photoService = inject(PhotoService);
  images: any[] | undefined;

  isBettingForm$ = false;
  //   @ViewChild('galleria') galleria: Galleria | undefined;

  ngOnInit() {
    this.photoService.getImages().then((images) => (this.images = images));
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  showBettingForm() {

  }
}
