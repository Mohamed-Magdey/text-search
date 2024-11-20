import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchQuery = signal('');

  onSearch(event: string): void {
    console.log(event);
    this.searchQuery.set(event);
  }

  clearSearch(): void {

  }
}
