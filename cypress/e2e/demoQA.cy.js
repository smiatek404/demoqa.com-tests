const { formSelectors } = require("../fixtures/selectors.cy");

describe("tests", () => {
  beforeEach(() => {
    cy.viewport(2560, 1440);
    cy.on("uncaught:exception", (e, runnable) => {
      console.log("error", e);
      console.log("runnable", runnable);
      console.log("error", e.message);
      return false;
    });
    cy.visit("/automation-practice-form");
  });
  it("Valid Student Registration With Complete Data", () => {
    cy.get(formSelectors.name).click().type("John");
    cy.get(formSelectors.lastName).click().type("Smith");
    cy.get(formSelectors.email).click().type("test@gmail.com");
    cy.get(formSelectors.gender1Male).click();
    cy.get(formSelectors.mobile).click().type("0123456789");
    cy.get(formSelectors.dateOfBirth).click();
    cy.get(formSelectors.monthDropdown).select("January");
    cy.get(formSelectors.yearDropdown).select("1990");
    cy.get(formSelectors.dayOfTheMonth).click();
    cy.get(formSelectors.background).click();
    cy.get(formSelectors.subjects)
      .click()
      .type("Math" + "{enter}");
    cy.get(formSelectors.hobby1).click();
    cy.get(formSelectors.chooseFileButton).click().selectFile("test.jpg");
    cy.get(formSelectors.currentAddress).type(
      "Azalia str 23, 77222 Massachusetts"
    );
    cy.get(formSelectors.state)
      .click()
      .type("Uttar Pradesh" + "{enter}");
    cy.get(formSelectors.city)
      .click()
      .type("Lucknow" + "{enter}");
    cy.get(formSelectors.submit).click();
    cy.get(formSelectors.submitMessage);
    cy.get(formSelectors.table).within(() => {
      cy.get("td").eq(1).contains("John Smith");
      cy.get("td").eq(3).contains("test@gmail.com");
      cy.get("td").eq(5).contains("Male");
      cy.get("td").eq(7).contains("0123456789");
      cy.get("td").eq(9).contains("01 January,1990");
      cy.get("td").eq(11).contains("Maths");
      cy.get("td").eq(13).contains("Sports");
      cy.get("td").eq(15).contains("test.jpg");
      cy.get("td").eq(17).contains("Azalia str 23, 77222 Massachusetts");
      cy.get("td").eq(19).contains("Uttar Pradesh Lucknow");
    });
  });
  it("Valid Student Registration With Required Data", () => {
    cy.get(formSelectors.name).click().type("Jane");
    cy.get(formSelectors.lastName).click().type("Smith");
    cy.get(formSelectors.mobile).click().type("9876543210");
    cy.get(formSelectors.gender2Female).click();
    cy.get(formSelectors.submit).click();
    cy.get(formSelectors.submitMessage);
    cy.get(formSelectors.table).within(() => {
      cy.get("td").eq(1).contains("Jane Smith");
      cy.get("td").eq(7).contains("9876543210");
      cy.get("td").eq(5).contains("Female");
    });
  });
  it("Lack of First Name", () => {
    cy.get(formSelectors.lastName).click().type("Smith");
    cy.get(formSelectors.mobile).click().type("0500500500");
    cy.get(formSelectors.gender2Female).click();
    cy.get(formSelectors.submit).click();
    cy.get(formSelectors.name)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  it("Lack of Last Name", () => {
    cy.get(formSelectors.name).click().type("Jane");
    cy.get(formSelectors.mobile).click().type("0500500500");
    cy.get(formSelectors.gender2Female).click();
    cy.get(formSelectors.submit).click();
    cy.get(formSelectors.lastName)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});
