import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../servicos/disciplina.service';
import { Disciplina } from '../dados';
@Component({
  selector: 'app-form-disciplina',
  templateUrl: './form-disciplina.component.html',
  styleUrls: ['./form-disciplina.component.css']
})
export class FormDisciplinaComponent implements OnInit {
  private disciplina: Disciplina;
  constructor(private servico: DisciplinaService) { }
  ngOnInit() {
    this.disciplina = new Disciplina(); /* cria um novo aluno */
  }
  salvar() {
    this.servico.addDisciplina(this.disciplina);
    this.disciplina = new Disciplina(); /* cria um novo aluno */
  }
  excluir(disciplina: Disciplina) {
    this.servico.removeDisciplina(disciplina);
    return false; /* para evitar o popup menu */
  }
}