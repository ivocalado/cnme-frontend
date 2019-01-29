import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarService{

    constructor(private snackBar: MatSnackBar){}

    public openSnackBar(message: string, action:string="Fechar", duration:number=5000) {
        this.snackBar.open(message, action, {
            duration: duration,
            horizontalPosition: "end"
        });
    }
}