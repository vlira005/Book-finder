import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonBadge,
  IonSpinner, IonText, IonFooter,
} from '@ionic/angular/standalone';
import { BooksService, Book } from '../services/books.service';
import { BookPagesPipe } from '../pipes/book-pages.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonBadge,
    IonSpinner, IonText, IonFooter,
    BookPagesPipe, HighlightDirective,
  ],
})
export class HomePage implements OnInit {
  books = signal<Book[]>([]);
  searchTerm = 'tolkien';
  isLoading = signal(false);
  errorMessage = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() { this.search(); }

  // captura o valor direto do evento do Ionic (necessário com debounce)
  onSearch(event: any) {
    this.searchTerm = event.detail.value ?? '';
    this.search();
  }

  search() {
    if (!this.searchTerm.trim()) return;
    this.isLoading.set(true);
    this.errorMessage = '';
    this.books.set([]);
    this.booksService.searchBooks(this.searchTerm).subscribe({
      next: (data) => { this.books.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage = 'Erro ao buscar livros.'; this.isLoading.set(false); },
    });
  }

  goToDetail(book: Book) {
    this.router.navigate(['/detail', encodeURIComponent(book.key)]);
  }

  getCoverUrl(book: Book): string {
    return book.cover_i
      ? this.booksService.getCoverUrl(book.cover_i, 'M')
      : 'https://placehold.co/80x110?text=Sem+Capa';
  }
}
