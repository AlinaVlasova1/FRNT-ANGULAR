import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TicketsModule} from "./pages/tickets/tickets.module";
import {SettingsModule} from "./pages/settings/settings.module";



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "tickets",
    loadChildren: ()  => import('src/app/pages/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: "settings",
    loadChildren: ()  => import('src/app/pages/settings/settings.module').then(m => m.SettingsModule)
  },

  { path: '**',
   redirectTo: 'auth'
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
