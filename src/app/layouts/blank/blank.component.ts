import { Component, effect } from '@angular/core';
import { CoreService } from '@app/services/core.service';
import { AppSettings } from '@app/config';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  private htmlElement!: HTMLHtmlElement;

  options: AppSettings;

  constructor(private settings: CoreService) {
    this.htmlElement = document.querySelector('html')!;
    this.options = this.settings.options();
    // Initialize and keep theme in sync with settings
    effect(() => {
      const updated = this.settings.options();
      queueMicrotask(() => {
        this.options = updated;
        this.receiveOptions(updated);
      });
    });
  }

  receiveOptions(options: AppSettings): void {
    this.toggleDarkTheme(options);
    this.toggleColorsTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }

  toggleColorsTheme(options: AppSettings) {
    // Remove any existing theme class dynamically
    this.htmlElement.classList.forEach(className => {
      if (className.endsWith('_theme')) {
        this.htmlElement.classList.remove(className);
      }
    });

    // Add the selected theme class
    this.htmlElement.classList.add(options.activeTheme);
  }
}
