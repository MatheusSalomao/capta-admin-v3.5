import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { LeadAsideComponent } from '@app/pages/journey/lead-aside/lead-aside.component';

@Component({
  selector: 'app-journey',
  imports: [MatCard, MatCardContent, LeadAsideComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {}
