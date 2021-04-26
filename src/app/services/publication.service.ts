import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';/* para recojer respuestas que regresa el api */
import {GLOBAL} from './global';
import {Publication} from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url:string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   addPublication(token,publication):Observable<any>{
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type','application/json') 
                                   .set('Authorization',token);
    return this._http.post(this.url+'publication',params,{headers:headers});                  
   }
   getPublications(token,page = 1):Observable<any>{/* captura publicaciones solo de los usuarios que seguimos */
    let headers = new HttpHeaders().set('Content-Type','application/json') 
                                  .set('Authorization',token);
    return this._http.get(this.url+'publications/'+page,{headers:headers});
   }

   getPublicationsUser(token,user_id,page = 1):Observable<any>{/*  muestra solo las publicaciones dle usuario especifico que elijamos */ 
    let headers = new HttpHeaders().set('Content-Type','application/json') 
                                  .set('Authorization',token);
    return this._http.get(this.url+'publications-user/'+user_id+'/'+page,{headers:headers});
   }

   deletePublication(token, id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json') 
                                   .set('Authorization',token);
     return this._http.delete(this.url+'publication/'+id,{headers:headers});

   }
}
