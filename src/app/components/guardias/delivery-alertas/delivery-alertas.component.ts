import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegistroVisitasService } from 'src/app/services/registro-visitas/registro-visitas.service';

@Component({
  selector: 'app-delivery-alertas',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delivery-alertas.component.html',
  styleUrls: ['./delivery-alertas.component.scss'],
})
export class DeliveryAlertasComponent implements OnInit, OnDestroy {

  visitas: any[] = [];
  visitasPaginadas: any[] = [];

  pageSize = 5;
  currentPage = 1;
  cargando = true;

  private socketSub: any;

  constructor(private visitasService: RegistroVisitasService) {}

  ngOnInit() {
    //  Cargar lista inicial
    this.cargarDeliveriesLargos();

    // Escuchar alertas en tiempo real
    this.socketSub = this.visitasService.onAlertaDelivery((data) => {
      console.log('⚠ ALERTA DELIVERY RECIBIDA', data);
      this.agregarAlerta(data);
    });
  }

  ngOnDestroy() {
    // Eliminar listener de socket
    if (this.socketSub) this.socketSub.unsubscribe?.();
  }

  cargarDeliveriesLargos() {
    this.cargando = true;

    this.visitasService.getDeliveriesLargos().subscribe({
      next: (data) => {
        this.visitas = data.filter(v => !v.alerta_leida); // mostrar solo no leídas
        this.actualizarPaginacion();
      },
      complete: () => this.cargando = false
    });
  }

  //  Insertar alerta nueva recibida por WebSocket
 agregarAlerta(alerta: any) {
  const index = this.visitas.findIndex(v => v.id === alerta.id);

  if (index !== -1) {
    //  actualizar alerta existente (por salida)
    this.visitas[index] = alerta;
  } else {
    //  alerta nueva (20 minutos)
    this.visitas.unshift(alerta);
  }

  this.currentPage = 1;
  this.actualizarPaginacion();
}


  // Guardias pueden marcar como leído
  marcarLeida(v: any) {
    this.visitasService.marcarLeida(v.id).subscribe(() => {
      this.visitas = this.visitas.filter(x => x.id !== v.id);
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.visitasPaginadas = this.visitas.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPaginacion();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginacion();
    }
  }

  get totalPages() {
    return Math.ceil(this.visitas.length / this.pageSize);
  }

 calcularMinutos(v: any) {
  const fecha = v.fecha_hora_ingreso || v.fechaHoraIngreso;
  if (!fecha) return 0;

  const inicio = new Date(fecha).getTime();

  // Si ya tiene salida → detener y calcular diferencia real
  if (v.fecha_hora_salida || v.fechaHoraSalida) {
    const salida = new Date(v.fecha_hora_salida || v.fechaHoraSalida).getTime();
    return Math.round((salida - inicio) / 1000 / 60);
  }

  // Si no tiene salida → tiempo actual
  const ahora = Date.now();
  return Math.round((ahora - inicio) / 1000 / 60);
}


  //  SONIDO de alerta
  // reproducirSonido() {
  //   const audio = new Audio('assets/alerta.mp3'); // agrega un sonido en assets
  //   audio.play().catch(() => {});
  // }
}
