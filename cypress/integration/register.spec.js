/// <reference types="cypress" />

describe("Registration test", () => {
  //Load register page
  it.only("visit register page", () => {
    cy.visit("/register");
  });

  //Negative test without first name
  it("Register user without first name", () => {
    //cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    // cy.get('#FirstName').type('Majaaa');
    //cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration without first name', () => {
    cy.get('.field-validation-error').should('include.text', 'Ime je potrebno')
  })

  //Negative test without last name
  it("Register user without last name", () => {
    //cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#FirstName').type('Majaaa');
    //cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration without last name', () => {
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
  })

  //Negative test with empty form
  it("Register user with empty form", () => {
    cy.get('#register-button').click();
  })

  it('Assert registration with empty form', () => {
    cy.get('.field-validation-error').should('include.text', 'Ime je potrebno')
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
    cy.get('.field-validation-error').should('include.text', 'Elektronska pošta je potrebna')
    cy.get('.field-validation-error').should('include.text', 'Lozinka je potrebna.')
  })
  //Negative test without Lozinka
  it("Register user without Lozinka", () => {
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration without Lozinka', () => {
    cy.get('.field-validation-error').should('include.text', 'Lozinka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Lozinka i potvrda lozinke se ne podudaraju.')
  })

   //Negative test "Lozinka" with 5 characters all letters
   it.only("Register user Lozinka  with 5 characters all letters", () => {
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('rrrrr');
    cy.get('#ConfirmPassword').type('rrrrr');
    cy.get('#register-button').click();
  })

  it.only('Assert registration with 5 characters all letters', () => {
    cy.get('.field-validation-error').should('include.text', 'Lozinka treba imati najmanje 6 znakova.')
  })

   //Negative test 'Lozinka' and 'Potvrdite lozinku' password doesn't match
   it("Register user with 'Lozinka' and 'Potvrdite lozinku' password doesn't match", () => {
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum1234');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it("Assert registration password doesn't match", () => {
    cy.get('.field-validation-error').should('include.text', 'Lozinka i potvrda lozinke se ne podudaraju.')
  })

  //Negative test Email validation - email without ".com"
  it("Register user with valid data", () => {
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dfdf@gmail');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration email without ".com"', () => {
    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
  })

  //Negative test Email validation - email without "@"
  it("Register user with valid data", () => {
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dfdfgmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration email without "@"', () => {
    cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
  })
//Negative test Registration with registrated email" ///////////////////////BUG
it("Register user with valid data", () => {
  cy.get('#FirstName').type('Majaaa');
  cy.get('#LastName').type('MajaaaMaja');
  cy.get('#Email').type('majacekic90@gmail.com');
  cy.get('#Password').type('randum123456');
  cy.get('#ConfirmPassword').type('randum123456');
  cy.get('#register-button').click();
})

it('Assert registration with registrated email', () => {
  cy.get('.field-validation-error').should('include.text', 'Navedena elektronska pošta/adresa postoji')
})

  //Negative test Go to /registerresult/2 page with invalid in form" ///////////////////////BUG
it("Go to /registerresult/2 page with invalid in form", () => {
  cy.get('#FirstName').type('Majaaa');
  cy.get('#Email').type('dfdf@gmail');
  cy.get('#Password').type('randum123456');
  cy.get('#ConfirmPassword').type('randum123456');
  cy.get('#register-button').click();
  cy.wait(2000);
  cy.visit("/registerresult/2");
})

it('Assert registration without Prezime and invalid email', () => {
  cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
  cy.get('.field-validation-error').should('include.text', 'Pogrešan e-mail')
})
  
//negative test as "Pravna osoba" with empty form and  Personal data empty form" ///////////////////////BUG
  it("Register user as 'Pravna osoba' empty form with empty form 'Personal data'", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#register-button').click();
  })

  it('Assert registration sucess', () => {
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
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#Company').type('comp');
    cy.get('#CompanyOIB').type('1234567891');
    cy.get('#CompanyAddress').type('Kosovska 11');
    cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration with 10 numeric OIB number', () => {
    cy.get('.field-validation-error').should('include.text', 'Neispravan OIB')
  })

   //negative test as Register user as "Pravna osoba" with one alphabet in OIB number"
   it("Register user as 'Pravna osoba' with one alphabet in OIB number", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#Company').type('comp');
    cy.get('#CompanyOIB').type('1234567891a');
    cy.get('#CompanyAddress').type('Kosovska 11');
    cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration with 10 numeric OIB number', () => {
    cy.get('.field-validation-error').should('include.text', 'Neispravan OIB')
  })

   //negative test as Register user as "Pravna osoba" without "OIB" and Last name" ///////////////////////BUG
   it("Register user as 'Pravna osoba' without 'OIB' and Last name", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#Company').type('comp');
    cy.get('#CompanyAddress').type('Kosovska 11');
    cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it("Assert registration without 'OIB' and Last name", () => {
    cy.get('.field-validation-error').should('include.text', 'OIB tvrtke je potreban')
  })
   //negative test as Register user as "Pravna osoba" without "Company" and Last name" ///////////////////////BUG
   it("Register user as  'Pravna osoba' without 'Ime tvritke'", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    //cy.get('#Company').type('comp');
    cy.get('#CompanyOIB').type('12345678911');
    cy.get('#CompanyAddress').type('Kosovska 11');
    cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    //cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it("Assert registration without without 'Ime tvritke'", () => {
    cy.get('.field-validation-error').should('include.text', 'Tvrtka je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Prezime je potrebno.')
  })

  //negative test as 'Pravna osoba' without 'Grad'" ///////////////////////BUG
  it("Register user as 'Pravna osoba' without 'Grad'", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#Company').type('comp');
    cy.get('#CompanyOIB').type('12345678911');
    cy.get('#CompanyAddress').type('Kosovska 11');
    //cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it("Assert registration without without 'Ime tvritke'", () => {
    cy.get('.field-validation-error').should('include.text', 'Grad je potreban')
    cy.get('.field-validation-error').should('include.text', 'Država je potrebna.')
    cy.get('.field-validation-error').should('include.text', 'Poštanski broj je potreban')
  })
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //positive test as "Pravna osoba"
  it("Register user with valid data", () => {
    cy.get('#RegisterAsCompany').type('[type="checkbox"]').check();
    cy.get('#Company').type('comp');
    cy.get('#CompanyOIB').type('12345678910');
    cy.get('#CompanyAddress').type('Kosovska 11');
    cy.get('.ui-autocomplete-input').eq(1).type('Novi Sad');
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeesswdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    cy.get('#register-button').click();
  })

  it('Assert registration sucess', () => {
    cy.wait(5000);
    cy.visit("/registerresult/2");
    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
  })
  // Positive test as Personal user
  it("Register user with valid data", () => {
    cy.get('.user-register').click();
    cy.get('#FirstName').type('Majaaa');
    cy.get('#LastName').type('MajaaaMaja');
    cy.get('#Email').type('dddddlllllleeeeewdfww@gmail.com');
    cy.get('#Password').type('randum123456');
    cy.get('#ConfirmPassword').type('randum123456');
    //cy.get('.form-check-input').type('[type="checkbox"]').check();
    cy.get('#register-button').click();
  })

  it('Assert registration sucess', () => {
    cy.wait(5000);
    cy.visit("/registerresult/2");
    cy.get('.result').should('include.text', 'Poslan vam je e-mail koji sadrži upute za aktivaciju članstva.')
  })
})
