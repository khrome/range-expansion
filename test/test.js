const should = require('chai').should();
const expand = require('../range-expansion');

describe('range-expansion', ()=>{
    it('expands an single field object correctly', ()=>{
        let expanded = expand({
            somefield : [0, 10],
            blah: 'something'
        });
        expanded.length.should.equal(10);
    });

    it('expands a two field object correctly', ()=>{
        let expanded = expand({
            somefield : [0, 10],
            someotherfield : [0, 10],
            foo: 'bar'
        });
        expanded.length.should.equal(100);
    });

    it('expands a three field object correctly', ()=>{
        let expanded = expand({
            somefield : [0, 10],
            someotherfield : [0, 10],
            somethirdield : [0, 10]
        });
        expanded.length.should.equal(1000);
    });
});
