var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var mime = require('./mime').types;
var mydata = [];
var post = '';
var RELATIVEPATH = 'assets';

http.createServer(function (request, response) {
  post = '';
  var pathname = url.parse(request.url).pathname;
  if (pathname === '/' ) pathname = '/index.html';
  var ext = path.extname(pathname);
  ext = ext ? ext.substr(1) : 'unknown';
  request.on('data', function (chunk) { post += chunk;});
  fs.readFile(pathname.toString(), function(err,data) {
    response.writeHead(200, {'Content-Type': mime[ext]});
            response.write(data);
            response.end();
        });
  else if (request.method==="POST") request.on('end', function() {getPost(request, response);});

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');


function getSignUp(queryObject, response) {
  var len = mydata.length;
  for (var i = 0; i < len; i++)
    if (queryObject['username'] === mydata[i]['username']) break;
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE html>"+
     "<html lang=\"en\">"+
     "<head>"+
     "<meta charset=\"UTF-8\">"+
     "<title>注册成功</title>"+
     "<style type=\"text/css\">"+
     "div p, h2, #backdiv {"+
     "text-align: center;"+
     "}"+
     "body {"+
     " font-family: \"Century Gothic\";"+
     "}"+
     "</style>"+
     "</head>"+
     "<body>"+
     "<h2>用户详情</h2>"+
      "<div><p>姓名："+ mydata[i]['username'] +"</p></div><br />"+
      "<div><p>学号："+ mydata[i]['studentid'] +"</p></div><br />"+
      "<div><p>电话："+ mydata[i]['phone'] +"</p></div><br />"+
      "<div><p>邮箱："+ mydata[i]['email'] +"</p></div><br />"+
      "<div id='backdiv'>"+
      "<input id=\'back\' type='button' value=\"返回\" onclick=\"location.href=\'http://localhost:8000/\'\"/>"+
      "</div>"+
    "</body>"+
    "</html>"
    );
  response.end();
}







