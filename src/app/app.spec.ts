import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have the correct title property', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    expect(app.title()).toEqual('ISIS2603_202610_S2_E4_Aerohobby_Front');
  });

  it('toggleSidebar abre el sidebar y cierra el perfil', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.profileOpen = true;
    app.toggleSidebar(new MouseEvent('click'));
    expect(app.sidebarOpen).toBeTrue();
    expect(app.profileOpen).toBeFalse();
  });

  it('toggleSidebar cierra el sidebar si ya estaba abierto', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.sidebarOpen = true;
    app.toggleSidebar(new MouseEvent('click'));
    expect(app.sidebarOpen).toBeFalse();
  });

  it('toggleProfile abre el dropdown y cierra el sidebar', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.sidebarOpen = true;
    app.toggleProfile(new MouseEvent('click'));
    expect(app.profileOpen).toBeTrue();
    expect(app.sidebarOpen).toBeFalse();
  });

  it('closeAll cierra sidebar y perfil', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.sidebarOpen = true;
    app.profileOpen = true;
    app.closeAll();
    expect(app.sidebarOpen).toBeFalse();
    expect(app.profileOpen).toBeFalse();
  });
});
