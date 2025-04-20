import { Injectable } from '@angular/core';

interface TrackData {
  buffer: AudioBuffer | null;
  sourceNode: AudioBufferSourceNode | null;
  gainNode: GainNode,
  startTime: number | null,
  pauseOffset: number | null
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext: AudioContext = new AudioContext();
  private tracks: { [trackId: string]: TrackData} = {}

  constructor() { }

  async loadTrackByUrl(trackId: string, url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await this.audioContext.decodeAudioData(arrayBuffer);

    if(!this.tracks[trackId]){
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.audioContext.destination)
      this.tracks[trackId] = {
        buffer: buffer,
        sourceNode: null,
        gainNode: gainNode,
        startTime: null,
        pauseOffset: null
      }
    }
    else this.tracks[trackId].buffer = buffer;
  }

  play(trackId: string): void {
    const track = this.tracks[trackId];

    if (!track || !track.buffer) {
      console.warn(`Track '${trackId}' nije spreman.`);
      return;
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const sourceNode = this.audioContext.createBufferSource();
    sourceNode.buffer = track.buffer;
    sourceNode.connect(track.gainNode);
    if(!track.pauseOffset) sourceNode.start(0, 0);
    else sourceNode.start(0, track.pauseOffset);
    track.sourceNode = sourceNode;
    track.startTime = this.audioContext.currentTime - (track.pauseOffset || 0);
  }

  pause(trackId: string){
    const track = this.tracks[trackId];
    const offset = track.startTime ? this.audioContext.currentTime - track.startTime : 0;
    track.pauseOffset = offset;

    console.log(`Start: ${track.startTime}\nPause: ${track.pauseOffset}`);

    if (!track || !track.buffer) {
      console.warn(`Track '${trackId}' nije spreman.`);
      return;
    }

    track.sourceNode?.stop();
  }

  volumeChange(trackId: string, value: number){
    const track = this.tracks[trackId];
    track.gainNode.gain.value = value;
  }
}
