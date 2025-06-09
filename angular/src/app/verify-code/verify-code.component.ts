import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  codeForm: FormGroup;
  telephone: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });

    // On récupère le numéro de téléphone depuis les query params
    this.route.queryParams.subscribe(params => {
      this.telephone = params['telephone'];
    });
  }

  onVerify() {
    const code = this.codeForm.value.code;
    if (code.length === 6) {
      console.log("📱 Code saisi pour vérification :", code, "Téléphone :", this.telephone);
      // Tu peux ici appeler ton backend pour vérifier
      this.router.navigate(['/dashboard/1']);
    } else {
      alert("❌ Code invalide. Il doit contenir 6 chiffres.");
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
