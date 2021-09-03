import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAUhBkltu758l76kvAnTS8WwFBl5bmhWag",
      authDomain: "books-library-13d17.firebaseapp.com",
      projectId: "books-library-13d17",
      storageBucket: "books-library-13d17.appspot.com",
      messagingSenderId: "434906818178",
      appId: "1:434906818178:web:f6b4262ab006c417d1f69b",
      measurementId: "G-K9SCBJXJ7E"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
