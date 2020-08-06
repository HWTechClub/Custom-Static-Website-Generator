const { Command } = require('../src/models/commands');

const expect = require('chai').expect;

describe('Command', () => {

    it('Test : requireInput() without input', () => {
        let a = new Command({
            command: "wg create",
            callback: () => {

            } 
        });

        expect(a.requireInput).to.false;
    });

    it('Test : requireInput() with input', () => {
        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });

        expect(a.requireInput).to.true;
    });

    it('Test : requireInput() with 2 inputs', () => {
        let a = new Command({
            command: "wg create <id> <name>",
            callback: () => {

            } 
        });

        expect(a.requireInput).to.true;
    });

    it('Test : equals() without input', () => {

        let message = 'wg website';

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });
        
        let b = new Command({
            command: "wg website",
            callback: () => {

            } 
        });
        
        let c = new Command({
            command: "wg product p12",
            callback: () => {

            } 
        });
        
        let d = new Command({
            command: "wg",
            callback: () => {

            } 
        });
        
        expect(a.equals(message)).to.false;
        expect(b.equals(message)).to.true;
        expect(c.equals(message)).to.false;
        expect(d.equals(message)).to.false;
    });


    it('Test : equals() with input', () => {

        let message = 'wg create p12';

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });
               
        expect(a.equals(message)).to.true;

    });

    it('Test : equals() with different message', () => {

        let message = 'wg website web';

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });
               
        expect(a.equals(message)).to.false;

    });

    it('Test : equals() with spelling error', () => {

        let message = 'wg websit';
        
        let b = new Command({
            command: "wg website",
            callback: () => {

            } 
        });

        expect(b.equals(message)).to.false;

    });
    it('Test : equals() with extra inputs', () => {

        let message = 'wg create p12 pr';

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });
        
        
        expect(a.equals(message)).to.false;
    });

    it('Test : _getInputMessage() with 1 input', () => {

        let message = 'wg create p12'

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });

        expect(a._getInputMessage(message)['id']).to.equal('p12');
    });

    it('Test : _getInputMessage() with 2 input', () => {

        let message = 'wg create p12 pikachu'

        let a = new Command({
            command: "wg create <id> <name>",
            callback: () => {

            } 
        });

        expect(a._getInputMessage(message)['id']).to.equal('p12');
        expect(a._getInputMessage(message)['name']).to.equal('pikachu');
    });

    it('Test : _getSplitMessage() with a sentence', () => {
        let a = new Command({command : 'wg website desc <desc>'});
        let b = a._getSplitMessage(`wg website desc "Hello everynyan, how are you"`);
        expect(b[0]).to.equal('wg');
        expect(b[1]).to.equal('website');
        expect(b[2]).to.equal('desc');
        expect(b[3]).to.equal('Hello everynyan, how are you');
    })

    it('Test : _getSplitMessage() with multiple sentence input', () => {
        let a = new Command({command : 'wg website desc <desc>'});
        let b = a._getSplitMessage(`wg website desc "Hello everynyan, how are you" "I am fine thank you"`);
        expect(b[0]).to.equal('wg');
        expect(b[1]).to.equal('website');
        expect(b[2]).to.equal('desc');
        expect(b[3]).to.equal('Hello everynyan, how are you');
        expect(b[4]).to.equal('I am fine thank you');
    })
    it('Test : _getSplitMessage() with single word', () => {
        let a = new Command({command : 'wg website desc <desc>'});
        let b = a._getSplitMessage(`wg website desc Hello`);
        expect(b[0]).to.equal('wg');
        expect(b[1]).to.equal('website');
        expect(b[2]).to.equal('desc');
        expect(b[3]).to.equal('Hello');
    })



});