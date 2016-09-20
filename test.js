'use strict';

const Nightmare = require('nightmare');
require('nightmare-upload')(Nightmare);
const expect = require('chai').expect;
require('mocha-generators').install();

process.setMaxListeners(0);

describe('Nightmare upload', function(){
	// setup
	this.timeout(10000);

	let nightmare = Nightmare({
		show: true,
		width: 960,
		height: 960,
		webPreferences: {
			partition: 'nopersist',
		},
	});

	after(function*() {
		yield nightmare.end();
	});

	it('should display an image name and type', function*(){
		const name = yield nightmare
			.goto('http://localhost:3001')
			.upload('#test', '4.jpg')
			.evaluate(function(){
				return document.querySelector('#name').innerText;
			})
		expect(name).to.equal('4.jpg');

		const type = yield nightmare
			.evaluate(function(){
				return document.querySelector('#type').innerText;
			})
		expect(type).to.equal('image/jpeg');
	});

	it('should display a zip name and type', function*(){
		const name = yield nightmare
			.goto('http://localhost:3001')
			.upload('#test', 'upload.zip')
			.evaluate(function(){
				return document.querySelector('#name').innerText;
			})
		expect(name).to.equal('upload.zip');

		const type = yield nightmare
			.evaluate(function(){
				return document.querySelector('#type').innerText;
			})
		expect(type).to.equal('application/zip');
	});
});