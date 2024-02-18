import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hangmanGame';
  public word: string = '';
  public hint: string = '';
  public arr?: string[];
  public arr1?: string[];
  public livesLeft = 5;
  public enteredCharacter = '';
  public guessed = false;
  public playerStatus = "not playing";
  public guessedWords = 0;
  public record = 0;
  constructor(private service: HttpServiceService) {}
  ngOnInit(): void {}
  playGame() {
    this.service.getRecord().subscribe((res:number)=>{
      this.record = res
    })
    this.service.getRandomWord().subscribe((word) => {
    
      this.word = word.word;
      this.hint = word.hint;
      this.arr = this.word.split('');
      this.arr1 = Array(this.arr.length).fill('_');
      this.guessed = false
      this.playerStatus = "playing"
      console.log("searching word in inspect hah! you might find it");
      
    });
  }
  validateInput() {
    this.checkIfWin();

    if (this.enteredCharacter !== '' && this.guessed !== true) {
      if (!this.arr?.includes(this.enteredCharacter)) {
        this.livesLeft -= 1;
        if (this.livesLeft === 0) {
          this.playerStatus = "game lost"
        }
      } else {
        for (let index = 0; index < this.arr!.length; index++) {
          if (this.arr![index] === this.enteredCharacter) {
            this.arr1![index] = this.enteredCharacter;
            this.checkIfWin();
          }
        }
      }
    }
    this.enteredCharacter = '';
  }
  checkIfWin() {
    const enteredWord = this.arr1?.join('');
    if (enteredWord === this.word) {
      this.guessed = true;
      this.guessedWords += 1;
      
    } else if (this.enteredCharacter === this.word) {
      for (let index = 0; index < this.arr1!.length; index++) {
        this.arr1![index] = this.enteredCharacter.charAt(index);
      }
      this.guessed = true;
      this.guessedWords += 1;
      this.livesLeft += 1
    } else {
      this.guessed = false;
    }
  }
}
