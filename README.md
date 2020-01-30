
# laravel-echo-client

This is a simple NodeJS client meant to be used with [Laravel Echo Server](https://github.com/tlaverdure/laravel-echo-server). You also have the option of running a command using the broadcasted event name as an argument.

This client was developed and tested on [Ubuntu 18.04](http://ubuntu.com) using [NodeJS 12.14.1 LTS](https://nodejs.org/en/) and makes use of the [laravel-echo](https://github.com/laravel/echo) and [socket.io](https://github.com/socketio/socket.io) Javascript libraries.

## How do I run it?

On Ubuntu, first download the dependencies:

```
npm install
```

Now, create a JSON config file using the following format:

```
{
  "host": "[host]",
  "tls": "[true|false]",
  "channel": "[channel]",
  "event": "[event]",
  "command": "[command]",
  "param": "[param]"
}
```

The variable `[host]` is the hostname of the server where Laravel Echo Server is running. The `[tls]` variable should usually be set to `true`, unless you're testing on a local server. The variables `[channel]` and `[event]` correspond to the public channel that you subscribe to and event that you wish to listen for. The `[command]` and `[param]` variables are optional and specifies the path to a script or program that you'd like to run on event broadcast. The param is the event's parameter that you wish to pass to the command. 

For example, if the event broadcast includes the keys 'name' and 'datetime', and you wish to pass the 'name' key to the command '/path/to/some/script', you should specify the following:

```
  "command": "/path/to/some/script",
  "param": "name"
```

Please note that if you include the `command` key in your config file, you must also include `param` key.

Once you have your config file ready, you can run the client using the following command:

```
$ node echo_client.js config.json
```

Provided that you're able to connect to the Laravel Echo Server, you should start to see events broadcasted.

You can either run the above as a daemon using something like [supervisord](http://supervisord.org/) or [forever](https://www.npmjs.com/package/forever), but I will leave the setup of that as an excercise for the user.

## Author

+	[jbuitt at gmail.com](mailto:jbuitt@gmail.com)

## License

See [LICENSE](https://github.com/jbuitt/laravel-echo-client/blob/master/LICENSE) file.

