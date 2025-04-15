import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeckComponent } from './deck/deck.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DeckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-dj-controller';
}
