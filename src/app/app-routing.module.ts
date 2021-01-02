import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterDetailsComponent} from './components/character-details/character-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'characters-list', pathMatch: 'full' },
  { path: 'characters-list', component: CharactersListComponent },
  { path: 'character-details/:id', component: CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
