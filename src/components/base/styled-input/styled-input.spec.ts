import { emailRule } from './../../../utils/rules';
import { expect } from 'chai';
import { compile } from '../../../utils/compile';
import StyledInput from './styled-input';
describe('Проверяем компонент styled-input', () => {

	beforeEach(() => {
        const { JSDOM } = require("jsdom");
		const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>');

        global.window = dom.window;
        global.document = dom.window.document;
	});

    function createInput() {
        const input = new StyledInput({label: 'Test', rules: [{rule: emailRule, msg: 'Test должен соответствовать шаблону'}], value: ''});
        compile(input.render());
        return input;
    }

	it('Компонент корректно рендерится', () => {
        createInput();
        const app = document.getElementById('app')?.innerHTML;
        expect(app).to.eq('<div class="styled-input"><label class="styled-input__label" for="Test">Test</label><input class="styled-input__input" id="Test" value="" tabindex="0"><div style="color: red"></div></div>');
	});

    describe('Проверяем валидацию', () => {

        it('Изначально поле считается валидным', () => {
            const input = createInput();
            expect(input.valid).to.eq(true);
        });

        it('После первого блюра включается валидация', () => {
            const input = createInput();
            input.focus();
            input.blur();
            expect(input.valid).to.eq(false);
        });

        it('Валидное значение', () => {
            const input = createInput();
            input.focus();
            input.blur();
            input.setProps({...input.props, value: '123456@email.ru'});
            input.focus();
            input.blur();
            expect(input.valid).to.eq(true);
        });

        it('Невалидное значение', () => {
            const input = createInput();
            input.focus();
            input.blur();
            input.setProps({...input.props, value: '123456'});
            input.focus();
            input.blur();
            expect(input.valid).to.eq(false);
        });

    })
});
