
const prompt = require('prompt');
const bigInt = require("big-integer");

prompt.start();

const operators = {
    "+": { "name": "Addition", "op": (b1, b2) => b1.add(b2) },
    "-": { "name": "Subtraction", "op": (b1, b2) => b1.minus(b2) },
    "/": { "name": "Division", "op": (b1, b2) => b1.divide(b2) },
    "*": { "name": "Multiplication", "op": (b1, b2) => b1.multiply(b2) },
    "^": { "name": "Pow", "op": (b1, b2) => b1.pow(b2) },
    "%": { "name": "Modulo", "op": (b1, b2) => b1.mod(b2) },
    "^%": { "name": "ModPow", "op": (b1, b2) => b1.modPow(b2) }
}

const operatorsSymbols = Object.keys(operators) 

async function main() {
    console.log("BigInt calculator")
    console.log("Insert 'quit' as operator to exit")
    console.log("Insert 'last' as operand to use the result of the last operation")
    console.log("Available operators:")
    operatorsSymbols.forEach(element => {
        console.log(element + "\t:: " + operators[element]["name"]);
    });
    let lastOperator = null
    let lastResult = null
    do {
        let input = await prompt.get(['operand1', 'operand2', 'operator']);
        lastOperator = input.operator
        if (operatorsSymbols.includes(lastOperator)) {
            try {
                let op1 = null
                let op2 = null
                if (input.operand1 === "last" && lastResult != null) {
                    op1 = lastResult
                } else {
                    op1 = bigInt(input.operand1)
                }
                if (input.operand2 === "last" && lastResult != null) {
                    op2 = lastResult
                } else {
                    op2 = bigInt(input.operand2)
                }
                let func = operators[lastOperator]["op"]
                lastResult = func(op1, op2)
                console.log("Result: " + lastResult)
            } catch (err) {
                console.log(err)
                console.log("One of your operands is not a valid number!")
            }
        } else if (lastOperator === "quit") {
            console.log("Good bye!")
        } else {
            console.log("Invalid operator")
        }
    } while (lastOperator != "quit")    
}

main()
