const fs = require('fs');
const {exportCertificate} = require('./helpers/certificados')


console.clear();
// exportCertificate(
//   '012345678901234567890123456789012345678901234567890123456789012345678901234567890',
//   '012345678901234567890123456789012345678901234567890123456789012345678901234567890',
//   '012345678901234','(2 horas)','06 de enero de 2024');

let linea=0;
let titulo1,titulo2,hora,fecha;
let nombres = [];
try {
    const data = fs.readFileSync('certificados.txt','utf-8');
    data.split(/\r?\n/).forEach(line =>  {
      switch(linea++){
        case 0: titulo1 = line; break;
        case 1: titulo2 = line; break;
        case 2: hora = line; break;
        case 3: fecha = line; break;
        default: 
          nombres.push(line);
      }      
    });
    console.log(`Titulo 1: ${titulo1}`);
    console.log(`Titulo 2: ${titulo2}`);
    console.log(`Hora: ${hora}`);
    console.log(`Fecha: ${fecha}`);
    nombres.forEach(nombre => {
      console.log(nombre);
      exportCertificate(titulo1,titulo2,nombre,hora,fecha);
    });
    
} catch (err) {
    console.error(err);
}
