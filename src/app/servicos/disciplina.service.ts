import { Injectable } from "@angular/core";
import { Disciplina } from "../dados";
import { AngularFireDatabase } from "@angular/fire/database";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DisciplinaService {
  private disciplinaSource = new BehaviorSubject({ disciplina: null, key: "" });
  public currentDisciplina = this.disciplinaSource.asObservable();
  public disciplinas: Disciplina[] = [];
  constructor(private bd: AngularFireDatabase) {}
  
  insertDisciplina(disciplina: Disciplina): void {
    this.bd
      .list("atv9/disciplina")
      .push(disciplina)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  
  updateDisciplina(disciplina: Disciplina, key: string): void {
    this.bd
      .list("atv9/disciplina")
      .update(key, disciplina)
      .catch((error: any) => {
        console.error(error);
      });
  }
  
  deleteDisciplina(key: string): void {
    this.bd.object(`atv9/disciplina/${key}`).remove();
  }
  
  selectDisciplina() {
    return this.bd
      .list("atv9/disciplina", ref => ref.orderByChild("nome"))
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  
  changeDisciplina(disciplina: Disciplina, key: string) {
    this.disciplinaSource.next({ disciplina: disciplina, key: key });
  }
  
}