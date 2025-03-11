import { ChangeDetectionStrategy, Component, Signal, computed, effect, signal } from '@angular/core';
import { Result } from './model/result.interface';
import { data } from './data';
import { DatePipe } from '@angular/common';
import { debounceSignal } from './utils/signal-utilities';


@Component({
  selector: 'app-root',
  imports: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  enteredSearch = signal<string>('');

  searchQuery = debounceSignal(this.enteredSearch, 300) as Signal<string>;

  results = signal<Result[]>(data);

  filteredResults = computed(() => {
    return (this.results() && this.searchQuery()) ? this.results().filter(item =>
      item.title.toLowerCase().includes(this.searchQuery()) ||
      item.content.toLowerCase().includes(this.searchQuery())
    ) : []
  });

  onSearch(event: Event): void {
    const query = event.target as HTMLInputElement
    this.enteredSearch.set(query.value.trim().toLowerCase());
  }

  clearSearch(): void {
    this.enteredSearch.set('');
  }

  highlightText(text: string): string {
    const query = this.searchQuery();
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
