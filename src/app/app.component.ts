import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myApp';
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");

    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }

  }

  openModel() {

    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }

  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  
  onDelete(item: Student){
    const isDelet = confirm("Você quer deletar este item?");

    if(isDelet){
      const currentRecord = this.studentList.findIndex(m=>m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));

    }
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");

    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArray = [];

      newArray.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArray;
      localStorage.setItem('angular17crud', JSON.stringify(newArray));
    }
    this.closeModel();
  }

  updateStudent(){
    const currentRecord = this.studentList.find(m=>m.id === this.studentObj.id);

    if(currentRecord != undefined){
      currentRecord.nome = this.studentObj.nome;
      currentRecord.enderenco = this.studentObj.enderenco;
      currentRecord.numero = this.studentObj.numero;
    }

    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }

}

export class Student {
  id: number;
  nome: string;
  numero: string;
  email: string;
  cidade: string;
  estado: string;
  pincode: string;
  enderenco: string;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.numero = '';
    this.email = '';
    this.cidade = '';
    this.estado = '';
    this.pincode = '';
    this.enderenco = '';
  }

} 
