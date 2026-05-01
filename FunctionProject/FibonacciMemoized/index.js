module.exports = async function (context, req) {
    const nthRaw = (req.body && req.body.nth !== undefined) ? req.body.nth : (req.query ? req.query.nth : undefined);
    const nth = Number(nthRaw);

    if (!Number.isInteger(nth) || nth < 0) {
        context.res = {
            status: 400,
            body: "Use un parametro valido: nth (entero mayor o igual a 0)."
        };
        return;
    }

    const memo = {};

    function fib(n) {
        if (n in memo) {
            return memo[n];
        }

        if (n <= 1) {
            memo[n] = n;
            return n;
        }

        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
    }

    context.res = {
        body: fib(nth).toString()
    };
};