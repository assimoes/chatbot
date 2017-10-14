const config = require('../config')
const redis = require('redis');
const cli = redis.createClient();


function Redis() {
    
    this.Set = (key, value) => {
        if (typeof value === Object) {
            let _value = JSON.stringify(value);
            cli.set(key, _value);
        }
    }

    this.Get = (key, cb) => {
        cli.get(key, (err, reply)=>{
            if (!err){
                let _value = JSON.parse(reply);
                return _value;
            } else {
                return err;
            }

        });
    }
}


module.exports = Redis;