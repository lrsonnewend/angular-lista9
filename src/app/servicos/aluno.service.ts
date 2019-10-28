import { Injectable } from "@angular/core";
import { Aluno } from "../dados";
import { AngularFireDatabase } from "@angular/fire/database";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AlunoService {
  private alunoSource = new BehaviorSubject({ aluno: null, key: "" });
  public currentAluno = this.alunoSource.asObservable();
  public alunos: Aluno[] = [];

  constructor(private bd: AngularFireDatabase) {}
  
  insertAluno(aluno: Aluno): void {
    this.bd
      .list("atv9/aluno")
      .push(aluno)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  
  updateAluno(aluno: Aluno, key: string): void {
    this.bd
      .list("atv9/aluno")
      .update(key, aluno)
      .catch((error: any) => {
        console.error(error);
      });
  }
  
  deleteAluno(key: string): void {
    this.bd.object(`atv9/aluno/${key}`).remove();
  }
  
  selectAluno() {
    return this.bd
      .list("atv9/aluno", ref => ref.orderByChild("nome"))
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  
  changeAluno(aluno: Aluno, key: string) {
    this.alunoSource.next({ aluno: aluno, key: key });
  }
}
