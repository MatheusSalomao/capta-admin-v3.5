import { Component } from '@angular/core';
import { CoreService } from '@app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { BrandingComponent } from '@app/layouts/full/vertical/sidebar/branding.component';

@Component({
    selector: 'app-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, BrandingComponent],
    templateUrl: './login.component.html'
})
export class LoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/starter']);
  }
}
