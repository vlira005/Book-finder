import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonSpinner, IonText,
  IonBadge, IonButton,
} from '@ionic/angular/standalone';
import { BooksService } from '../services/books.service';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonSpinner, IonText,
    IonBadge, IonButton,
    HighlightDirective,
  ],
})
export class DetailPage implements OnInit {
  bookDetail = signal<any>(null);
  isLoading = signal(false);
  errorMessage = '';
  bookKey = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookKey = decodeURIComponent(id);
      this.loadDetail();
    }
  }

  loadDetail() {
    this.isLoading.set(true);
    this.booksService.getBookDetail(this.bookKey).subscribe({
      next: (data) => { this.bookDetail.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage = 'Não foi possível carregar os detalhes.'; this.isLoading.set(false); },
    });
  }

  getDescription(): string {
    if (!this.bookDetail()?.description) return 'Sem descrição disponível.';
    if (typeof this.bookDetail().description === 'string') return this.bookDetail().description;
    return this.bookDetail().description?.value ?? 'Sem descrição disponível.';
  }

  goBack() { this.router.navigate(['/home']); }
}
