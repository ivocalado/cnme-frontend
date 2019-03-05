import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { Permissions } from 'src/app/auth/auth.guard';

@Component({
    selector: "app-usuario-edit",
    templateUrl: "./usuario-edit.component.html",
    styleUrls: ["./usuario-edit.component.scss"]
})
export class UsuarioEditComponent implements OnInit {
    editmode = false;
    hidePassword = true;
    newPassword = "";
    editForm: FormGroup;
    usuario: Usuario = Usuario.EMPTY_MODEL
    usuarioLogado: Usuario = Usuario.EMPTY_MODEL
    tiposUsuarios: string[]

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private unidadeDataService: UnidadeDataService,
        private usuarioDataService: UsuarioDataService,
        private snackBarService: SnackBarService,
        private authService: AuthService,
        private permissions: Permissions
    ) { }

    ngOnInit() {

        this.route.params.subscribe((params:Params) =>{
            this.usuarioLogado = this.authService.getCurrentUser()
            const usuarioId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);    
            this.usuarioDataService.getUsuario(usuarioId, this.authService.getToken()).subscribe((usuario:Usuario) =>{
                this.usuario = usuario;
                this.usuarioDataService.getTiposUsuarios(this.authService.getToken()).subscribe((tipos: string[]) => {
                    this.tiposUsuarios = tipos
                    this.initForm();
                })
            })
        })
     }

    onCancel(){
        this.router.navigate(['/usuarios'], {relativeTo:this.route})
    }
    onSubmit(){
        if(this.editForm.value.password === null || this.editForm.value.password == "") {
            this.editForm.removeControl('password')
        } 

        let us : Usuario = <Usuario>this.editForm.value
        us.nome = us.name
        this.usuarioDataService.updateUsuario(this.usuario.id, us, this.authService.getToken())
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Usuário atualizado com sucesso");
                    this.router.navigate(["/usuarios/detalhes", this.usuario.id], { relativeTo: this.route });
                }, 
                error => {
                    console.log("Tratamento de erro")
                    console.log(error)
                }
        )
    }

    get isOwner() {
        return this.usuario.id == this.usuarioLogado.id
    }

    get isUsuarioPrivilegiado() {

        let usuarioPrivilegiado = false
        if(this.usuario.unidade.id == this.usuarioLogado.unidade.id) {//O usuario logado eh da mesma unidade que o usuario a ser editado?
            usuarioPrivilegiado = (this.usuarioLogado.tipo == "gestor");
        } else {
            usuarioPrivilegiado = this.permissions[this.usuarioLogado.unidade.classe].includes(this.usuario.unidade.classe)
        } 

        return usuarioPrivilegiado
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

    private initForm() {

        this.editForm = new FormGroup({
          name: new FormControl(this.usuario.name, Validators.required),
          email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
          password: new FormControl(this.usuario.password),
          cpf: new FormControl(this.usuario.cpf, Validators.required),
          tipo: new FormControl({value: this.usuario.tipo, disabled: this.isOwner}, Validators.required),
          funcao: new FormControl({value: this.usuario.funcao, disabled: this.isOwner}, Validators.required),
          telefone: new FormControl(this.usuario.telefone)
        });
      }
    
      titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
      }
}
