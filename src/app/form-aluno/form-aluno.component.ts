import { Component, OnInit } from "@angular/core";
import { AlunoService } from "../servicos/aluno.service";
import { Aluno } from "../dados";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-form-aluno",
  templateUrl: "./form-aluno.component.html",
  styleUrls: ["./form-aluno.component.css"]
})
export class FormAlunoComponent implements OnInit {
  private aluno: Aluno;

  private key: string = "";

  private alunos: Observable<any>;

  constructor(private servico: AlunoService) {}

  ngOnInit() {
    this.aluno = new Aluno();
    this.alunos = this.servico.selectAluno();
    this.servico.currentAluno.subscribe(data => {
      if (data.aluno && data.key) {
        this.aluno = new Aluno();
        this.aluno.nome = data.aluno.nome;
        this.aluno.sexo = data.aluno.sexo;
        this.key = data.key;
      }
    });
  }
  salvar(): void {
    if (this.key) {
      this.aluno.nome = this.aluno.nome.trim();
      this.servico.updateAluno(this.aluno, this.key);
    } else {
      this.aluno.nome = this.aluno.nome.trim();
      this.servico.insertAluno(this.aluno);
    }
    this.reset();
  }
  reset(): void {
    this.aluno = new Aluno();
    this.key = "";
  }
  delete(key: string) {
    this.servico.deleteAluno(key);
    return false; /* para evitar que o menu popup seja exibido */
  }
  edit(aluno: Aluno, key: string) {
    this.servico.changeAluno(aluno, key);
  }
}