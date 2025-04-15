import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit{
  @Input() trackLabel!: "A" | "B";
  audioNo1: string = "assets/audio/beli-free-phd.mp3";
  audioNo2: string = "assets/audio/beli-free-blingbling.mp3";
  isLoaded: boolean = false;

  constructor(private audio: AudioService) {}

  ngOnInit(): void {
  }
  async load(){
    this.isLoaded = false;
    if(this.trackLabel == 'A'){
      try {
        await this.audio.loadTrackByUrl(this.trackLabel, this.audioNo1);
        console.log("Ucitana pesma A");
      } catch (err){
        console.error("Greska sa A")
      }
    }
    if(this.trackLabel == 'B'){
      try {
        await this.audio.loadTrackByUrl(this.trackLabel, this.audioNo2);
        console.log("Ucitana pesma B");
      } catch (err){
        console.error("Greska sa B")
      }
    }
    this.isLoaded = true;
  }

  play(){
    this.audio.play(this.trackLabel);
  }

  pause(){
    this.audio.pause(this.trackLabel);
  }
}
