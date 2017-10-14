const restify = require('restify');
const server = restify.createServer();
const handlers = require('./handlers');

run = (options) => {
    server.use(restify.plugins.bodyParser({
        mapParams: true
    }));
        
        
    server.post('/chatbot/pullrequests', handlers.github.post);
    server.post('/chatbot/messages', handlers.message.connector.listen());
    
    const bot = new handlers.message.builder.UniversalBot(handlers.message.connector, (session)=> {
        session.send("You said %s", session.message.text);
    });
    
    server.listen(process.env.port || process.env.PORT || 8008, ()=> {
        console.log("%s listening to %s", server.name, server.url);
    });
}

module.exports.run = run;