import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { getStorage, ref ,uploadBytesResumable ,getDownloadURL, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: File) {
    return new Promise<string>(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + almostUniqueFileName + file.name);
        const upload = uploadBytesResumable(storageRef, file);

        upload.on('state_changed',
          () => {
            console.log('Loading...');
          },
          (error) => {
            console.log('Loading Error: ' + error);
            reject();
          },
          () => {
            resolve(getDownloadURL(upload.snapshot.ref));
            console.log('Cover Downloaded !!');
          }
        );
      }
    );
  }

  deleteFile(book: Book) {
     if(book.cover) {
      const storage = getStorage();
      const CoverStoragRef = ref(storage, book.cover);

      deleteObject(CoverStoragRef).then(
        () => {
          console.log('cover deleted !!');
        }
      ).catch(
        (error) => {
          console.log('Error!! Faile To Delete File: ' + error);
        }
      );
    }
  }
}
