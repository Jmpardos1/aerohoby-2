const API = 'http://localhost:8080/api';

const mockProductos = [
  { id: '1', nombre: 'Avion RC', descripcion: 'Vuelo recreativo', precio: 45000,
    stock: 10, stockMinimo: 2, imagen: '', marca: { id: '1', nombre: 'SkyMax' },
    proveedor: { id: '1', nombre: 'Proveedor A' }, categoria: [{ id: '1', nombre: 'Aviones' }] },
  { id: '2', nombre: 'Bateria LiPo', descripcion: 'Alta capacidad', precio: 12000,
    stock: 5, stockMinimo: 1, imagen: '', marca: { id: '2', nombre: 'PowerCell' },
    proveedor: { id: '1', nombre: 'Proveedor A' }, categoria: [{ id: '2', nombre: 'Baterias' }] },
];

function loginViaLocalStorage() {
  cy.window().then(win => {
    win.localStorage.setItem('token', 'fake-token');
    win.localStorage.setItem('uid', 'user-1');
    win.localStorage.setItem('rol', 'CLIENT');
    win.localStorage.setItem('nombre', 'Test User');
  });
}

describe('Login', () => {
  it('muestra el formulario con campos de correo y contraseña', () => {
    cy.visit('/login');
    cy.get('#correo').should('exist');
    cy.get('#password').should('exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('habilita el botón al completar el formulario', () => {
    cy.visit('/login');
    cy.get('#correo').type('usuario@test.com');
    cy.get('#password').type('12345678');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});

describe('Productos', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/productos`, mockProductos).as('getProductos');
    cy.intercept('GET', `${API}/marcas`, []).as('getMarcas');
    cy.intercept('GET', `${API}/categorias`, []).as('getCategorias');
    loginViaLocalStorage();
    cy.visit('/productos');
    cy.wait('@getProductos');
  });

  it('muestra las tarjetas de producto cargadas', () => {
    cy.get('.pl-card').should('have.length', 2);
    cy.get('.pl-card').first().should('contain', 'Avion RC');
  });

  it('clic en una tarjeta abre el panel de detalle', () => {
    cy.intercept('GET', `${API}/reviews/producto/1`, []).as('getReviews');
    cy.get('.pl-card').first().click();
    cy.get('.pd-panel').should('be.visible');
    cy.get('.pd-panel').should('contain', 'Avion RC');
  });

  it('el slider de precio filtra las tarjetas', () => {
    cy.get('#pl-precio-slider').invoke('val', 13000).trigger('input');
    cy.get('.pl-card').should('have.length', 2);
    cy.get('#pl-precio-slider').invoke('val', 10000).trigger('input');
    cy.get('.pl-card').should('have.length', 0);
  });
});

describe('Reseñas en detalle de producto', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/productos`, mockProductos).as('getProductos');
    cy.intercept('GET', `${API}/reviews/producto/1`, [
      { id: 'r1', puntuacion: 5, fecha: '2026-05-01', contenido: 'Excelente producto',
        usuarioId: 'user-1', productoId: '1',
        autor: { nombre: 'Test User', correo: 'test@test.com' } }
    ]).as('getReviews');
    loginViaLocalStorage();
    cy.visit('/productos');
    cy.wait('@getProductos');
  });

  it('muestra las reseñas del producto al abrirlo', () => {
    cy.get('.pl-card').first().click();
    cy.wait('@getReviews');
    cy.get('.pd-reviews').should('be.visible');
    cy.get('.pd-review-card').should('have.length', 1);
    cy.get('.pd-review-card').should('contain', 'Excelente producto');
  });
});
