import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  personalInfoForm!: FormGroup;
  passwordChangeForm!: FormGroup;

  // Mock user data
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA'
  };

  profilePictureUrl: string | ArrayBuffer | null = null; // To store image data
  initials: string = '';

  settingsOptions = [
    { name: 'Notifications', icon: 'notifications.png', action: 'configureNotifications' },
    { name: '2FA', icon: '2fa.png', action: 'toggle2FA' },
    { name: 'Cartes', icon: 'cards.png', action: 'manageCards' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
    this.setInitials();
  }

  initForms(): void {
    this.personalInfoForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required]
    });

    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  setInitials(): void {
    const firstInitial = this.user.firstName ? this.user.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.user.lastName ? this.user.lastName.charAt(0).toUpperCase() : '';
    this.initials = `${firstInitial}${lastInitial}`;
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (this.personalInfoForm.valid) {
      // Simulate update
      console.log('Profile updated:', this.personalInfoForm.value);
      alert('Profile updated successfully!');
      // In a real app, send data to backend
    } else {
      alert('Please correct the personal information errors.');
    }
  }

  changePassword(): void {
    if (this.passwordChangeForm.valid) {
      // Simulate password change
      console.log('Password changed:', this.passwordChangeForm.value);
      alert('Password changed successfully!');
      this.passwordChangeForm.reset();
      // In a real app, send data to backend
    } else {
      alert('Please correct the password change errors.');
    }
  }

  // Methods for settings options (to be implemented)
  handleSettingAction(actionName: string): void {
    switch (actionName) {
      case 'configureNotifications':
        this.configureNotifications();
        break;
      case 'toggle2FA':
        this.toggle2FA();
        break;
      case 'manageCards':
        this.manageCards();
        break;
      default:
        console.warn(`Unknown setting action: ${actionName}`);
    }
  }

  configureNotifications(): void {
    alert('Configure Notifications clicked!');
  }

  toggle2FA(): void {
    alert('Toggle 2FA clicked!');
  }

  manageCards(): void {
    alert('Manage Cards clicked!');
  }

  getIconPath(iconName: string): string {
    return `assets/icons/${iconName}`;
  }

}
