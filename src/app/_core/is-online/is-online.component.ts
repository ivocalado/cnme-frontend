import { Component, OnInit } from '@angular/core';
import { Observable, of, fromEvent, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: 'app-is-online',
    template: '',
    styles: ['']
})
export class IsOnlineComponent implements OnInit {
    online: Observable<boolean>;
    constructor(private snackBarService:SnackBarService) {
        this.online = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
        )
        this.networkStatus()
    }

    public networkStatus() {
        this.online.subscribe(value => {
            if(!value){
                this.snackBarService.openSnackBar('Sem conexão com a internet.', '', 0);
            }else{
                this.snackBarService.closeSnackBar();
            }
        })
    }

    ngOnInit() {
    }

}
