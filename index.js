/*
const {sayHello, calculateVat} = require('./utils');
sayHello();
const vat = calculateVat(100, 7);
console.log(vat);
console.log(__filename, __dirname);

//path 
const path = require('path');
console.log(path.basename(__filename)); //return ชื่อไฟล์
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log(path.join(__dirname, 'utils.js'));

function checkCompleate(){
    console.log("check pass");
}

//file system
const fs = require('fs');
/* fs.writeFileSync(path.join(__dirname, 'data.txt'), 'hello');*/
// fs.writeFile(path.join(__dirname, 'data.txt'), 'hello', checkCompleate);

/*
fs.writeFile(path.join(__dirname, 'data1.txt'), 'hello', () => {
    console.log("finished writing file");
});
*/
/*

console.log(fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8'));

//os
const os = require('os');
console.log(os.cpus());
console.log(os.homedir());
console.log(os.uptime());

//event 
const events = require('events'); // ไว้ทำ realtime chatbot
const EventEmitter = events.EventEmitter;
const connect = new EventEmitter();
connect.on('online', () => {
    console.log('A new user has connected');
});
connect.emit('online');
connect.emit('online');
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
function getPage(page){
    const filePath = path.join(__dirname, page);
    return fs.readFileSync(filePath);
}

function handleFiles(req, res){
    const fileType = path.extname(req.url) || '.html';
    if(fileType === '.html'){
        res.setHeader('Content-type', 'text/html');
        res.writeHead(200);
        if(req.url === '/'){
            res.write(getPage('index.html'));
        }else{
            res.write(getPage(`${req.url}.html`));
        }
        res.end();
    }else if(fileType === '.css'){
        res.setHeader('Content-type', 'text/css');
        res.writeHead(200);
        res.write(getPage(req.url));
        res.end();
    }
    else{
        res.writeHead(200);
        res.end();
    }
}

function getData(url){
    let data;
    if(url === '/apis/users'){
        data = [
            {
                name : 'suttipong'
            },
            {
                name : 'pear'
            },            
        ];
    }else if (url === '/apis/posts'){
        data = [
            {
                title : 'A',
                publishDate : moment().startOf('day').fromNow()
            },{
                title : 'B',
                publishDate : moment().set('month', 1).startOf('day').fromNow()
            }
        ];
    }
    return data;
}

function handleAPIs(req, res){
    let data = getData(req.url);
    if(data){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.write(JSON.stringify(data));
    }else{
        res.writeHead(404);
    }
    res.end();
}

http.createServer((req, res) => {
    if(req.url.startsWith('/apis/')){
        handleAPIs(req, res);
    }   
    else{
        handleFiles(req, res);
    }
}).listen('3000');
