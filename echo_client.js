//
// Echo client
//

const Echo = require('laravel-echo');
const io = require('socket.io-client');
const { exec } = require('child_process');
const fs = require('fs');

if (process.argv.length !== 3) {
	console.log('Usage: node '+process.argv[1]+' /path/to/config.json');
	return;
}

let { config } = {};
if (fs.existsSync(process.argv[2])) {
	const rawData = fs.readFileSync(process.argv[2]);
	config = JSON.parse(rawData);
} else {
	console.log('Error: config.json does not exist. Please create and try again.');
	return;
}

const echo = new Echo({
	broadcaster: 'socket.io',
	host: (config.tls ? 'https://' : 'http') + config.host,
	client: io,
	encrypted: config.tls,
	secure: config.tls,
	rejectUnauthorized: false
});

console.log('Laravel Echo Client connected to channel '+config.channel+', listening for '+config.event+ ' events..');

echo.channel(config.channel)
	.listen(config.event, (response) => {
		console.log('name: '+response.name+', datetime: '+response.datetime);
		if (config.pan_run && config.event_var) {
			exec(config.command+' '+response[config.param], (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
    			});
		}
	});

