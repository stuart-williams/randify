describe("Color Mode", () => {
  it("should switch color mode", () => {
    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.get("body").should("have.class", "chakra-ui-dark");

    cy.dataCy("color-mode").click();

    cy.get("body").should("have.class", "chakra-ui-light");

    cy.dataCy("color-mode").click();

    cy.get("body").should("have.class", "chakra-ui-dark");
  });
});

export default {};
