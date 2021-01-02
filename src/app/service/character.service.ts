import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { expand, reduce} from 'rxjs/operators';

@Injectable()
export class CharactersService {

  baseUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any>{
    return this.http.get(this.baseUrl).pipe(
      expand((data:any) => {
        if (data.next) {
          return this.getByURL(data.next);
        }
        else {
          return of();
        }
    }),
    reduce((acc, data: any) => acc.concat(data.results), []),
  );
  }

  getByURL(url): Observable<any>{
      return this.http.get(url);
  }

  getCharacterId(url): number{
    let id = url.split('http://swapi.dev/api/people/')[1].split('/')[0];
    return id;
  }

  getCharacterById(id): Observable<any>{
    return this.http.get(this.baseUrl + id);
  }

}
