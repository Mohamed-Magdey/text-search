import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Result } from './model/result.interface';
import { data } from './data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  searchQuery = signal<string>('');

  results = signal<Result[]>(data);

  filteredResults = signal([...this.results()]);

  onSearch(event: Event): void {
    const query = event.target as HTMLInputElement
    this.searchQuery.set(query.value.trim());
    const searchValue = query.value.toLowerCase();
    if (!searchValue) {
      this.filteredResults.set([...this.results()]);
    } else {
      const filtered = this.results().filter(item =>
        item.title.toLowerCase().includes(searchValue) ||
        item.content.toLowerCase().includes(searchValue)
      );
      this.filteredResults.set(filtered);
    }
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.filteredResults.set([...this.results()]);
  }

  highlightText(text: string): string {
    const query = this.searchQuery();
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
