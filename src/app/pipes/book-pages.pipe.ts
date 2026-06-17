import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bookPages', standalone: true })
export class BookPagesPipe implements PipeTransform {
  transform(pages: number | undefined): string {
    if (!pages || pages <= 0) return 'N/A páginas';
    return `${pages} páginas`;
  }
}
