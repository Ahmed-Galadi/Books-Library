import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  creatNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth , email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut() {
    getAuth().signOut();
  }
}
