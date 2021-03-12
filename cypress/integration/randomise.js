describe("Randomise", () => {
  it("should randomise a playlist as expected", () => {
    cy.intercept(`/api/randomise/${Cypress.env("PLAYLIST_ID")}`).as(
      "getRandomise"
    );

    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.dataCy(Cypress.env("PLAYLIST_ID")).within(() => {
      cy.dataCy("randomise-btn").click();
    });

    cy.dataCy("randomising-modal").should("have.attr", "data-status", "info");

    cy.wait("@getRandomise").then(({ response }) => {
      expect(response.statusCode).to.eq(204);
    });

    cy.dataCy("randomising-modal").should(
      "have.attr",
      "data-status",
      "success"
    );

    cy.dataCy("dismiss-randomising-modal-btn").click();

    cy.dataCy("randomising-modal").should("not.exist");
  });

  it("should should handle network errors", () => {
    cy.intercept(`/api/randomise/${Cypress.env("PLAYLIST_ID")}`, {
      forceNetworkError: true,
    }).as("getRandomise");

    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.dataCy(Cypress.env("PLAYLIST_ID")).within(() => {
      cy.dataCy("randomise-btn").click();
    });

    cy.wait("@getRandomise");

    cy.dataCy("randomising-modal").should("have.attr", "data-status", "error");

    cy.dataCy("dismiss-randomising-modal-btn").click();

    cy.dataCy("randomising-modal").should("not.exist");
  });
});

export default {};
