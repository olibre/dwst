
/**

  Authors: Toni Ruottu, Finland 2018

  This file is part of Dark WebSocket Terminal.

  CC0 1.0 Universal, http://creativecommons.org/publicdomain/zero/1.0/

  To the extent possible under law, Dark WebSocket Terminal developers have waived all
  copyright and related or neighboring rights to Dark WebSocket Terminal.

*/

import Parsee from '../parsee.js';

import {expect} from 'chai';

describe('parsee module', () => {
  describe('Parsee class', () => {

    let parsee;

    beforeEach(() => {
      parsee = new Parsee('abc');
    });

    describe('length property', () => {
      it('should return content length', () => {
        expect(parsee.length).to.equal('foo'.length);
      });
    });
    describe('toString method', () => {
      it('should make it possible to cast content as a string', () => {
        expect(String(parsee)).to.equal('abc');
      });
    });
    describe('startsWith method', () => {
      it('should return true for matching content', () => {
        expect(parsee.startsWith('')).to.be.true;
        expect(parsee.startsWith('a')).to.be.true;
        expect(parsee.startsWith('ab')).to.be.true;
        expect(parsee.startsWith('abc')).to.be.true;
      });
      it('should return false for non-matching content', () => {
        expect(parsee.startsWith('123')).to.be.false;
        expect(parsee.startsWith('abcd')).to.be.false;
      });
    });
    describe('read method', () => {
      it('should return true for a successful read', () => {
        expect(parsee.read('')).to.be.true;
        expect(String(parsee)).to.equal('abc');
        expect(parsee.read('ab')).to.be.true;
        expect(String(parsee)).to.equal('c');
        expect(parsee.read('c')).to.be.true;
        expect(String(parsee)).to.equal('');
        expect(parsee.read('')).to.be.true;
        expect(String(parsee)).to.equal('');
      });
      it('should return false for an impossible read', () => {
        expect(parsee.read('123')).to.be.false;
        expect(parsee.read('abcd')).to.be.false;
      });
    });
    describe('readUntil method', () => {
      it('should return and skip content up to a stopper', () => {
        expect(parsee.readUntil(['c'])).to.equal('ab');
        expect(String(parsee)).to.equal('c');
      });
      it('should support multiple stoppers', () => {
        expect(parsee.readUntil(['b', 'c'])).to.equal('a');
        expect(String(parsee)).to.equal('bc');
      });
      it('should work the same regardeless of order of stoppers', () => {
        expect(parsee.readUntil(['c', 'b'])).to.equal('a');
        expect(String(parsee)).to.equal('bc');
      });
      it('should not be affected by irrelevant stoppers', () => {
        expect(parsee.readUntil(['d', 'b'])).to.equal('a');
        expect(String(parsee)).to.equal('bc');
      });
      it('should work even when all stoppers are irrelevant', () => {
        expect(parsee.readUntil(['d', 'e'])).to.equal('abc');
        expect(String(parsee)).to.equal('');
      });
    });
  });
});
