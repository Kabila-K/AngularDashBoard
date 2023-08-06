import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,doc,
     updateDoc,deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  userData!: Observable<any>;

 constructor(private firestore: Firestore){
  this.getData();
 }
  addData(f: any){
   const collectionInstance= collection(this.firestore, 'categories');

   addDoc(collectionInstance, f.value).then(()=>{
    console.log('Data saved successfully');
   })
   .catch((err)=>{
    console.log(err);
   })
  }

  // read query
  getData(){
    const collectionInstance= collection(this.firestore, 'categories');
    collectionData(collectionInstance,{idField: 'id'} ).subscribe(val =>{
      console.log(val);
    })

    this.userData = collectionData(collectionInstance, {idField: 'id'});
  }

  // upadate query
  updateData(id: string){
    const docInstance = doc(this.firestore,'users',id);
    const updateData ={
      name: 'updatedName'
    }

    updateDoc(docInstance, updateData)
    .then(()=> {
      console.log('data upadated');
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  // delete query
  deleteData(id: string){
    const docInstance = doc(this.firestore,'users',id);
    deleteDoc(docInstance)
    .then(() =>{
      console.log('Data Deleted')
    })
  }

}
