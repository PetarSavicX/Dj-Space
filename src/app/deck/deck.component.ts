import { Component } from '@angular/core';
import { TrackComponent } from './track/track.component';
import { AudioService } from '../services/audio.service';
import { VolumeDragDirective } from '../directives/volume-drag.directive';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [TrackComponent, VolumeDragDirective],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  
  constructor(private audio: AudioService){  }

  updateVolume(trackId: 'A' | 'B', value:number){
    this.audio.volumeChange(trackId, value)
  }

}
