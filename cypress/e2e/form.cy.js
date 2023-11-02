/// <reference types="cypress" />

describe("Product Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Isim inputuna isim yazmak.", () => {
    cy.get("#isim-inputu").type("Murat");

    // const nameInput = cy.get("#name-input");

    // nameInput.type("as");

    // cy.get("#name-validation")
    //   .should("be.visible")
    //   .should("have.text", "Ürün ismi 3 karakterden az olamaz.");

    // nameInput.type("{backspace}{backspace}");

    // cy.get("#name-validation")
    //   .should("be.visible")
    //   .should("have.text", "İsim alanı boş bırakılamaz!");

    // nameInput.type("ornek urun 1");

    // cy.get("#name-validation").should("be.hidden");
  });
});

/*
  
  Test Coverage Rate: 
  
    100 toplan satır sayısı
    40 test esnasında çalışan satır sayısı
    40 %
  
    
  
  */
