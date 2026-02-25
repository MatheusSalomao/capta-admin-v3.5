import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsideComponent } from '@app/pages/journey/lead-aside/aside.component';

@Component({
  selector: 'app-journey',
  imports: [MatCard, MatCardContent, AsideComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {}
