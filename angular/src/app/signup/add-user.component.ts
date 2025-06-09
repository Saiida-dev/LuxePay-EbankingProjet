import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserServiceService , private route : Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      cin: ['', Validators.required],
      genre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
     // console.log(newUser.age)
     // console.log(newUser.cin)
     // console.log(newUser.genre)
     // console.log(newUser.password)
      this.userService.signup(newUser).subscribe(response => {
          console.log('User added successfully:', response);
          this.route.navigateByUrl("/fr");
      }, error => {
        console.error('Error adding user:', error);
      });
    } else {
      console.log('Form is invalid');
    }
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      cin: ['', Validators.required],
      genre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
