import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { FormAlunoComponent } from "./form-aluno/form-aluno.component";
import { FormMatriculaComponent } from "./form-matricula/form-matricula.component";
import { FormDisciplinaComponent } from "./form-disciplina/form-disciplina.component";
import { ServicoService } from "./servicos/servico.service";

import { RouterModule, Routes } from "@angular/router";
/* definição das rotas */

/* faz a inicialização do App */
import { AngularFireModule } from "@angular/fire";
/* módulo do Real Time Database */
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AlunoService } from './servicos/aluno.service';
import { DisciplinaService } from './servicos/disciplina.service';
import { MatriculaService } from './servicos/matricula.service';

const rotas: Routes = [
  /* será chamado o componente FormAluno quando a URL endereçar /aluno */
  { path: "aluno", component: FormAlunoComponent },
  /* será chamado o componente FormDisciplina quando a URL endereçar /disciplina */
  { path: "disciplina", component: FormDisciplinaComponent },
  /* será chamado o componente FormMatricula quando a URL endereçar /matricula */
  { path: "matricula", component: FormMatriculaComponent },
  /* será redirecionado para a URL /aluno quando a URL terminar na raiz / */
  { path: "", redirectTo: "/aluno", pathMatch: "full" },
  /* será redirecionado para a URL /matricula quando a URL for desconhecida, por exemplo, /teste */
  { path: "**", redirectTo: "/matricula" }
];

const firebaseConfig = {
  apiKey: "AIzaSyAQAY5IMRWLguQBEvheo_FJU3nPsB3GWTA",
  authDomain: "angular-lista10.firebaseapp.com",
  databaseURL: "https://angular-lista10.firebaseio.com",
  projectId: "angular-lista10",
  storageBucket: "angular-lista10.appspot.com",
  messagingSenderId: "625612107209",
  appId: "1:625612107209:web:aaef6492a1b5ae2b334c18"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    /* é necessário registrar as rotas usando RouterModule.forRoot()
    Ao usar forRoot o serviço Router estará disponível em toda a aplicação */
    RouterModule.forRoot(rotas),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    FormAlunoComponent,
    FormDisciplinaComponent,
    FormMatriculaComponent
  ],
  bootstrap: [AppComponent],
  providers: [ServicoService, AlunoService, DisciplinaService, MatriculaService]
})
export class AppModule {}
