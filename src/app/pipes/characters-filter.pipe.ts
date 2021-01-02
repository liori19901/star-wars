import { Pipe, PipeTransform } from '@angular/core';
import {Character} from '../models/character.model';

@Pipe({ name: 'charactersFilter' })
export class CharactersFilterPipe implements PipeTransform {

  transform(characters: Array<Character>, searchText: string): Array<Character> {
    if (!characters) {
      return [];
    }
    if (!searchText) {
      return characters;
    }
    searchText = searchText.toLowerCase();

    return characters.filter(character => {
      return character.name.toLowerCase().includes(searchText);
    });
  }
}
