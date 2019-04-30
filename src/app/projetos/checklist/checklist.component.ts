import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { CheckListsDataService } from 'src/app/_shared/services/checklists-data.service';
import { Checklist } from 'src/app/_shared/models/checklist.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';


@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
    editForm: FormGroup;
    checklist:Checklist = Checklist.EMPTY_MODEL;

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private authService:AuthService,
        private checklistDataService:CheckListsDataService,
        private snackBarService:SnackBarService
    ) { }

    ngOnInit() {
        this.checklistDataService.getLastChecklist().subscribe(
        (checklist:Checklist) => {
            console.log(checklist);
            this.checklist = checklist;
            this.initForm();
        })

    }

    private initForm(){
        this.editForm = new FormGroup({
            versao:new FormControl("", Validators.required),
            descricao:new FormControl(this.checklist.descricao,Validators.required)
        })
    }

    onCancel() {
        this.router.navigate(["../"],{relativeTo:this.route});
    }

    onSubmit(){
        let checklist:Checklist = <Checklist>this.editForm.value;
        this.checklistDataService.storeChecklist(checklist).subscribe(
            res=>{
                this.snackBarService.openSnackBar("Termo de aceite do checklist atualizado com sucesso");
                this.router.navigate(["../"], { relativeTo: this.route });
            },
            error => {
                console.log(error);
            }
        );
    }

}
