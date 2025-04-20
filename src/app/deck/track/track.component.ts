import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

interface Control{
  value: string,
  controlFunc: Function,
  active: boolean | null 
}

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit{
  @Input() trackLabel!: "A" | "B";
  loopValues = ['1/2', '1/4', '1/8', '1/16', '1/32', '1/64']
  controls : Control[] = [
    {value: 'play', controlFunc: () => this.play(), active: false},
    {value: 'pause', controlFunc: () => this.pause(), active: false},
    ...this.loopValues.map((value, index) => ({
      value: value,
      controlFunc: () => this.loop(value),
      active: false,
    }))
  ];
  audioNo1: string = "assets/audio/nuncake-stajl-smoke.mp3";
  audioNo2: string = "assets/audio/stepski-vuk-smoke.mp3";
  isLoaded: boolean = false;

  constructor(private audio: AudioService) {}

  ngOnInit(): void {
    this.load();
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
    this.controls.find(cont => cont.value == 'play')!.active = true;
    this.controls.find(cont => cont.value == 'pause')!.active = false;
    console.table(this.controls);
  }

  pause(){
    this.audio.pause(this.trackLabel);
    this.controls.find(cont => cont.value == 'pause')!.active = true;
    this.controls.find(cont => cont.value == 'play')!.active = false;
    console.table(this.controls);

  }

  loop(value: string) {
    this.controls.map(cont => {
      if(cont.value != 'play' && cont.value != 'pause')
      cont.active = false;
    })
    this.controls.find(cont => cont.value == value)!.active = true;
  }
}
