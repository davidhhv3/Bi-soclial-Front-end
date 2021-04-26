import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {Publication} from '../../models/publication';
import {UserService} from '../../services/user.service';
import {PublicationService} from '../../services/publication.service';
import {GLOBAL} from '../../services/global';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
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
  public showImage;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService: UserService ,
    private _publicationService:PublicationService)
    {
    this.title = 'TimeLine';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken(); 
    this.url= GLOBAL.url; 
    this.page = 1;     
  }

  ngOnInit(): void {
    console.log("Se cargo componente timeline");
    this.getPublications(this.page);
        
  }
  getPublications(page,adding = false){
    this._publicationService.getPublications(this.token,page).subscribe(
      response =>{
        if(response.publications){          
          this.total = response.total_items;
          this.pages=response.pages;
          this.itemsPerPage = response.items_per_page;
          
          if(!adding){
            this.publications= response.publications;
          }else{
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
            
            //$("html,body").animate({ scrollTop: $('body').prop("scrollHeight")},500); /* para hacer animacion pero no sirvio jquery */
          }        
          
          if(page > this.pages){
            //this._router.navigate(['/home']);
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
    this.getPublications(this.page,true);
  }
  refresh(event = null){/* para refrescar automaticamente y sin cargar pagina al hacer una publicacion -->*/    
    this.getPublications(1);
  }
  showThisImage(id){
    this.showImage = id; 
  }
  hideThisImage(id){
    this.showImage = 0;     
  }
  deletePubliation(id){
    this._publicationService.deletePublication(this.token,id).subscribe(
       response => {
         this.refresh();
       },
       error => {
         console.log(<any>error);
       }
    );
  }

}
