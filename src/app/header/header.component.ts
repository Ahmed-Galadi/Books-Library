import { getAuth } from 'firebase/auth';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from '@firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const auth = getAuth();

    onAuthStateChanged(auth,
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
  }

}
