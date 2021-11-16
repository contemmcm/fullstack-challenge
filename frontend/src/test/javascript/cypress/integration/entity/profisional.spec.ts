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

describe('Profisional e2e test', () => {
  const profisionalPageUrl = '/profisional';
  const profisionalPageUrlPattern = new RegExp('/profisional(\\?.*)?$');
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
    cy.intercept('GET', '/api/profisionals+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/profisionals').as('postEntityRequest');
    cy.intercept('DELETE', '/api/profisionals/*').as('deleteEntityRequest');
  });

  it('should load Profisionals', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('profisional');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Profisional').should('exist');
    cy.url().should('match', profisionalPageUrlPattern);
  });

  it('should load details Profisional page', function () {
    cy.visit(profisionalPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('profisional');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profisionalPageUrlPattern);
  });

  it('should load create Profisional page', () => {
    cy.visit(profisionalPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Profisional');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profisionalPageUrlPattern);
  });

  it('should load edit Profisional page', function () {
    cy.visit(profisionalPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Profisional');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profisionalPageUrlPattern);
  });

  it.skip('should create an instance of Profisional', () => {
    cy.visit(profisionalPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Profisional');

    cy.get(`[data-cy="nome"]`).type('Madeira').should('have.value', 'Madeira');

    cy.get(`[data-cy="telefone"]`).type('(51) 551832823').should('have.value', '(51) 551832823');

    cy.get(`[data-cy="email"]`).type('zbsh@e9md.3fql.id.ex.bx2sr.cm').should('have.value', 'zbsh@e9md.3fql.id.ex.bx2sr.cm');

    cy.get(`[data-cy="situacao"]`).should('not.be.checked');
    cy.get(`[data-cy="situacao"]`).click().should('be.checked');

    cy.get(`[data-cy="updatedAt"]`).type('2021-11-15T10:40').should('have.value', '2021-11-15T10:40');

    cy.get(`[data-cy="createdAt"]`).type('2021-11-15T09:44').should('have.value', '2021-11-15T09:44');

    cy.setFieldSelectToLastOfEntity('profissionalTipo');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', profisionalPageUrlPattern);
  });

  it.skip('should delete last instance of Profisional', function () {
    cy.intercept('GET', '/api/profisionals/*').as('dialogDeleteRequest');
    cy.visit(profisionalPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('profisional').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', profisionalPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
