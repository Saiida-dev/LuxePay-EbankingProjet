import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() accountId!: number;
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  newNotificationsCount: number = 2; // Example: 2 new notifications
  latestNotifications: any[] = [
    { message: 'Your payment of 150 EUR was successful.', time: '2 hours ago' },
    { message: 'New message from support.', time: '1 day ago' }
  ];
  showNotifications: boolean = false;
  showProfileMenu: boolean = false;

  isNotificationDropdownOpen: boolean = false;
  isProfileDropdownOpen: boolean = false;

  notifications: any[] = [ // Placeholder for notifications
    { id: 1, title: 'Nouvelle transaction', date: new Date(), read: false },
    { id: 2, title: 'Mise à jour de sécurité', date: new Date(), read: false },
    { id: 3, title: 'Promotion exclusive', date: new Date(), read: true },
  ];
  unreadNotificationsCount: number = 0;
  userName: string = 'John Doe'; // Placeholder for username

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateUnreadNotificationsCount();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    // Optionally, reset newNotificationsCount when opened
    if (this.showNotifications) {
      this.newNotificationsCount = 0;
    }
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onLogoClick(): void {
    this.toggleSidebarEvent.emit();
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleNotificationDropdown() {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    if (this.isNotificationDropdownOpen) {
      this.isProfileDropdownOpen = false; // Close profile dropdown if notification dropdown is opened
    }
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    if (this.isProfileDropdownOpen) {
      this.isNotificationDropdownOpen = false; // Close notification dropdown if profile dropdown is opened
    }
  }

  markAsRead(notification: any) {
    if (!notification.read) {
      notification.read = true;
      this.updateUnreadNotificationsCount();
      // In a real app, you'd send this update to a backend service
    }
    // Optionally close the dropdown after marking as read
    // this.isNotificationDropdownOpen = false;
  }

  updateUnreadNotificationsCount() {
    this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  }

  logout() {
    console.log('Logging out...');
    // Implement your logout logic here (e.g., clear tokens, navigate to login page)
    this.router.navigate(['/login']); // Example navigation
    this.isProfileDropdownOpen = false; // Close dropdown after logout
  }
}
