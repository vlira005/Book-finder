import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonBadge,
  IonSpinner, IonText, IonFooter, IonButton,
} from '@ionic/angular/standalone';
import { BooksService, Book } from '../services/books.service';
import { HighlightDirective } from '../directives/highlight.directive';

interface BookSection {
  title: string;
  query: string;
  books: ReturnType<typeof signal<Book[]>>;
  isLoading: ReturnType<typeof signal<boolean>>;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonBadge,
    IonSpinner, IonText, IonFooter, IonButton,
    HighlightDirective,
  ],
})
export class LandingPage implements OnInit {
  sections: BookSection[] = [
    { title: 'Clássicos da Literatura', query: 'subject:classic fiction', books: signal([]), isLoading: signal(true) },
    { title: 'Ficção Científica', query: 'subject:science fiction', books: signal([]), isLoading: signal(true) },
    { title: 'Fantasia', query: 'subject:fantasy', books: signal([]), isLoading: signal(true) },
  ];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.sections.forEach(section => this.loadSection(section));
  }

  loadSection(section: BookSection) {
    this.booksService.searchBooks(section.query).subscribe({
      next: (data) => {
        section.books.set(data.slice(0, 6));
        section.isLoading.set(false);
      },
      error: () => { section.isLoading.set(false); },
    });
  }

  goToSearch() {
    this.router.navigate(['/home']);
  }

  goToDetail(book: Book) {
    this.router.navigate(['/detail', encodeURIComponent(book.key)]);
  }

  getCoverUrl(book: Book): string {
    return book.cover_i
      ? this.booksService.getCoverUrl(book.cover_i, 'M')
      : 'https://placehold.co/100x140?text=Sem+Capa';
  }
}
