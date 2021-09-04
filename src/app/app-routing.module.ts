import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuatdService } from './services/auth-guatd.service';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuatdService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuatdService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuatdService], component: SingleBookComponent },
  { path: '**', redirectTo: 'books' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
