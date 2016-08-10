var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , io = require("socket.io")({
      "transports": ["websocket", "flashsocket", "htmlfile", "xhr-polling", "jsonp-polling"]

  });

var server = http.createServer(function(req, res){
    var filename = path.join(process.cwd(), req.url);

    fs.exists(filename, function(exists) {
      if(!exists) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
        return;
      }

      fs.readFile('./index.html', encoding='utf-8', function(err, data){
        if(err) {
          res.writeHead(500, {"Content-type":"text/plain"});
          res.write(err + "\n");
          res.end();
          return;
        }
        res.writeHead(200, {
          "Content-Type":"text/html; charset=utf-8"
        });
        res.end(data);
      });
    });
});

server.listen(3000);

io = io.listen(server);
io.sockets.on("connection", function(socket){
  console.log("connected");

  socket.on("disconnect", function(){
    console.log("Good-bye");
  });

  socket.on("message", function(msg){
    console.log(msg);
    socket.send('서버 쪽 메세지 테스트');
  });
});

console.log("서버가 시작됐습니다. http://localhost:3000");
