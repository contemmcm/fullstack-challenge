import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ProfissionalTipo e2e test', () => {
  const profissionalTipoPageUrl = '/profissional-tipo';
  const profissionalTipoPageUrlPattern = new RegExp('/profissional-tipo(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/profissional-tipos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/profissional-tipos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/profissional-tipos/*').as('deleteEntityRequest');
  });

  it('should load ProfissionalTipos', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('profissional-tipo');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ProfissionalTipo').should('exist');
    cy.url().should('match', profissionalTipoPageUrlPattern);
  });

  it('should load details ProfissionalTipo page', function () {
    cy.visit(profissionalTipoPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('profissionalTipo');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profissionalTipoPageUrlPattern);
  });

  it('should load create ProfissionalTipo page', () => {
    cy.visit(profissionalTipoPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('ProfissionalTipo');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profissionalTipoPageUrlPattern);
  });

  it('should load edit ProfissionalTipo page', function () {
    cy.visit(profissionalTipoPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('ProfissionalTipo');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profissionalTipoPageUrlPattern);
  });

  it('should create an instance of ProfissionalTipo', () => {
    cy.visit(profissionalTipoPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('ProfissionalTipo');

    cy.get(`[data-cy="descricao"]`).type('enable Interface').should('have.value', 'enable Interface');

    cy.get(`[data-cy="situacao"]`).should('not.be.checked');
    cy.get(`[data-cy="situacao"]`).click().should('be.checked');

    cy.get(`[data-cy="updatedAt"]`).type('2021-11-15T12:05').should('have.value', '2021-11-15T12:05');

    cy.get(`[data-cy="createdAt"]`).type('2021-11-15T04:11').should('have.value', '2021-11-15T04:11');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profissionalTipoPageUrlPattern);
  });

  it('should delete last instance of ProfissionalTipo', function () {
    cy.intercept('GET', '/api/profissional-tipos/*').as('dialogDeleteRequest');
    cy.visit(profissionalTipoPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('profissionalTipo').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', profissionalTipoPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
