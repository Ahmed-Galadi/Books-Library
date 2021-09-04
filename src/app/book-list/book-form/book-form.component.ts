import { UploadService } from './../../services/upload.service';
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
  fileIsUploading: boolean = false;
  fileUrl!: string;
  fileUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private uploadService: UploadService,
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

    if(this.fileUrl && this.fileUrl !== '') {
      newBook.cover = this.fileUrl;
    }
    this.booksService.creatBook(newBook);
    this.router.navigate(['/books']);
  }

  onUpLoadFile(file: File) {
    this.fileIsUploading = true;
    this.uploadService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  onDetectFile(event: any) {
    this.onUpLoadFile(event.target.files[0]);
  }

}
