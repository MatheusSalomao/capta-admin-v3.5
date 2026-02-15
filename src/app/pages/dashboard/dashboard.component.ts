import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
