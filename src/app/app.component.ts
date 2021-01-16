import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PaloIT';

  formulario = this.fb.group({
    digito: '',
    num: ''
  });

  constructor(private fb: FormBuilder) { }

  validar() {
    let digito = this.formulario.value.digito;

    if (this.validarLongitud(digito)) {
      let arr = digito.toString().split('');
  
      //Quitar duplicados y contar recurrencia
      let noDups = this.quitarDuplicados(arr);
  
      //Actualizar el template con el número de mayor recurrencia
      this.formulario.patchValue({
        num: this.elegirMaximo(noDups)
      })
    }
  }

  validarLongitud(num){
    
    if ( num.length < 14 || num.length > 16 ) {
      alert( `El número debe tener entre 14 y 16 dígitos.\nEl número ingresado tiene ${num.length}`)
      return false;
    }
    return true;
  }

  quitarDuplicados(arr) {
    let counts = {};

    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log('Repeticiones: ', counts);
    return counts;
  }

  elegirMaximo(arr) {
    let baseNum = -1;
    let luckyNum;

    Object.keys(arr).forEach(e => {
      if (arr[e] > baseNum) {
        baseNum = arr[e];
        luckyNum = e;
      }
    });
    return luckyNum;
  }
}
