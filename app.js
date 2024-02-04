// crawling test callback api server

// import modules
const express = require('express');
const app = express();

// callback api
app.get('/test-api/test1', function(req, res) {
	console.log('test1');
	res.send({
		'success': true,
		'data': [ 
			{
				'title': 'Node.js crawling',
				'desc': 'Node.js crawling example',
				'price': '10000',
				'instructor': 'John',
				'img': 'http://www.test.com/img1.jpg'
			},
		]
	});
});

app.listen(8000, function() {
    console.log('Connected 8000 port');
});
