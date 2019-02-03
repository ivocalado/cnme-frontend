import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: "app-usuario-edit",
    templateUrl: "./usuario-edit.component.html",
    styleUrls: ["./usuario-edit.component.scss"]
})
export class UsuarioEditComponent implements OnInit {
    editmode = false;
    hidePassword = true;
    newPassword = "";

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private snackBarService:SnackBarService
    ) { }

    ngOnInit() { }

    onCancel(){
        this.router.navigate(['/usuarios'], {relativeTo:this.route})
    }
    onSubmit(form:NgForm){
        console.log(form.value);
        this.snackBarService.openSnackBar("Implementar o método de envio.");
        this.router.navigate(['/usuarios'], { relativeTo: this.route });

    }

    generatePassword() {
        this.hidePassword = !this.hidePassword
        console.log(this.newPassword);

        if (this.newPassword === "") {

            var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            var symbols = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'];
            var finalCharacters = lowerCharacters;
            //if(passWord.addUpper){
            finalCharacters = finalCharacters.concat(upperCharacters);
            //}
            //if(passWord.addNumbers){
            finalCharacters = finalCharacters.concat(numbers);
            //}
            //if(passWord.addSymbols){
            finalCharacters = finalCharacters.concat(symbols);
            //}
            var passwordArray = [];
            for (var i = 1; i < 8; i++) {
                passwordArray.push(finalCharacters[Math.floor(Math.random() * finalCharacters.length)]);
            };
            console.log(passwordArray.join(""));
            //update the passwrod input field in the form
            this.newPassword = passwordArray.join("");
        }
    }
}
