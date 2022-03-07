/// <reference types="cypress" />

import { registerPage } from "../page_objects/registrationPOM"
const { faker } = require('@faker-js/faker');

describe("Registration test", () => {

  let userData = {
    randomName: faker.name.firstName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password()
  }

  //Load register page
  beforeEach("visit Register page", () => {
    cy.wait(5000);
    cy.visit("/Register");
    cy.url().should('contain', '/Register')
  });

  //Negative test without first name
  it("Register user without first name", () => {
    registerPage.registerUserWithoutFirstName(userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Ime je potrebno')
  })


  //Negative test without last name
  it("Register user without last name", () => {
    registerPage.registerUserWithoutLastName(userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
  })

  //Negative test with empty form
  it("Register user with empty form", () => {
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Ime je potrebno')
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
    cy.get('.field-validation-error').should('include.text', 'Elektronska pošta je potrebna')
    cy.get('.field-validation-error').should('include.text', 'Lozinka je potrebna.')
  })

  //Negative test without Lozinka
  it("Register user without Lozinka", () => {
    registerPage.registerUserWithoutPassword(userData.randomName, userData.randomEmail, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Lozinka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Lozinka i potvrda lozinke se ne podudaraju.')
  })

  //Negative test "Lozinka" with 5 characters all letters
  it("Register user Lozinka  with 5 characters all letters", () => {
    registerPage.registerUserPasswordWith5char(userData.randomName, userData.randomName, userData.randomPassword, '12345', '12345')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Lozinka treba imati najmanje 6 znakova.')
  })

  //Negative test 'Lozinka' and 'Potvrdite lozinku' password doesn't match
  it("Register user with 'Lozinka' and 'Potvrdite lozinku' password doesn't match", () => {
    registerPage.registerUserPasswordAndConfPasswordDoesNotMatch(userData.randomName, userData.randomName, userData.randomEmail, userData.randomPassword, '123456')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Lozinka i potvrda lozinke se ne podudaraju.')
  })

  //Negative test Email validation - email without ".com"
  it("Register user Email validation - email without '.com'", () => {
    registerPage.registerUserEmailInvalid(userData.randomName, userData.randomName, 'dfdf@gmail', userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
  })

  //Negative test Email validation - email with "." in user ///////////////////////BUG
  it("Register user Email validation - email with '.' in user", () => {
    registerPage.registerPersonal(userData.randomName, userData.randomName, 'Guillermo.Huels83@gmail.com', userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    cy.url().should('contain', '/registerresult/2')
  })
  //Negative test Email validation - email without "@" 
  it("Register user Email validation - email without '@'", () => {
    registerPage.registerUserEmailInvalid(userData.randomName, userData.randomName, 'dfdf.com', userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
  })
  //Negative test Registration with registrated email"
  it("Register user with registrated email", () => {
    registerPage.registerUserIfEmailExist(userData.randomName, userData.randomName, "majacveticanin90@gmail.com", userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.validation-summary-errors').should('include.text', 'Navedena elektronska pošta/adresa postoji')
  })

  //Negative test Go to /registerresult/2 page with invalid in form" ///////////////////////BUG
  it("Go to /registerresult/2 page with invalid in form", () => {
    registerPage.registerUserGoToRegResultWithInvalidForm(userData.randomName, 'ddfj@hdhd', userData.randomPassword, userData.randomPassword)

    cy.wait(2000);
    cy.visit("/registerresult/2");
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
  })

  //negative test as "Pravna osoba" with empty form and  Personal data empty form" ///////////////////////BUG
  it("Register user as 'Pravna osoba' empty form with empty form 'Personal data'", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Ime je potrebno')
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
    cy.get('.field-validation-error').should('include.text', 'Elektronska pošta je potrebna')
    cy.get('.field-validation-error').should('include.text', 'Lozinka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Tvrtka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'OIB tvrtke je potreban')
    cy.get('.field-validation-error').should('include.text', 'Adresa 1 je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Poštanski broj je potreban')
    cy.get('.field-validation-error').should('include.text', 'Grad je potreban')
    cy.get('.field-validation-error').should('include.text', 'Država je potrebna.')
  })
  //negative test as "Pravna osoba with 10 numeric OIB number"
  it("Register user as 'Pravna osoba' with 10 numeric OIB number", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerUserPravnaOsobaWithInvalidOIB(userData.randomName, userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword,
      userData.randomName, '1234567891', 'Banatska 10', 'Novi Sad')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Neispravan OIB')
  })

  //negative test as Register user as "Pravna osoba" with one alphabet in OIB number"
  it("Register user as 'Pravna osoba' with one alphabet in OIB number", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerUserPravnaOsobaWithInvalidOIB(userData.randomName, userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword,
      userData.randomName, '123456789aa', 'Banatska 10', 'Novi Sad')
    registerPage.registerButton.click();


    cy.get('.field-validation-error').should('include.text', 'Neispravan OIB')
  })

  //negative test as Register user as "Pravna osoba" without "OIB" and Last name" ///////////////////////BUG
  it("Register user as 'Pravna osoba' without 'OIB' and Last name", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerUserPravnaOsobaWithoutOIBandLastName(userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword,
      userData.randomName, 'Banatska 10', 'Novi Sad')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno')
    cy.get('.field-validation-error').should('include.text', 'OIB tvrtke je potreban')
  })
  //negative test as Register user as "Pravna osoba" without "Company" and Last name" ///////////////////////BUG
  it("Register user as  'Pravna osoba' without 'Ime tvritke'", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerUserPravnaOsobaWithoutCompanyNameAndLastName(userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword,
      'Banatska 10', 'Novi Sad')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Tvrtka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
  })

  //negative test as 'Pravna osoba' without 'Grad'"
  it("Register user as 'Pravna osoba' without 'Grad'", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerUserPravnaOsobaWithoutGrad(userData.randomName, userData.randomName, userData.randomEmail, userData.randomPassword, userData.randomPassword,
      'Banatska 10')
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Grad je potreban')
    cy.get('.field-validation-error').should('include.text', 'Država je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Poštanski broj je potreban')
  })

  //negative test as  Personal user  with alphabet in 'Telefon'" ///////////////////////BUG
  it("Register user as  Personal user  with alphabet in 'Telefon'", () => {
    registerPage.registerPersonalWithNonRequireFields(userData.randomName, userData.randomName, userData.randomEmail, userData.randomName,
      'Novi Sad', 'jdjdjjdjdj', userData.randomPassword, userData.randomPassword)
    registerPage.dateBirth.select('2').invoke('val');
    registerPage.monthBirth.select('veljača').invoke('val');
    registerPage.yearBirth.select('1990').invoke('val');
    registerPage.gender.check();
    registerPage.newsletter.check();
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Neispravan unos telefona')
  })

    //negative test as "Pravna osoba" with invalid company Telephone and email///////////////////////BUG
  it("Register Pravna osoba with invalid data Telephone company and email company", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerPravnaOsobaWithNonRequireFields('12345678911', 'jsj.com', 'sssssss', userData.randomName,
     'Banatska 10', 'Novi Sad', userData.randomName, userData.randomName, 'Gs33uillermosskkkk@gmail.com', userData.randomPassword, userData.randomPassword, userData.randomName)
    registerPage.registerButton.click();

    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
    cy.get('.field-validation-error').should('include.text', 'Neispravan unos telefona')
  })
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //positive test as "Pravna osoba"
  it("Register Pravna osoba with valid data ", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerPravnaOsoba('12345678911', 'Banatska 10', 'Novi Sad', userData.randomName, userData.randomName, 'GuillermoHdaasadduedffsffls83@gmail.com', userData.randomPassword, userData.randomPassword, userData.randomName)
    registerPage.registerButton.click();

    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    cy.url().should('contain', '/registerresult/2')
  })
  //positive test as "Pravna osoba" with non required fields
  it("Register Pravna osoba with valid data with non required fields", () => {
    registerPage.registerAsCompany.check();
    registerPage.registerPravnaOsobaWithNonRequireFields('12345678911', 'jsjsj@djdjjd.com', '+381 604619900', userData.randomName,
     'Banatska 10', 'Novi Sad', userData.randomName, userData.randomName, 'Guillermo8s3@gmail.com', userData.randomPassword, userData.randomPassword, userData.randomName)
    registerPage.registerButton.click();

    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    cy.url().should('contain', '/registerresult/2')
  })
  // Positive test as Personal user
  it("Register Personal user with valid data", () => {
    registerPage.registerPersonal(userData.randomName, userData.randomName, 'GuisssllermdddoassaffffHuels83@gmail.com', userData.randomPassword, userData.randomPassword)
    registerPage.registerButton.click();

    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    cy.url().should('contain', '/registerresult/2')
  })
  // Positive test as Personal user with non required fields
  it("Register Personal user with valid data and non required fields", () => {
    registerPage.registerPersonalWithNonRequireFields(userData.randomName, userData.randomName, 'GuillesdsdsrmoHsssusels83@gmail.com', userData.randomName,
      'Novi Sad', '+381 604619900', userData.randomPassword, userData.randomPassword)
    registerPage.dateBirth.select('2').invoke('val');
    registerPage.monthBirth.select('veljača').invoke('val');
    registerPage.yearBirth.select('1990').invoke('val');
    registerPage.gender.check();
    registerPage.newsletter.check();
    registerPage.registerButton.click();

    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
    cy.url().should('contain', '/registerresult/2')
  })
})
