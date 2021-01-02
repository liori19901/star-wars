import {Component, OnInit} from '@angular/core';
import {Character} from '../../models/character.model';
import {Film} from '../../models/film.model';
import {CharactersService} from '../../service/character.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character: Character;
  characterId: number;
  films: Array<Film> = [];
  homeworld: string;

  constructor(private charactersService: CharactersService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.characterId = +params['id'];
      this.getCharacterById();
    });
  }

  getCharacterById(){
    this.charactersService.getCharacterById(this.characterId).subscribe((character: Character) => {
      this.character = character;
      this.getFilms();
      this.getHomeWorld();
    });
  }

  getFilms(){
    for(let i=0; i<this.character.films.length; i++){
      this.charactersService.getByURL(this.character.films[i]).subscribe((res: Film) => {
        this.films.push(res);
      });
    }
  }

  getHomeWorld(){
    this.charactersService.getByURL(this.character.homeworld).subscribe((homeworld: any) => {
      this.homeworld = homeworld.name;
    });
  }

  goBack(){
    this.router.navigate(['/characters-list']);
  }
}
