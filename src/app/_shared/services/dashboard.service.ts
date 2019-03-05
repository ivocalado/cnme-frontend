import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DashboardDataService{
    constructor(private httpClient:HttpClient, private authService:AuthService){}

    getProjetosStatus(){
        return this.httpClient.get("api/dashboard/projetos/status", {
            headers: new HttpHeaders({"Authorization": 'Bearer ' + this.authService.getToken()})
        })
    }
}