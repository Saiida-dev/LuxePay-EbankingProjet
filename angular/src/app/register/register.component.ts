import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      cin: ['', Validators.required],
      genre: ['', Validators.required], // CLIENT, ADMIN, AGENT
      age: ['', [Validators.required, Validators.min(16)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]]
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      if (formValue.password !== formValue.confirmPassword) {
        alert("❌ Les mots de passe ne correspondent pas.");
        return;
      }

      const payload = {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        cin: formValue.cin,
        role: formValue.genre,
        age: formValue.age,
        telephone: formValue.telephone
      };

      this.authService.register(payload).subscribe({
        next: () => {
          // ✅ Envoie OTP automatiquement après inscription
          this.authService.sendOtp(payload.telephone).subscribe({
            next: () => {
              alert("✅ Compte créé. Code SMS envoyé !");
              this.router.navigate(['/verify-code'], {
                
              });
            },
            error: () => {
              alert("⚠️ Compte créé mais échec de l'envoi du code SMS.");
            }
          });
        },
        error: (err) => {
          console.error("Erreur d'inscription :", err);
          alert("❌ Erreur lors de l'inscription.");
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
