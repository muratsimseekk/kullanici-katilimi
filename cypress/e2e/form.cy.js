/// <reference types="cypress" />

describe("Product Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Isim inputuna isim yazmak.", () => {
    /// Gorev1 ve 2
    const nameInput = cy.get("#isim-inputu");

    nameInput.type("Murat");

    nameInput.invoke("val").should("eq", "Murat");

    //Gorev 3

    const mailInput = cy.get("#mail-inputu");

    mailInput.type("muratsimseekk@gmail.com");

    //Gorev 4

    const sifreInput = cy.get("#sifre-inputu");
    sifreInput.type("123456789");

    //Gorev5

    const checkboxInput = cy.get("#active");
    checkboxInput.click();
    checkboxInput.should("be.checked");

    //Gorev6

    const btn = cy.get("#btn-input");
    btn.click();

    //Gorev7

    const vldControl = cy.get(".validation");
    vldControl.should("be.hidden");

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
