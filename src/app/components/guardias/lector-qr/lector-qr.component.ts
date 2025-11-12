import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { QrValidacionService } from 'src/app/services/qr-validacion/qr-validacion.service';
import { SharedQrService } from 'src/app/services/shared-qr.service';

@Component({
  selector: 'app-lector-qr',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.scss'],
})
export class LectorQrComponent implements OnDestroy {
  private codeReader = new BrowserMultiFormatReader();
  private controls: IScannerControls | null = null;

  mensaje = 'Presione el botón para iniciar el escáner.';
  resultado = '';
  escaneando = false;
  camaraActiva = false;
  nombreVisita: string = '';
motivoVisita: string = '';


  constructor(
    private qrService: QrValidacionService,
    private sharedQr: SharedQrService
  ) {}

  /** 🔹 Inicia la cámara al presionar el botón */
  async iniciarCamara() {
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (devices.length === 0) {
        this.mensaje = 'No se detectaron cámaras en el dispositivo.';
        return;
      }

      this.camaraActiva = true;
      this.escaneando = true;
      this.mensaje = 'Apunte la cámara hacia el código QR...';

      this.controls = await this.codeReader.decodeFromVideoDevice(
        devices[0].deviceId,
        'video',
        (result, error, controls) => {
          if (result) {
            this.escaneando = false;
            this.resultado = result.getText();
            this.mensaje = `QR detectado: ${this.resultado}`;
            this.validarQR(this.resultado);

            // Detiene automáticamente tras leer un código válido
            this.detenerCamara();
          }
        }
      );
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      this.mensaje = 'Error al acceder a la cámara.';
    }
  }

  /**Valida el QR escaneado en el backend */
validarQR(codigo: string) {
  this.mensaje = 'Validando código QR...';
  this.qrService.validarQR(codigo).subscribe({
    next: (res) => {
      this.sharedQr.setQrData(res);
      this.mensaje = 'Código válido. Datos listos para el registro de ingreso.';
      this.resultado = res.codigo_qr;
      this.nombreVisita = res.nombre_visita;
      this.motivoVisita = res.motivo;
    },
    error: (err) => {
      console.error('Error al validar QR:', err);
      this.mensaje = ' Código inválido o no registrado.';
      this.nombreVisita = '';
      this.motivoVisita = '';
    },
  });
}


  /**  Detiene manualmente la cámara */
  detenerCamara() {
    if (this.controls) {
      this.controls.stop();
      this.controls = null;
      this.camaraActiva = false;
      this.escaneando = false;
      this.mensaje = '📷 Cámara detenida.';
    }
  }

  /** Permite reactivar la cámara manualmente */
  reintentar() {
    this.resultado = '';
    this.mensaje = 'Apunte la cámara hacia el nuevo código QR';
    this.iniciarCamara();
  }

  ngOnDestroy() {
    this.detenerCamara();
  }
}
