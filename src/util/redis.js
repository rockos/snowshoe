var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
        console.log("error event - " + client.host + ":" + client.port + " - " + err);
    });

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
        if (err) {
            return console.error("error response - " + err);
        }

        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
                console.log("    " + i + ": " + reply);
            });
    });

client.hget( "hash key", "hashtest 2", 
function(err,data) {
        console.log( data );
    });

client.quit(function (err, res) {
        console.log("Exiting from quit command.");
    });

/*

Reply: OK
Reply: 1
Reply: 1
2 replies:
    0: hashtest 1
    1: hashtest 2
Exiting from quit command.


 */