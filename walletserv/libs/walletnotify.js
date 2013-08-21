//The walletnotify module!

var net = require('net'),
	events = require('events').EventEmitter,
	util = require('util'),
	transaction = require('./transaction.js');

function walletNotify(port) {

	var self = this;

	this.server = net.createServer(function(c) { //'connection' listener
		c.on('data', function(data) {
			var str = data.toString();
			var json;
			try {
				json = JSON.parse(str);
			} catch (e) {
				// invalid json input, set to null
				json = null
			}
			if(json == null){
				console.log('Error parsing: ' + str);
			}
			else{
				var txn = new transaction(json.type, json.hash);
				txn.on('new', function(){
					
				});
			}
		});

	});

	this.server.listen(port);
}


util.inherits(walletNotify, events);

module.exports = walletNotify;