import { Component, effect } from '@angular/core';
import { CoreService } from '@app/services/core.service';
import { AppSettings } from '@app/config';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <a href="/" class="logodark">
      <img src="./assets/images/logos/dark-logo.svg" class="align-middle m-2 rtl:-scale-x-100" alt="logo" />
    </a>

    <a href="/" class="logolight">
      <img src="./assets/images/logos/light-logo.svg" class="align-middle m-2 rtl:-scale-x-100" alt="logo" />
    </a>
  `,
})
export class BrandingComponent {
  options: AppSettings;

  constructor(private settings: CoreService) {
    this.options = this.settings.options();
    effect(() => {
      const updated = this.settings.options();
      queueMicrotask(() => {
        this.options = updated;
      });
    });
  }
}
