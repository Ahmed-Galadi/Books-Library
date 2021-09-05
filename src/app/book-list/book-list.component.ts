import { BooksService } from './../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  trash = faTrash;

  books: Book[] = []
  booksSubscription!: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject
                                  .subscribe(
                                    (books: Book[]) => {
                                      this.books = books;
                                    }
                                  );
  this.booksService.getBooks();
  this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
