/**
 * @fileOverview Base API Surface tests.
 */
var chai = require('chai');
var expect = chai.expect;

var crypto = require('../..');

describe('Base tests', function() {
  describe('Base API Surface', function() {
    it('should export methods', function(){
      expect(crypto.setSalt).to.be.a('function');
      expect(crypto.salt).to.be.a('function');
      expect(crypto.hash).to.be.a('function');
      expect(crypto.hashVerify).to.be.a('function');
    });
  });

  describe('Test "setSalt" method', function () {
    it('should set the internal salt var', function () {
      crypto.setSalt('custom salt');
      expect(crypto.__salt).to.equal('custom salt');
    });
  });


  describe('Test "hash" method', function () {
    it('should hash a string', function (done) {
      crypto.hash('string', function (err, hashed) {
        if (err) {
          done(err);
          return;
        }
        expect(hashed).to.not.equal('string');
        done();
      });
    });
  });

  describe('Test "hashVerify" method', function () {
    beforeEach(function (done) {
      var self = this;
      crypto.hash('string', function (err, hashed) {
        if (err) {
          done(err);
          return;
        }
        self.hashed = hashed;
        done();
      });
    });

    it('should properly verify an identical string', function (done) {
      crypto.hashVerify(this.hashed, 'string', function (match) {
        expect(match).to.be.true;
        done();
      });
    });
    it('should not verify a different string', function (done) {
      crypto.hashVerify(this.hashed, 'string2', function (match) {
        expect(match).to.be.false;
        done();
      });
    });
  });

});
