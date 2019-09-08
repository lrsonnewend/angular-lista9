import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servicos/servico.service';
import { Matricula } from '../dados';

@Component({
  selector: 'app-form-matricula',
  templateUrl: './form-matricula.component.html',
  styleUrls: ['./form-matricula.component.css']
})
export class FormMatriculaComponent implements OnInit {

  constructor(private servico: ServicoService) { }
  private matricula: Matricula;
  ngOnInit() {
    this.matricula = new Matricula(); /* cria um novo aluno */
  }
  salvar() {
    this.servico.addMatricula(this.matricula);
    this.matricula = new Matricula(); /* cria um novo aluno */
  }
  excluir(matricula: Matricula) {
    this.servico.removeMatricula(matricula);
    return false; /* para evitar o popup menu */
  }

}