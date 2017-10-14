const restify = require('restify');
const server = restify.createServer();
const handlers = require('./handlers');
const Redis = require('./redis');
const _redis = new Redis();

run = (options) => {
    server.use(restify.plugins.bodyParser({
        mapParams: true
    }));
        
        
    server.post('/chatbot/pullrequests', handlers.github.post);
    server.post('/chatbot/messages', handlers.message.connector.listen());
    
    const bot = new handlers.message.builder.UniversalBot(handlers.message.connector, (session)=> {
        let _data = JSON.parse(session.message.text);
        let opts = {
            expire : 60 * 10
        }
        _redis.Set(_data.key, _data, opts);
        session.send("You said %s",JSON.parse(session.message.text)).value;
    });
    
    server.listen(process.env.port || process.env.PORT || 8008, ()=> {
        console.log("%s listening to %s", server.name, server.url);
    });
}

module.exports.run = run;