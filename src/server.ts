let http = require('http');
const proccess = require('./main');

http.createServer(function (req:any, res:any) {
    if(req.method === 'POST' && req.url == '/identify'){
        let json = '';
        req.on('data',(chunk: any )=>{
            json+=chunk;
        })
        req.on('end',async()=>{
            let clientObj:{email?:string,phoneNumber?:number} = JSON.parse(json);
            let p = new proccess.Proccess(clientObj.email,clientObj.phoneNumber)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(await p.startProcessing()));
        })
    }else{
        res.writeHead(404)
        res.end('Not Found');
    }
}).listen(8080);