console.log("starting...", new Date());

console.log("AWS_REGION", process.env.AWS_REGION)

for (var i = 0; i < 1000000; i++){
    console.log("logging ", i);
}

console.log("finishing...", new Date());

// throw new Error("unexpected");
