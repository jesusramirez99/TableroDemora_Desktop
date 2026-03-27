import { AfterViewInit, Component, inject } from '@angular/core';
import { RequestHttpService } from 'src/app/service/request-http.service';
import { OnInit } from '@angular/core';
import { DataTable } from 'src/app/interface/dataTable.interface';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  private _serviceHttp = inject(RequestHttpService);
  dataSource = new MatTableDataSource<DataTable>();
  public dataTable: DataTable[] = [];
  public lastDate: Date = new Date();
  public minDate: Date = new Date(0); 
  minRegistrosParaPaginar = 16;
  autoPageIntervalMs = 60000; //Tiempo para cambiar de pagina
  private refreshTimer: any;

  ngOnInit(){
    this.cargarDatos();
    this.iniciarAutoRefresh();
  }

  private iniciarAutoRefresh(){
    if(this.refreshTimer)clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(() => {
        this.cargarDatos();
    }, 3*60000);
  }

  private cargarDatos() {
    this._serviceHttp.getTableData().subscribe({
      next: (resp) => {
        const fecha = new Date(resp.fecha_Actual);
        this.lastDate = !isNaN(fecha.getTime()) &&  fecha.getFullYear() > 1900? fecha : this.minDate;   
        const datos = this.normalizarDatos(resp.data);
        console.log('cantidad de registros: '+datos.length);
        this.dataTable = datos;
        this.dataSource.data = datos;
      },
      error: (message) => {
        Swal.fire({
          icon: "error",
          title: 'Lo sentimos, ha ocurrido un problema con el servidor',
          text: `${message}`,
        })
      }
    });
  }

  private normalizarDatos(data: DataTable[]): DataTable[] {
    return data.map(d => {
      const inicio = d.fecha_llamado? new Date(d.fecha_llamado).getTime() : null;
      const fin = d.fh_lectura? new Date(d.fh_lectura).getTime() : null;
      const diferencia_horas = inicio && fin? Number(((fin - inicio) / 36e5).toFixed(2)) : null;
      return {
        ...d,
        diferencia_horas
      };
    });
  }

  ngOnDestroy() {
    if(this.refreshTimer)clearInterval(this.refreshTimer);
  }

  displayedColumns: string[] = ['initialStation', 'train', 'dateCall', 'exitTrain', 'Delay', 'District', 'TrainDirection', 'travelTime', 'lastLocation', 'Detention'];
}
