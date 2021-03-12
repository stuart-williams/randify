describe("Color Mode", () => {
  it("should switch color mode", () => {
    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.get("body").should("have.class", "chakra-ui-light");

    cy.dataCy("account-menu-btn").click();
    cy.dataCy("color-mode-btn").click();

    cy.get("body").should("have.class", "chakra-ui-dark");

    cy.dataCy("account-menu-btn").click();
    cy.dataCy("color-mode-btn").click();

    cy.get("body").should("have.class", "chakra-ui-light");
  });
});

export default {};
