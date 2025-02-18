describe("Auth", () => {
  it("should signin", () => {
    cy.visit(Cypress.env("HOST"));

    cy.location("pathname").should("eq", "/");

    cy.dataCy("signin-btn").click();

    cy.location("host").should("eq", "accounts.spotify.com");
    cy.location("pathname").should("include", "/login");
  });

  it("should redirect to /playlists on signin", () => {
    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.location("pathname").should("eq", "/playlists");
  });

  it("should redirect away from /playlists when unauthorised", () => {
    cy.visit(Cypress.env("HOST") + "/playlists");

    cy.location("pathname").should("eq", "/");
  });

  it("should signout", () => {
    cy.signin();

    cy.visit(Cypress.env("HOST"));

    cy.dataCy("settings-menu-btn").click();
    cy.dataCy("signout-btn").click();

    cy.location("pathname").should("eq", "/");
  });
});

export default {};
