console.log("starting...", new Date());

console.log("AWS_REGION", process.env.AWS_REGION)

var max_messages = 100000

for (var i = 0; i < max_messages; i++){
    console.log("\"[l]\" ", i);
}

setTimeout(() => {

    for (var i = 0; i < max_messages; i++){
        console.log("[f] ", i);
    }

    console.log("finishing...", new Date());
}, 2000);


// throw new Error("unexpected");
