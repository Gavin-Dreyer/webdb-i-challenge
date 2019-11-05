const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	// list of posts
	// SELECT * FROM Posts
	// returns a promise
	db.select('*')
		.from('accounts')
		.then(accounts => {
			res.status(200).json(accounts);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to get accounts from DB' });
		});
});

server.get('/:id', (req, res) => {
	db.select('*')
		.from('accounts')
		.where('id', '=', req.params.id)
		.first()
		.then(account => {
			res.status(200).json(account);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to get account from DB' });
		});
});

server.post('/', (req, res) => {
	// remember to validate the data sent by the client
	db.insert(req.body, 'id') //ignore the console warning on SQLite
		.into('accounts')
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to insert account from DB' });
		});
});

server.put('/:id', (req, res) => {
	const changes = req.body;

	// validate the data before calling the database

	db('accounts')
		.where({ id: req.params.id })
		.update(changes)
		.then(count => {
			// how many records/rows were updated
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to change account from DB' });
		});
});

server.delete('/:id', (req, res) => {
	// validate the data before calling the database

	db('accounts')
		.where({ id: req.params.id })
		.del()
		.then(count => {
			// how many records/rows were updated
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to delete account from DB' });
		});
});

module.exports = server;
