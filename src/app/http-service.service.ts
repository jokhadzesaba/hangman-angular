import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from './interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  public getRandomWord() {
    return this.http
      .get<Word[]>(
        'https://exercise-app-9b873-default-rtdb.europe-west1.firebasedatabase.app/words/-Nqndz_ggJvg8uAVG03F.json'
      )
      .pipe(
        map((response: Word[]) => {
          const randomIndex = Math.floor(Math.random() * response.length);
          return response[randomIndex];
        })
      );
  }
  public getRecord(){
    return this.http.get<number>("https://exercise-app-9b873-default-rtdb.europe-west1.firebasedatabase.app/words/record.json")
  }
}
