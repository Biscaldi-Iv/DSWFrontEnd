import { Component, HostListener  } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  Url = environment.Url;
  isMenuOpen = true;
  isMobile = true;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isMenuOpen = false;
    }else{
      this.isMenuOpen = true;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
