var Socket = require('./phoenix').Socket

var socket = new Socket("/socket", {params: {token: "downloadEventEmitter2016" }})
socket.connect()

// Now that you are connected, you can join channels with a topic:
var channel = socket.channel("departures:main", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })
