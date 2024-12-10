function monthlySavings(payments, cost) {
    if (!Array.isArray(payments) || Number.isNaN(cost)) {
        return "invalid input";
    }
    let totalIncome = 0;
    for (let i = 0; i < payments.length; i++) {
        if (payments[i] >= 3000) {
            totalIncome += payments[i] * 0.8;
        }
        else {
            totalIncome += payments[i]
        }
    }
    let savings = totalIncome - cost;
    if (savings < 0) {
        return "earn more";
    }
    return savings;
}

let test1 = monthlySavings([1000, 2000, 3000], 5400);
let test2 = monthlySavings([1000, 2000, 2500], 5000);
let test3 = monthlySavings([900, 2700, 3400], 10000);
let test4 = monthlySavings(100, [900, 2700, 3400]);

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
