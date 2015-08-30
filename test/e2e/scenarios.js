'use strict';

describe('Resume App', function() {
    beforeEach(function() {
        browser.get('index.html');
    });

    it('should display header content title', function() {
        var title = element(by.css('.header .title'));
        expect(title.getText()).toBe('MARTIN SURYNEK');
    });

    // it('should navigate to Work eperience section by clicking on particular link', function() {
    //     var workExperienceLink = element(by.css('ul.navbar-nav a[href="#work-experience"]'));
    //     workExperienceLink.click();
    // });

});
