/**
 * Created by tyr on 24.04.2015.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({host: 'localhost',user: 'root', password: 'amanisson24'});
connection.connect();
connection.query('use site');

connection.query('select * from users;', function(error, fields, result){
        if (error){throw errors;}
    }
);

var http=require('http');
var fs =require('fs');
var url = require("url");

function render(html, params){
    for (p in params){
        var r = '${'+p+'}';
        html.replace(r, params[p]);
    }
}


function FileRead(request, responce) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    responce.writeHead(200, {'Content-Type': 'text/html'});
    var POST = {};


    if (request.method == 'POST') {
        request.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            connection.query('insert into users values(user, password)');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        })
    }

    if (request.method == 'GET') {
        request.on('data', function(data) {
            data = data.split('&');
            connection.query('select * from users');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        })
    }

    if(pathname=="/")
    {
        console.log("Got "+ pathname);
        fs.readFile("index.html", function (err, contest)
        {
            responce.end(contest)
            //contest = render(contest, {'time': new Date()})
        })
    }
    else
    {
        sub = pathname.substring(1, pathname.length);
        fs.readFile(sub, function  (err, contest) {
            if(err) {
                responce.write(
                    "<head><title>Page not found</title><style>" +"img{height:400px;width:400px;}</style>" +
                    "<body><div align='center'><img src=image/10.jpg>"+
                    "<h1 align='center'>404 - Page not found :(</h1></div></body></head>"
                );
                responce.end(contest)
            }
            responce.end(contest);
        })
    }


}
var server =http.createServer(FileRead).listen(8000);
console.log('server started');