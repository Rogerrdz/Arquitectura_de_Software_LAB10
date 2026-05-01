var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const nthRaw = (req.body && req.body.nth !== undefined) ? req.body.nth : (req.query ? req.query.nth : undefined);
    const nth = Number(nthRaw);

    if (!Number.isInteger(nth) || nth < 0) {
        context.res = {
            status: 400,
            body: "Use un parametro valido: nth (entero mayor o igual a 0)."
        };
        return;
    }

    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        for (var i = 0; i < nth - 1; i++) {
            answer = nth_2.add(nth_1)
            nth_2 = nth_1
            nth_1 = answer
        }
    }

    context.res = {
        body: answer.toString()
    };
}