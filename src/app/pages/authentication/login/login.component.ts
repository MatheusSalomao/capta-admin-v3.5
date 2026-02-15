import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { BrandingComponent } from '@app/layouts/full/vertical/sidebar/branding.component';
import { SessoesService } from '@app/api';
import { LocalStorageService } from '@app/services/local-storage.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, BrandingComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  sessao = inject(SessoesService);
  storage = inject(LocalStorageService);
  router = inject(Router);
  isSubmitting = false;
  authErrorMessage = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.isSubmitting || this.form.invalid) {
      return;
    }
    this.authErrorMessage = '';
    this.isSubmitting = true;
    this.sessao
      .token({
        email: this.form.value.email as string,
        senha: this.form.value.password as string,
      })
      .pipe(
        tap(res => {
          this.storage.setToken(res.token);
        }),
        switchMap(() => this.sessao.unidades()),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: unidades => {
          const primeiraUnidade = unidades[0];
          if (primeiraUnidade) {
            this.storage.setUnidade(primeiraUnidade);
          }
          this.router.navigate(['/dashboard']);
        },
        error: (error: unknown) => {
          this.authErrorMessage = this.resolveAuthErrorMessage(error);
        },
      });
  }

  private resolveAuthErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'Não foi possível conectar ao servidor.';
      }
      if (error.status === 401 || error.status === 403) {
        return 'E-mail ou senha inválidos.';
      }
      if (error.status === 422) {
        return 'Dados inválidos. Verifique os campos informados.';
      }
      if (error.status >= 500) {
        return 'Erro no servidor. Tente novamente mais tarde.';
      }
    }
    return 'Não foi possível autenticar. Tente novamente.';
  }
}
