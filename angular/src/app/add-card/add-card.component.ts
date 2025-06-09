import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Card } from 'src/app/models/card';
import { CarteType } from 'src/app/enums/carte-type';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  addCardForm!: FormGroup;
  accountId!: number;
  carteTypes = Object.values(CarteType);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accountId = +id; // Convert string to number
        this.initForm();
      } else {
        console.error('Account ID not found in route for adding card.');
        // Optionally, redirect to a different page or show an error
        this.router.navigate(['/settings/account']);
      }
    });
  }

  initForm(): void {
    this.addCardForm = this.fb.group({
      numero_carte: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]], // 16 digits
      expiration_date: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]], // MM/YY
      carte_type: ['', Validators.required],
      status: [true]
    });
  }

  onSubmit(): void {
    if (this.addCardForm.valid) {
      const newCard: Card = { ...this.addCardForm.value, id_compte: this.accountId };
      this.userService.addCard(newCard).subscribe({
        next: (response: Card) => {
          console.log('Card added successfully:', response);
          alert('Card added successfully!');
          this.router.navigate(['/settings/cards', this.accountId]); // Redirect to cards list
        },
        error: (err: any) => {
          console.error('Error adding card:', err);
          alert('Failed to add card: ' + (err.error.message || err.message));
        }
      });
    } else {
      console.error('Form is invalid.');
      alert('Please fill in all required fields correctly.');
    }
  }
}
