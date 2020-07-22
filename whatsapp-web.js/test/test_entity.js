const expect = require('chai').expect;
const {data} = require('../src/models/data')
const {Entity} = require('../src/models/entity');
const { Website } = require('../src/models/website');

describe('Entity', () => {
    
    it('Test : addData', () => {
        let a = new Entity();
        a.addData('hello', new Website('hello'));

        expect(a.isData('hello')).to.true;
        expect(a.count).to.equal(0);
        
        
    });

    it('Test : clearData()', () => {
        let a = new Entity();
        a.addData('hello world', new Website('hello world'));
        a.addData('gada', new Website('gada'));
        a.addData('pagol', new Website('pagol'));
        
        a.clearData();
    
        expect(a.count).to.equal(0);
        expect(a.isData("kruta")).to.false;
        expect(a.isData("hello")).to.false;
        expect(a.isData('pagol')).to.false;
        expect(a.isData('hello world')).to.false;
    });

    it('Test: getData', () => {
        let a = new Entity();
        a.addData('hello world', new Website('hello world'));
        a.addData('gada', new Website('gada'));
        a.addData('pagol', new Website('pagol'));

        expect(a.getData('hello world').companyName).to.equal('hello world');
        expect(a.getData('gada').companyName).to.equal('gada');
        expect(a.getData('chu chu')).to.null;
        
    })

    it('Test: deleteData', () => {
        let a = new Entity();
        a.addData('hello world', new Website('hello world'));
        a.addData('gada', new Website('gada'));
        a.addData('pagol', new Website('pagol'));

        a.deleteData('gada');
        expect(a.getData('gada')).to.null;
    })

})