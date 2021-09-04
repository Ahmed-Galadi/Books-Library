import { Book } from './../../models/book.model';
import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);

    this.booksService.creatBook(newBook);
    this.router.navigate(['/books']);
  }

}
