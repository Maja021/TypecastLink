/// <reference types="cypress" />
export default class RegisterPage {

    get firstName() { return cy.get('#FirstName') }
    get lastName() { return cy.get('#LastName') }
    get email() { return cy.get('#Email') }
    get password() { return cy.get('#Password') }
    get confirmPassword() { return cy.get('#ConfirmPassword') }
    get company() { return cy.get('#Company') }
    get companyOIB() { return cy.get('#CompanyOIB') }
    get companyAddress() { return cy.get('#CompanyAddress') }
    get registerAsCompany() { return cy.get('#RegisterAsCompany').type('[type="checkbox"]') }
    get city() { return cy.get('.ui-autocomplete-input').eq(1) }
    get registerButton() { return cy.get('#register-button') }
    get gender() { return cy.get('#gender-female').type('[type="radio"].XyzTypeRadio') }
    get dateBirth() { return cy.get('select').eq(1).type('[name="DateOfBirthDay"]') }
    get monthBirth() { return cy.get('select').eq(2).type('[name="DateOfBirthMonth"]') }
    get yearBirth() { return cy.get('select').eq(3).type('[name="DateOfBirthYear"]') }
    get streetAddress() { return cy.get('#StreetAddress') }
    get gradPerson() { return cy.get('.ui-autocomplete-input').eq(3) }
    get phone() { return cy.get('#Phone') }
    get newsletter() { return cy.get('#Newsletter').type('[type="checkbox"]') }
    get companyEmail() { return cy.get('#CompanyEmail') }
    get companyTelephone() { return cy.get('#CompanyTelephone') }
    get companyContactPerson() { return cy.get('#CompanyContactPerson') }

    registerPravnaOsobaWithNonRequireFields(companyOIB, companyEmail, companyTelephone, companyContactPerson, 
        companyAddress, city, firstName, lastName, email, password, confirmPassword, company) {
        this.companyOIB.type(companyOIB)
        this.companyEmail.type(companyEmail)
        this.companyTelephone.type(companyTelephone)
        this.companyContactPerson.type(companyContactPerson)
        this.companyAddress.type(companyAddress)
        this.city.type(city)
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.company.type(company)

    }
    registerPersonalWithNonRequireFields(firstName, lastName,
        email, streetAddress, gradPerson, phone, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.streetAddress.type(streetAddress)
        this.gradPerson.type(gradPerson)
        this.phone.type(phone)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }
    registerUserPravnaOsobaWithoutGrad(firstName, lastName, email, password, confirmPassword, companyAddress) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.companyAddress.type(companyAddress)
    }
    registerUserPravnaOsobaWithoutCompanyNameAndLastName(firstName, email, password, confirmPassword, companyAddress, city) {
        this.firstName.type(firstName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.companyAddress.type(companyAddress)
        this.city.type(city)
    }

    registerUserPravnaOsobaWithoutOIBandLastName(firstName, email, password, confirmPassword, company, companyAddress, city) {
        this.firstName.type(firstName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.company.type(company)
        this.companyAddress.type(companyAddress)
        this.city.type(city)
    }
    registerUserPravnaOsobaWithInvalidOIB(firstName, lastName, email, password, confirmPassword, company, companyOIB, companyAddress, city) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.company.type(company)
        this.companyOIB.type(companyOIB)
        this.companyAddress.type(companyAddress)
        this.city.type(city)
    }

    registerUserIfEmailExist(firstName, lastName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }
    registerUserEmailInvalid(firstName, lastName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerUserGoToRegResultWithInvalidForm(firstName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }
    registerUserPasswordAndConfPasswordDoesNotMatch(firstName, lastName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerUserPasswordWith5char(firstName, lastName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerUserWithoutFirstName(lastName, email, password, confirmPassword) {
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerUserWithoutLastName(firstName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerUserWithoutPassword(firstName, email, confirmPassword) {
        this.firstName.type(firstName)
        this.email.type(email)
        this.confirmPassword.type(confirmPassword)
    }

    registerPersonal(firstName, lastName, email, password, confirmPassword) {
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
    }

    registerPravnaOsoba(companyOIB, companyAddress, city, firstName, lastName, email, password, confirmPassword, company) {
        this.companyOIB.type(companyOIB)
        this.companyAddress.type(companyAddress)
        this.city.type(city)
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.company.type(company)

    }
}
export const registerPage = new RegisterPage();