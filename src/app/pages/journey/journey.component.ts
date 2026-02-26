import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsideComponent } from '@app/pages/journey/lead-aside/aside.component';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-journey',
  imports: [MatCard, MatCardContent, AsideComponent, MatTabGroup, MatTab, MatTabLabel, MatIcon],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {}
