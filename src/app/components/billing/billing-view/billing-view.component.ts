import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-billing-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './billing-view.component.html',
  styleUrl: './billing-view.component.scss'
})
export class BillingViewComponent {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() data: any;

}
