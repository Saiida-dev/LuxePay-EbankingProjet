import { Component, OnInit, HostListener } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-ebank';
  sidebarOpen: boolean = true; // Default to open on large screens
  isMobileView: boolean = false;
  showNavbarAndHeader: boolean = false; // Control visibility of navbar and header

  constructor(private router: Router) {
    // Subscribe to router events to control header/navbar visibility
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbarAndHeader = !(['/login', '/register', '/home','/verify-code', 'verify-code?username=$username'].includes(event.urlAfterRedirects));
    });
  }

  ngOnInit(): void {
    if (Array.isArray(registerables)) {
      Chart.register(...registerables);
    } else {
      console.error('Chart.js registerables is not an array.', registerables);
    }
    this.checkMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
  }

  checkMobileView(): void {
    this.isMobileView = window.innerWidth <= 768; // Adjust breakpoint as needed
    if (!this.isMobileView) {
      this.sidebarOpen = true; // Always open on large screens
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
}
