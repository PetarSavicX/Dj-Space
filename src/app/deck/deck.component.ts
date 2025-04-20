import { Component } from '@angular/core';
import { TrackComponent } from './track/track.component';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [TrackComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  
  constructor(private audio: AudioService){  }

  onVolume(trackId: 'A' | 'B', value: number){
    this.audio.volumeChange(trackId, value/100);
  }

}
