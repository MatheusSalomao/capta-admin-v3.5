import { Component, Output, EventEmitter, Input, ViewEncapsulation, effect } from '@angular/core';
import { CoreService } from '@app/services/core.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '@app/material.module';
import { AppSettings } from '@app/config';

@Component({
  selector: 'app-header',
  imports: [TablerIconsModule, MaterialModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  @Output() optionsChange = new EventEmitter<AppSettings>();

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

  private emitOptions() {
    this.optionsChange.emit(this.options);
  }

  setlightDark(theme: string) {
    this.options.theme = theme;
    this.emitOptions();
  }
}
