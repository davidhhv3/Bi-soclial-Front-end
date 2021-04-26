import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import {TimelineComponent} from './components/timeline/timeline.component'
import { ProfileComponent } from './components/profile/profile.component';
import {FollowingComponent} from './components/following/following.component'
import { FollowedComponent } from './components/followed/followed.component';
import { MainComponent } from './components/messages/components/main/main.component';
import { AddComponent } from './components/messages/components/add/add.component';
import { ReceivedComponent } from './components/messages/components/received/received.component';
import { SendedComponent } from './components/messages/components/sended/sended.component';

import {UserGuardService} from './services/user-guard.service';


const routes: Routes = [
  {path : '',component:HomeComponent},
  {path : 'home',component:HomeComponent},
  {path: 'login',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path:'mis-datos',component:UserEditComponent,canActivate:[UserGuardService]},
  {path:'gente',component:UserComponent,canActivate:[UserGuardService]},
  {path:'gente/:page',component:UserComponent,canActivate:[UserGuardService]},
  {path:'timeline',component:TimelineComponent,canActivate:[UserGuardService]},
  {path:'perfil/:id',component:ProfileComponent,canActivate:[UserGuardService]},
  {path:'siguiendo/:id/:page',component:FollowingComponent,canActivate:[UserGuardService]},
  {path:'seguidores/:id/:page',component:FollowedComponent,canActivate:[UserGuardService]},

  {path:'mensajes',component:MainComponent,
     children: [
      {path:'',redirectTo: 'recibidos', pathMatch: 'full'},
      {path:'enviar',component:AddComponent,canActivate:[UserGuardService]},  
      {path:'recibidos',component:ReceivedComponent,canActivate:[UserGuardService]},
      {path:'recibidos/:page',component:ReceivedComponent,canActivate:[UserGuardService]},  
      {path:'enviados',component:SendedComponent,canActivate:[UserGuardService]}, 
      {path:'enviados/:page',component:SendedComponent,canActivate:[UserGuardService]}   
     ]
     
  },


  {path:'**',component:HomeComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
