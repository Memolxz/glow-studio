const http = require('https');

const options = {
	method: 'GET',
	hostname: 'real-time-sephora-api.p.rapidapi.com',
	port: null,
	path: '/category-data?categoryId=cat1600040',
	headers: {
		'x-rapidapi-key': 'f5c682003amsh16d150f7c21c9f9p1ece6ajsn327731becf08',
		'x-rapidapi-host': 'real-time-sephora-api.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();