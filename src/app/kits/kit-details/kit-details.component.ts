import { Component, OnInit } from '@angular/core';
import { KitDataService } from '../../_shared/services/kit-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';

@Component({
    selector: 'app-kit-details',
    templateUrl: './kit-details.component.html',
    styleUrls: ['./kit-details.component.scss']
})
export class KitDetailsComponent implements OnInit {
    kit: Kit = Kit.EMPTY_MODEL;

    constructor(
        private kitDataService: KitDataService,
        private route:ActivatedRoute,
        private router:Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params) =>{
            const kitId = +params["id"];
            this.kitDataService.getKit(kitId).subscribe((kit:Kit) =>{
                this.kit = kit;
             })
        })
    }
    onCancel(){
        this.router.navigate(['/kits'], {relativeTo:this.route});
    }

}
