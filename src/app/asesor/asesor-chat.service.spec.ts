import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AsesorChatService } from './asesor-chat.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}asesor/chat`;

describe('AsesorChatService', () => {
  let service: AsesorChatService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AsesorChatService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('widgetAbierto inicia en false', () => {
    expect(service.widgetAbierto()).toBeFalse();
  });

  it('abrirWidget pone widgetAbierto en true', () => {
    service.abrirWidget();
    expect(service.widgetAbierto()).toBeTrue();
  });

  it('cerrarWidget pone widgetAbierto en false', () => {
    service.abrirWidget();
    service.cerrarWidget();
    expect(service.widgetAbierto()).toBeFalse();
  });

  it('toggleWidget alterna el estado', () => {
    expect(service.widgetAbierto()).toBeFalse();
    service.toggleWidget();
    expect(service.widgetAbierto()).toBeTrue();
    service.toggleWidget();
    expect(service.widgetAbierto()).toBeFalse();
  });

  it('enviarMensaje hace POST con el mensaje', () => {
    const mockResp = { respuesta: 'Hola', modo: 'gemini', productos: [], articulos: [] };
    service.enviarMensaje('Quiero un drone').subscribe(r => {
      expect(r.respuesta).toBe('Hola');
    });
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ mensaje: 'Quiero un drone' });
    req.flush(mockResp);
  });
});
