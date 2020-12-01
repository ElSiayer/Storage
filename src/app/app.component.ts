import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  datos= new FormGroup({
    Usuario: new FormControl(''),
    Nombre: new FormControl(''),
    Ciudad: new FormControl(''),
    Numero: new FormControl('')
  }) 
  title = 'CapacitorSqlite';
  mostrar=[];
  async setObject() {
    const { keys } = await Storage.keys();  
    const {Usuario,Nombre,Ciudad,Numero}=this.datos.value
    if(!keys.includes(Usuario)){
      await Storage.set({
        key: Usuario,
        value: JSON.stringify({
          nombre: Nombre,
          ciudad: Ciudad,
          numero: Numero,
        })
      });
    }    
    this.getObject();
  }
  async getObject() {
    this.mostrar=[];    
    const { keys } = await Storage.keys();    
    keys.forEach(async (element)=>{
      const ret = await Storage.get({ key:element});
      this.mostrar.push([element,JSON.parse(ret.value)]);          
    });     
  }
  async clear() {
    await Storage.clear();
    this.getObject();
  }
}