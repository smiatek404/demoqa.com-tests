const { automationPracticeFormSelectors } = require("../fixtures/selectors.cy");

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

  it("Valid Student Registration With Complete Data - TC_01", () => {
    cy.get(automationPracticeFormSelectors.name).click().type("John");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.email)
      .click()
      .type("test@gmail.com");
    cy.get(automationPracticeFormSelectors.gender1Male).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("0123456789");
    cy.get(automationPracticeFormSelectors.dateOfBirth).click();
    cy.get(automationPracticeFormSelectors.monthDropdown).select("January");
    cy.get(automationPracticeFormSelectors.yearDropdown).select("1990");
    cy.get(automationPracticeFormSelectors.dayOfTheMonth).click();
    cy.get(automationPracticeFormSelectors.background).click();
    cy.get(automationPracticeFormSelectors.subjects)
      .click()
      .type("Maths" + "{enter}");
    cy.get(automationPracticeFormSelectors.hobby1).click();
    cy.get(automationPracticeFormSelectors.chooseFileButton)
      .click()
      .selectFile("test.jpg");
    cy.get(automationPracticeFormSelectors.currentAddress).type(
      "Azalia str 23, 77222 Massachusetts"
    );
    cy.get(automationPracticeFormSelectors.state)
      .click()
      .type("Uttar Pradesh" + "{enter}");
    cy.get(automationPracticeFormSelectors.city)
      .click()
      .type("Lucknow" + "{enter}");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage);
    cy.get(automationPracticeFormSelectors.table).within(() => {
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
    cy.get(automationPracticeFormSelectors.closeTable).click();
  });

  it("Valid Student Registration With Required Valid Data - TC_02", () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("9876543210");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage);
    cy.get(automationPracticeFormSelectors.table).within(() => {
      cy.get("td").eq(1).contains("Jane Smith");
      cy.get("td").eq(7).contains("9876543210");
      cy.get("td").eq(5).contains("Female");
    });
    cy.get(automationPracticeFormSelectors.closeTable).click();
  });

  it("Lack of First Name - TC_EX_01", () => {
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("0500500500");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.name)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get(automationPracticeFormSelectors.name).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Lack of Last Name - TC_EX_02", () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("0500500500");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.lastName)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get(automationPracticeFormSelectors.lastName).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Lack of Gender - TC_EX_03", () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.mobile).click().type("9876543210");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.inputGender)
      .find(".custom-control-input:invalid")
      .should("have.length", 3);
    cy.get(automationPracticeFormSelectors.gender1Male).should(
      "have.css",
      "color",
      "rgb(220, 53, 69)"
    );
    cy.get(automationPracticeFormSelectors.gender2Female).should(
      "have.css",
      "color",
      "rgb(220, 53, 69)"
    );
    cy.get(automationPracticeFormSelectors.gender3Other).should(
      "have.css",
      "color",
      "rgb(220, 53, 69)"
    );
  });

  it('Lack of data in "Mobile" field - TC_EX_04', () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.mobile)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get(automationPracticeFormSelectors.mobile).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it('Alphabet characters in "Mobile" field - TC_EX_05', () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("ABCDEFGHIJ");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.mobile)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get(automationPracticeFormSelectors.mobile).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it('Less than required number of digits in "Mobile" field - TC_EX_06', () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("12345678");
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
    cy.get(automationPracticeFormSelectors.mobile)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get(automationPracticeFormSelectors.mobile).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it('Invalid data in "Date of birth" field - TC_EX_07', () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("9876543210");
    cy.get(automationPracticeFormSelectors.dateOfBirth).click();
    cy.get(automationPracticeFormSelectors.monthDropdown).select("January");
    cy.get(automationPracticeFormSelectors.yearDropdown).select("2030");
    cy.get(automationPracticeFormSelectors.dayOfTheMonth).click();
    cy.get(automationPracticeFormSelectors.background).click();
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage).should("not.exist");
  });

  it("Remove tag from 'Subjects' - TC_EX_08", () => {
    cy.get(automationPracticeFormSelectors.name).click().type("Jane");
    cy.get(automationPracticeFormSelectors.lastName).click().type("Smith");
    cy.get(automationPracticeFormSelectors.gender2Female).click();
    cy.get(automationPracticeFormSelectors.mobile).click().type("9876543210");
    cy.get(automationPracticeFormSelectors.subjects)
      .click()
      .type("Maths" + "{enter}");
    cy.get(automationPracticeFormSelectors.subjectRemove).click();
    cy.get(automationPracticeFormSelectors.submit).click();
    cy.get(automationPracticeFormSelectors.submitMessage);
    cy.get(automationPracticeFormSelectors.table).within(() => {
      cy.get("td").eq(1).contains("Jane Smith");
      cy.get("td").eq(7).contains("9876543210");
      cy.get("td").eq(5).contains("Female");
    });
    cy.get(automationPracticeFormSelectors.closeTable).click();
  });
});
