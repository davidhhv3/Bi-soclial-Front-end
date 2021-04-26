import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';/* para trabajar con los forms */
import {HttpClientModule} from '@angular/common/http';
//import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {MomentModule} from 'angular2-moment';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { MainComponent } from './components/messages/components/main/main.component';
import { AddComponent } from './components/messages/components/add/add.component';
import { ReceivedComponent } from './components/messages/components/received/received.component';
import { SendedComponent } from './components/messages/components/sended/sended.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UserComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
