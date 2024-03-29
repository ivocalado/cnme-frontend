import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Checklist } from '../models/checklist.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckListsDataService{
    constructor(private httpClient:HttpClient, private authService:AuthService){}

    storeChecklist(checklist:Checklist){
        return this.httpClient.post<Checklist>("api/checklists",checklist,{
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        })
    }

    getLastChecklist(){
        return this.httpClient.get<Checklist>("api/checklists")
            .pipe(map(res => {
                let checklists: Checklist[];
                checklists = res["data"];
                checklists.reverse();
                let checklist = checklists[0];
                return checklist;
            }));
    }

    setChecklistToProjeto(checklistId:number, projetoId:number){
        return this.httpClient.post<Checklist>("/api/checklists/"+checklistId+"/projeto-cnme/"+projetoId,{
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        });
    }
}