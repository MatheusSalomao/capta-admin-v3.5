import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'journey-aside-header',
  templateUrl: './aside-header.component.html',
  imports: [TablerIconsModule],
})
export class AsideHeaderComponent {
  @Input() asideCollapsed = false;
  @Output() search = new EventEmitter<string>();
  @Output() toggleAsideCollapsed = new EventEmitter<string | undefined>();
}
