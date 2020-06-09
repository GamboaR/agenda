
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    date: '',
    phone: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {


  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),

    });
  }

  register() {
    this.credentials = {
      'phone': this.form.value.phone,
      'name': this.form.value.name,
      'email': this.form.value.email,
      'date': this.form.value.date,
      'password': this.form.value.password
    }

    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}