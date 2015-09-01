'use strict';

// add extra time to each test step in order to be sure all animation effects are done 
var utils = require('.././protractor-utils.js');
utils.extend(300);

describe('Resume App', function() {
    beforeEach(function() {
        browser.get('index.html');
    });

    // simple smoke tests
    xit('should have a title', function() {
        expect(browser.getTitle()).toEqual('Hi, my name is Martin Surynek');
    });

    xit('should display header content title', function() {
        var title = element(by.css('.header .title'));
        expect(title.getText()).toBe('MARTIN SURYNEK');
    });

    // scrollspy testing
    describe('Navbar links one by one', function() {
        it('should navigate to Work eperience section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#work-experience"')).click();

            element(by.id('work-experience')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('513');
            });

            // template
            element(by.id('work-experience')).getCssValue('overflow').then(function (value) {
                expect(value).toBe('hidden');
            });
        });

        it('should navigate to Certificates section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#certificates"')).click();
            element(by.id('certificates')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1178');
            });
        });

        it('should navigate to Languages section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#languages"')).click();
            element(by.id('languages')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1382');
            });
        });

        it('should navigate to Education section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#education"')).click();
            element(by.id('education')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1507');
            });
        });

        it('should navigate to Skills section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#skills"')).click();
            element(by.id('skills')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1861');
            });
        });

        it('should navigate to ContactMe section by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#contact-me"')).click();
            element(by.id('contact-me')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('2770');
            });
        });
    });

    describe('Navbar links', function() {
        it('should navigate throughout the page by clicking on particular link', function() {
            element(by.css('ul.navbar-nav a[href="#certificates"')).click();
            element(by.id('work-experience')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('513');
            });

            element(by.css('ul.navbar-nav a[href="#certificates"')).click();
            element(by.id('certificates')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1178');
            });

            element(by.css('ul.navbar-nav a[href="#languages"')).click();
            element(by.id('languages')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1382');
            });

            element(by.css('ul.navbar-nav a[href="#education"')).click();
            element(by.id('education')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1507');
            });

            element(by.css('ul.navbar-nav a[href="#skills"')).click();
            element(by.id('skills')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('1861');
            });

            element(by.css('ul.navbar-nav a[href="#contact-me"')).click();
            element(by.id('contact-me')).getAttribute('offsetTop').then(function(offset) {
                expect(offset).toEqual('2770');
            });            
        });
    });

});
