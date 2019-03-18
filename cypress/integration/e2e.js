describe("End to end test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Fetches and displays repositories by organization", () => {
    cy.get("[data-cy=organization-select]").click();
    cy.contains("microsoft").click();
    cy.contains("rss-reader-wp").should("have.length", 1);
  });

  it("Filters by language", () => {
    cy.contains("Objective-C").should("exist");
    cy.get("[data-cy=language-select]").click();
    cy.get("[data-cy=language-Java]").click();
    cy.contains("Objective-C").should("not.exist");
  });

  it("Sorts repositories by stars ", () => {
    cy.contains("Objective-C").should("exist");
    cy.get("[data-cy=stars]").should($stars => {
      let stars = $stars
        .map((i, el) => {
          return Cypress.$(el).text();
        })
        .get();
      const orderedStars = stars.sort((a, b) => b - a);
      expect(stars).to.equal(orderedStars);
    });
  });

  it("Navigates to repository", () => {
    cy.get("[data-cy=repository]")
      .first()
      .click()
      .then($repo => {
        const repoFullname = $repo.attr("data-cy-fullname")
        cy.url().should("include", repoFullname );
        cy.contains(repoFullname)
        cy.contains('master')
      });
  });
});
