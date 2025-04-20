import { Component } from '@angular/core';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [TrackComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {

}
