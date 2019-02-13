import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarService{

    constructor(private snackBar: MatSnackBar){}

    public openSnackBar(
        message: string,
        action: string = "Fechar",
        duration: number = 5000,
        vPosition: MatSnackBarVerticalPosition = 'bottom',
        hPosition:MatSnackBarHorizontalPosition='end',

        ) {
        this.snackBar.open(message, action, {
            duration: duration,
            horizontalPosition: hPosition,
            verticalPosition: vPosition
        });
    }
    public closeSnackBar(){
        this.snackBar.dismiss();
    }
}