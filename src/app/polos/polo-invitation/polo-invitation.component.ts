import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polo-invitation',
  templateUrl: './polo-invitation.component.html',
  styleUrls: ['./polo-invitation.component.scss']
})
export class PoloInvitationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Invocado PoloInvitationComponent")
  }

}
