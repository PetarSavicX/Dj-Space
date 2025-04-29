import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVolumeDrag]',
  standalone: true
})
export class VolumeDragDirective {
  @Input() head!: HTMLDivElement;
  @Input() trail!: HTMLDivElement;
  private slider: HTMLElement;
  private isDraging: boolean = false;
  @Output() updateVolume = new EventEmitter<number>;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.slider = this.el.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent){
    this.isDraging = true;
    this.updateSlider(event.clientY);
    window.addEventListener('mousemove', this.onMouseMoveBound);
    window.addEventListener('mouseup', this.onMouseUpBound);
  }
  
  onMouseMove(event: MouseEvent){
    if(this.isDraging){
      this.updateSlider(event.clientY)
    }
  }
  private onMouseMoveBound = this.onMouseMove.bind(this);

  onMouseUp = () => {
    this.isDraging = false;
    window.removeEventListener('mousemove', this.onMouseMoveBound);
    window.removeEventListener('mouseup', this.onMouseMoveBound);
  }
  private onMouseUpBound = this.onMouseUp.bind(this);


  updateSlider(y: number){
    const rect = this.slider.getBoundingClientRect();

    let percent = (rect.bottom - y) / rect.height;
    percent = Math.max(0, Math.min(1, percent));
    percent = Math.round(percent * 100);

    if(this.head){
      this.renderer.setStyle(this.head, 'bottom', `${percent}%`);
    }
    if(this.trail){
      this.renderer.setStyle(this.trail, 'height', `${percent}%`);
    }

    this.updateVolume.emit(percent);
  }

}
