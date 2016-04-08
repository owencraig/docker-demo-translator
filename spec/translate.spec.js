var translate = require('../translate.js');

describe('translate', () => {
    describe('intl to us', () => {
        var getTranslation = translate.getTranslation.bind(null, 'us', 'intl');
        it('should spell colour correctly', () => {
            expect(getTranslation('colour')).toBe('color');
        });
    });

    describe('intl to us', () => {
        var getTranslation = translate.getTranslation.bind(null, 'intl', 'us');
        it('should spell color correctly', () => {
            expect(getTranslation('color')).toBe('colour');
        });
    });

});