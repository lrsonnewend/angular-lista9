import { Injectable } from "@angular/core";
import { Matricula } from "../dados";
import { AngularFireDatabase } from "@angular/fire/database";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MatriculaService {
  private matriculaSource = new BehaviorSubject({ matricula: null, key: "" });
  public currentMatricula = this.matriculaSource.asObservable();
  public matriculas: Matricula[] = [];
  constructor(private bd: AngularFireDatabase) {}

  insertMatricula(matricula: Matricula): void {
    this.bd
      .list("atv9/matricula")
      .push(matricula)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  updateMatricula(matricula: Matricula, key: string): void {
    this.bd
      .list("atv9/matricula")
      .update(key, matricula)
      .catch((error: any) => {
        console.error(error);
      });
  }

  deleteMatricula(key: string): void {
    this.bd.object(`atv9/matricula/${key}`).remove();
  }

  selectMatricula() {
    return this.bd
      .list("atv9/matricula", ref => ref.orderByChild("aluno/nome"))
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  changeMatricula(matricula: Matricula, key: string) {
    this.matriculaSource.next({ matricula: matricula, key: key });
  }
}