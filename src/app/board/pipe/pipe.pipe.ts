import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeValueFormat'
})
export class PipePipe implements PipeTransform {
  
  transform(value: string): string {
    let valueFormated = '';
    switch (value){
      case 'RO':
      case 'RO ':
      case 'SFR':
        valueFormated = 'ROMO';
        break;
      case 'TOC':
      case 'TOC ':
      case 'TO ':
          valueFormated = 'TORREON';
        break;
      case 'IR':
      case 'IR ':
      case 'IRA':
      case 'IRS':
      case 'IRP':
      case 'IRN':
      case 'IRL':
          valueFormated = 'IRAPUATO';
        break;
      case 'MX':
      case 'MX ':
          valueFormated = 'MEXICO';
        break;
      case 'CH ':
          valueFormated = 'CHIHUAHUA';
        break;
      case 'TPS':
      case 'TP ':
          valueFormated = 'TEPIC';
        break;
      case 'NG ':
          valueFormated = 'NOGALES';
        break;
      case 'MZ ':
          valueFormated = 'MANZANILLO';
        break;
      case 'GD ':
          valueFormated = 'GUADALAJARA';
        break;
      case 'TON':
          valueFormated = 'TORREON';
        break;
      case 'EM ':
          valueFormated = 'EMPALME';
        break;
      case 'JZ ':
          valueFormated = 'JUAREZ';
        break;
      case 'EM ':
          valueFormated = 'EMPALME';
        break;
      case 'GDS':
          valueFormated = 'GUADALAJARA';
        break;
      case 'MA ':
          valueFormated = 'MAZATLAN';
        break;
      case 'PN ':
      case 'PN':
          valueFormated = 'PIEDRAS NEGRAS';
        break;
      case 'FR ':
      case 'FR':
      case 'FRW':
      case 'FRW ':
          valueFormated = 'FRONTERA';
        break;
      case 'SA ':
      case 'SA':
          valueFormated = 'SABLINAS';
        break;
      default: 
        valueFormated = '';
        break;
    }
      return valueFormated;
  }

}
