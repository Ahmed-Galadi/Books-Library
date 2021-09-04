import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getDatabase, onValue, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    const db = getDatabase();
    set(ref(db, '/books'), this.books);
  }

  getBooks() {
    const db = getDatabase();
    const dataRef = ref(db, '/books');

    onValue( dataRef,
      (dataSnapshot) => {
        this.books = dataSnapshot.val() ? dataSnapshot.val() : [];
        this.emitBooks();
      }
    );
  }

  getSingleBook(id: number) {
    const db = getDatabase();
    const dataRef = ref(db, '/books/' + id);

    return new Promise<Book>(
      (resolve, reject) => {
        onValue(dataRef,
          (dataSnapshot) => {
            resolve(dataSnapshot.val())
          },
          (error) => {
            reject(error);
          },
          {
            onlyOnce: true
          }
        );
      }
    );
  }

  creatBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookElement) => {
        if(bookElement === book) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

}
