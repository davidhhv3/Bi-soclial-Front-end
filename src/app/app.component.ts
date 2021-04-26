import { Route } from '@angular/compiler/src/core';
import { Component,OnInit,DoCheck } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {UserService} from './services/user.service';


import {GLOBAL} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,DoCheck{
  public title:string;
  public identity;

  
  public url : string;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router:Router
  ){
    this.title = 'NGSOCIAL';

    
    this.url= GLOBAL.url;
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();    
    console.log(this.identity);   
        
  }
  ngDoCheck(){/*cada vez que se produsca un cambio en la aplicacion redresca una vARIABLE */
              /* al logearce cambia la cabecera */
              /* no tenemos que refrescar la pantalla al hacer login */
    this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();/* elimina elementos identity y token almacenados en el local Storage */
    this.identity = null;
    this._router.navigate(['/']);
  }
}
