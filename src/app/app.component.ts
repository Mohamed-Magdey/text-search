import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Result } from './model/result.interface';
import { data } from './data';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  searchQuery = signal<string>('');

  results = signal<Result[]>(data);

  filteredResults = computed<Result[]>(() => {
    return this.results().filter(item =>
      item.title.toLowerCase().includes(this.searchQuery()) ||
      item.content.toLowerCase().includes(this.searchQuery())
    )
  });

  onSearch(event: Event): void {
    const query = event.target as HTMLInputElement
    this.searchQuery.set(query.value.trim().toLowerCase());
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  highlightText(text: string): string {
    const query = this.searchQuery();
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
