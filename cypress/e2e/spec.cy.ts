const API = 'http://localhost:8080/api';

const mockProductos = [
  { id: '1', nombre: 'Avion RC', descripcion: 'Vuelo recreativo', precio: 45000,
    stock: 10, stockMinimo: 2, imagen: '', marca: { id: '1', nombre: 'SkyMax' },
    proveedor: { id: '1', nombre: 'Proveedor A' }, categoria: [{ id: '1', nombre: 'Aviones' }] },
  { id: '2', nombre: 'Bateria LiPo', descripcion: 'Alta capacidad', precio: 12000,
    stock: 5, stockMinimo: 1, imagen: '', marca: { id: '2', nombre: 'PowerCell' },
    proveedor: { id: '1', nombre: 'Proveedor A' }, categoria: [{ id: '2', nombre: 'Baterias' }] },
];

const mockArticulos = [
  { id: 'a1', titulo: 'Guia de drones', descripcion: 'Todo sobre drones', contenido: 'Contenido completo',
    fechaPublicacion: '2026-01-10', autor: { id: 'u1', nombre: 'Experto', correo: 'e@test.com', telefono: '123', rol: 'EXPERT' }, productos: [] },
  { id: 'a2', titulo: 'Baterias LiPo', descripcion: 'Como elegir baterias', contenido: 'Contenido 2',
    fechaPublicacion: '2026-02-15', autor: { id: 'u2', nombre: 'Piloto Pro', correo: 'p@test.com', telefono: '456', rol: 'EXPERT' }, productos: [] },
];

function loginViaLocalStorage(rol = 'CLIENT') {
  cy.window().then(win => {
    win.localStorage.setItem('token', 'fake-token');
    win.localStorage.setItem('uid', 'user-1');
    win.localStorage.setItem('rol', rol);
    win.localStorage.setItem('nombre', 'Test User');
  });
}

// ─── LOGIN ────────────────────────────────────────────────────────────────
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

  it('redirige a /productos si ya hay sesión activa', () => {
    cy.window().then(win => win.localStorage.setItem('token', 'tok'));
    cy.visit('/login');
    cy.url().should('include', '/productos');
  });
});

// ─── PRODUCTOS ────────────────────────────────────────────────────────────
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

  it('el buscador filtra por nombre', () => {
    cy.get('.pl-search-input').type('Avion');
    cy.get('.pl-card').should('have.length', 1);
    cy.get('.pl-card').first().should('contain', 'Avion RC');
  });

  it('limpiar búsqueda restaura todos los productos', () => {
    cy.get('.pl-search-input').type('Bateria');
    cy.get('.pl-card').should('have.length', 1);
    cy.get('.pl-search-input').clear();
    cy.get('.pl-card').should('have.length', 2);
  });
});

// ─── RESEÑAS ─────────────────────────────────────────────────────────────
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
    cy.get('.pd-reviews').scrollIntoView().should('be.visible');
    cy.get('.pd-review-card').should('have.length', 1);
    cy.get('.pd-review-card').should('contain', 'Excelente producto');
  });
});

// ─── ARTÍCULOS ────────────────────────────────────────────────────────────
describe('Artículos (Blog)', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/articulos`, mockArticulos).as('getArticulos');
    cy.intercept('GET', `${API}/productos`, mockProductos).as('getProductos');
    loginViaLocalStorage();
    cy.visit('/articulos');
    cy.wait('@getArticulos');
  });

  it('muestra la lista de artículos', () => {
    cy.get('.al-card').should('have.length', 2);
    cy.get('.al-card').first().should('contain', 'Guia de drones');
  });

  it('buscar filtra los artículos por título', () => {
    cy.get('.al-search-input').type('Bateria');
    cy.get('.al-card').should('have.length', 1);
    cy.get('.al-card').first().should('contain', 'Baterias LiPo');
  });

  it('click en tarjeta carga el detalle del artículo', () => {
    cy.intercept('GET', `${API}/articulos/a1/detail`, { ...mockArticulos[0], productos: [] }).as('getDetail');
    cy.get('.al-card').first().click();
    cy.wait('@getDetail');
    cy.get('.ad-panel').should('be.visible');
    cy.get('.ad-title').should('contain', 'Guia de drones');
  });

  it('el botón Nuevo artículo NO aparece para usuarios CLIENT', () => {
    cy.get('.al-new-btn').should('not.exist');
  });
});

describe('Artículos — rol EXPERT', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/articulos`, mockArticulos).as('getArticulos');
    cy.intercept('GET', `${API}/productos`, mockProductos).as('getProductos');
    loginViaLocalStorage('EXPERT');
    cy.visit('/articulos');
    cy.wait('@getArticulos');
  });

  it('el botón Nuevo artículo SÍ aparece para EXPERT', () => {
    cy.get('.al-new-btn').should('be.visible');
  });

  it('abrir el formulario de nuevo artículo muestra los campos', () => {
    cy.get('.al-new-btn').click();
    cy.get('#na-titulo').should('be.visible');
    cy.get('#na-desc').should('be.visible');
    cy.get('#na-contenido').should('be.visible');
    cy.get('#na-fecha').should('be.visible');
  });

  it('el botón Publicar está deshabilitado con formulario vacío', () => {
    cy.get('.al-new-btn').click();
    cy.get('.na-btn-submit').should('be.disabled');
  });
});

// ─── CARRITO ──────────────────────────────────────────────────────────────
describe('Carrito', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/productos`, mockProductos).as('getProductos');
    loginViaLocalStorage();
    cy.visit('/carrito');
  });

  it('muestra el carrito vacío por defecto', () => {
    cy.contains('vacío').should('be.visible');
  });
});

// ─── LANDING ──────────────────────────────────────────────────────────────
describe('Landing page', () => {
  it('muestra el hero con el CTA principal', () => {
    cy.visit('/');
    cy.get('.lp-hero').should('be.visible');
  });

  it('el link de Productos navega a /productos', () => {
    cy.visit('/');
    cy.get('a[href="/productos"]').first().click();
    cy.url().should('include', '/productos');
  });
});
