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

        let message = 'wg website p12';

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

    it('Test : getInput() with 1 input', () => {

        let message = 'wg create p12'

        let a = new Command({
            command: "wg create <id>",
            callback: () => {

            } 
        });

        expect(a.getInput(message)['id']).to.equal('p12');
    });

    it('Test : getInput() with 2 input', () => {

        let message = 'wg create p12 pikachu'

        let a = new Command({
            command: "wg create <id> <name>",
            callback: () => {

            } 
        });

        expect(a.getInput(message)['id']).to.equal('p12');
        expect(a.getInput(message)['name']).to.equal('pikachu');
    });



});