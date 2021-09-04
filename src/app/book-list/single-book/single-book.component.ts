import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book!: Book;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService) { }

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onGoBack() {
    this.router.navigate(['/books']);
  }
}
