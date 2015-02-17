/* global describe, it, expect, beforeEach, afterEach, module, inject, browser, element, by */
'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

    var email = 'test1121@test.com';
    var password = 'password';

    browser.get('index.html');

    it('should automatically redirect to / when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    describe('redirect to signup', function() {
        var signupLink;

        beforeEach(function() {
            signupLink = $('.omb_login .omb_authTitle a');
        });

        it('should redirect to signup  page', function() {

            signupLink.click();

            expect(browser.getLocationAbsUrl()).toMatch("/signup");

        });

    });

    describe('signup', function() {
        var signupButton, signupEmailField, signupPassField;

        beforeEach(function() {

            signupButton = $('.btn.btn-lg.btn-primary');
            signupEmailField = element(by.model('registrationForm.email'));
            signupPassField = element(by.model('registrationForm.password'));

        });

        it('should create user and redirect to services page', function() {

            signupEmailField.sendKeys(email);
            signupPassField.sendKeys(password);

            signupButton.click();

            checkMainPage();
            
        });


    });

    describe('logout', function() {

        var logOutButton;

        beforeEach(function(){
            logOutButton = $('#logout-link-id');
        });

        it('should perform logout and redirect to login page', function() {
            logOutButton.click();

            expect(browser.getLocationAbsUrl()).toMatch("/");
        })

    });


    describe('login', function() {
        var loginButton, loginField, passField;

        beforeEach(function() {
            loginButton = $('.btn.btn-lg.btn-primary');
            loginField = element(by.model('loginForm.email'));
            passField = element(by.model('loginForm.password'));
        });


        it('should perform login', function() {

            loginField.sendKeys(email);
            passField.sendKeys(password);

            loginButton.click();

            checkMainPage();

        });
    });

    function checkMainPage() {
        var flag;

        runs(function() {

            setTimeout(function() {
                flag = true;
            }, 3000);

        });

        waitsFor(function() {
          return flag;
        }, "waiting for redirect", 3000);
 
        runs(function() {
            expect(browser.getLocationAbsUrl()).toMatch("/main/services")
            expect($('.navbar-brand.topnav').getText()).toMatch('Start Bootstrap');
        });
    };

});
