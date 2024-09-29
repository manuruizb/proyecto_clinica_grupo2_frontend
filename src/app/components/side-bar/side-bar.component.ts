import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { firstValueFrom } from 'rxjs';
import { Menu } from '../../models/menu';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  isActive: boolean = false;
  menuList: Menu[] = [];

  constructor(private menuService: MenuService) { }

  async ngOnInit() {
    await this.getMenu();
  }

  toggle() {
    this.isActive = !this.isActive;
  }

  async getMenu() {
    this.menuList = await firstValueFrom(this.menuService.getMenu());
  }
}
