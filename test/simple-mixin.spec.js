/**
* @license simple-object-mixin https://github.com/flams/simple-object-mixin
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
var chai = require("chai"),
	expect = chai.expect;

var sut = require("../index");

describe("Mixin", function () {

var source = {},
		destination = {};

	beforeEach(function () {
		destination = {a: 10, b: 20};
		source = function () { this.b=30; this.c=40;};
		source.prototype.d = 50;
		source = new source();
	});

	it("should be a function", function () {
		expect(typeof sut).to.equal("function");
	});

	it("should mix source into destination", function () {
		sut(source, destination);
		expect(source.b).to.equal(destination.b);
		expect(destination.b).to.equal(30);
		expect(source.c).to.equal(destination.c);
	});

	it("should mix source into destination without overriding", function () {
		sut(source, destination, true);
		expect(source.b).not.to.equal(destination.b);
		expect(destination.b).to.equal(20);
		expect(source.c).to.equal(destination.c);
	});

	it("should'nt mix in values from the proto chain", function () {
		sut(source, destination);
		expect(destination.d).to.be.undefined;
	});

	it("should also return the destination", function () {
		expect(sut(source, destination)).to.equal(destination);
	});
});
