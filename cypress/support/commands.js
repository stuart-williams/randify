Cypress.Commands.add("dataCy", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add("signin", () => {
  cy.setCookie("next-auth.session-token", Cypress.env("SESSION_TOKEN"));
});

export default {};
