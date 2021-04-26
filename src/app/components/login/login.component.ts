import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title:string;
  public user:User;
  public status:string;
  public identity;
  public token;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) {
    this.title= "Identificate";
    this.user = new User("","","","","","","ROLE_USER","","")    
   }

  ngOnInit(): void {
    console.log("Componente de login cargado...");
  }
  onSubmit(){
   this._userService.singup(this.user).subscribe(
     response => {
       this.identity = response.user;
       console.log(this.identity);
       if(!this.identity || !this.identity._id){
        this.status = 'error';        
       }else{
        /* this.status = 'succes';  */
        /* persistir datos usuario */
        localStorage.setItem('identity',JSON.stringify(this.identity));/*Almaceno el objeto usuario en el localStorange(donde las web almacenan elementos por url)  */
        /* conseguir token */
        this.getToken();
       }                
     },
     error => {
       var errorMessage = <any>error;
       console.log(errorMessage);
       if(errorMessage != null){
         this.status = 'error';         
       }
     }
   )
  }
  getToken(){
    this._userService.singup(this.user,'true').subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if(this.token.length <= 0){
         this.status = 'error';
        }else{
         /* this.status = 'succes'; */ 
         /* persistir token usuario */
         localStorage.setItem('token',this.token);/*Almaceno el token en el localStorange(donde las web almacenan elementos por url)  */
 
         /* conseguir los contadores o estadisticas del usuario */
         this.getCounters();
         /* this._router.navigate(['/']); */
        }                    
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )   
  }
  getCounters(){     
    this._userService.getCounters().subscribe(
      response => {
         console.log(response); 
         localStorage.setItem('stats',JSON.stringify(response));/* almaceno las estadisticas en el localStorage */
         this.status='succes';
         this._router.navigate(['/']);      
      },
      err => {
        console.log(err);
      }     
    )
  }
  


}
