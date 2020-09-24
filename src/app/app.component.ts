import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ServicioItemsService } from 'src/services/servicio-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: any = [];
  totalRecords: any;

  constructor(
    private itemsService: ServicioItemsService) { }
  
  ngOnInit() {
    this.itemsIniciales();
  }

  itemsIniciales() {
    this.itemsService.getServicioItem().toPromise()
    .then((res: any) => {
      console.log(res.result.items);
      this.items = res.result.items;
      this.totalRecords=this.items.length;

    }).catch(err => {
      console.log("Error de servicio");
    });
  }

  agregarItem() {
    let title = (document.getElementById('new-title') as HTMLInputElement).value;
    let about = (document.getElementById('new-about') as HTMLInputElement).value;
    let acces = (document.getElementById('new-acces') as HTMLInputElement).value;

    let itemAdd = {
      "_about": about,
      "accessURL": acces,
      "format": "http://publications.europa.eu/resource/authority/file-type/JSON",
      "title": [
        title
      ],
      "type": "http://www.w3.org/ns/dcat#Distribution"
    }

    this.items =  [ ...this.items, itemAdd ];
    this.totalRecords=this.items.length;

    (document.getElementById('new-title') as HTMLInputElement).value = "";
    (document.getElementById('new-about') as HTMLInputElement).value = "";
    (document.getElementById('new-acces') as HTMLInputElement).value = "";
  }

  eliminar(item: any) {
    this.items = this.items.filter(function(element){
      return element.accessURL != item.accessURL;
    });
    this.totalRecords=this.items.length;
  }

  editar(index: any) {
    let titleed = document.getElementById('title_' + index) as HTMLInputElement;
    let abouted = document.getElementById('about_' + index) as HTMLInputElement;
    let accessed = document.getElementById('accessURL_' + index) as HTMLInputElement;

    if((document.getElementById('editarBoton_' + index) as HTMLElement).innerHTML == 'Editar') {
      titleed.disabled = false;
      abouted.disabled = false;
      accessed.disabled = false;
      (document.getElementById('editarBoton_' + index) as HTMLElement).innerHTML = 'Aceptar';
    } else {  
      this.items[index]._about = abouted.value;
      this.items[index].title = titleed.value;
      this.items[index].accessURL = accessed.value;
      titleed.disabled = true;
      abouted.disabled = true;
      accessed.disabled = true;
      (document.getElementById('editarBoton_' + index) as HTMLElement).innerHTML = 'Editar';
      console.log(this.items);
    }
  }
}
