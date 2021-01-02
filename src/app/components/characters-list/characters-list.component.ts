import {Component, OnInit} from '@angular/core';
import {Character} from '../../models/character.model';
import {CharactersService} from '../../service/character.service';
import {Router} from '@angular/router';
import { Observable} from 'rxjs';

@Component({
  selector: 'characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  charactersArray: Array<Character> = [];
  characterName: string;

  constructor(private charactersService: CharactersService, private router: Router) {}

  ngOnInit() {
    this.charactersService.getAllCharacters().subscribe((characters: Array<Character>) => {
      this.charactersArray = characters;
      this.charactersArray.forEach((character, i) => {
        character.id =   this.charactersService.getCharacterId(character.url);
      });
    });
  }

  characterDetails(id){
    this.router.navigate(['/character-details', id]);
  }
}
