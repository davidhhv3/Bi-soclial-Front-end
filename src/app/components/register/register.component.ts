import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService] /* para cargar servicios que quiro disponible en esta clase */
})
export class RegisterComponent implements OnInit {
  public user:User;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.user = new User("","","","","","","","");           
   }
  ngOnInit(): void {
  }
  onSubmit(){
    //console.log(this.user);
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.user && response.user._id){/* si me llega un objeto user y este tiene dentro una propiedad id hace: */
            //console.log(response.user);
            this.status = 'success';  
            /* falta codigo para limpiar form una vez datos se hayan registrado */      
          }else{
            this.status = 'error';
          }
      },
      error => {
        console.log(<any>error);
      }
    );
  } 
  

}
