console.log("starting...", new Date());

console.log("AWS_REGION", process.env.AWS_REGION)

console.log("finishing...", new Date());

throw new Error("unexpected");
