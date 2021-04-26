import { Component, OnInit,Input } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {Publication} from '../../models/publication';
import {UserService} from '../../services/user.service';
import {PublicationService} from '../../services/publication.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  public identity;
  public token;
  public title: string;
  public url:string;
  public status:string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[];
  @Input() user:string; /* se recivira desde fuera del componente */

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService: UserService ,
    private _publicationService:PublicationService)
    {
    this.title = 'Publicaciones';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken(); 
    this.url= GLOBAL.url; 
    this.page = 1;     
  }

  ngOnInit(): void {
    console.log("Se cargo componente publications");
    console.log(this.user);
    this.getPublications(this.user,this.page); //* propiedad user es recivida desde fuera del componente */

  }
  getPublications(user,page,adding = false){/* muestra solo las publicaciones dle usuario especifico que elijamos */
    this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
      response =>{
        if(response.publications){                     
          this.total = response.total_items;
          this.pages=response.pages;
          this.itemsPerPage = response.items_per_page;
          console.log(this.page +'  '+ this.pages);         
          if(!adding){
            this.publications= response.publications;                       
          }else{
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);           
          }         
        }else{
          this.status = 'error';          
        }
      },
      error => {
        var  errorMessage  = <any>error; 
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';          
        }          
      }
    )
    
  }
  public noMore = false;
  viewMore(){
    
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;            
    }    
    this.getPublications(this.user,this.page,true);
     
  }

}
