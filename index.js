
// DIGIT = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

// INTEGER = DIGIT //{ DIGIT }

// EXPR = ADD | MULTIPLY | DIGIT

// ADD = "(" + "a" + "d" + "d" + " " + EXPR + " " + EXPR + ")"

// MULTIPLY = "(", "m", "u", "l", "t", "i", "p", "l", "y", " ", EXPR, " ", EXPR, ")"

document.querySelectorAll("button")[0].addEventListener("click", () => {
    const input = document.querySelector("input").value
    if (input === "") return

    ParseInput(input)

})

const Calculate = (expr) => {
    const exprArr = expr.split(" ")

    const type = exprArr[0]

    let amt = 0

    if (type.includes('add')) amt = 0
    else amt = 1

    for (let index = 1; index < exprArr.length; index++) {
        switch (type) {
            case 'add':
                amt += parseInt(exprArr[index])
                break;
            case 'multiply':
                amt *= parseInt(exprArr[index])
                break;
            default:
                break;
        }
        // console.log(amt)
    }
    // console.log('amt', amt)
    return amt
}

const ParseInput = (uinput) => {
    let ucopy = uinput
    while (ucopy.includes('(') || ucopy.includes(')')) {

        //find index for valid add expression
        let index = ucopy.search(/(add \d{1,} \d{1,})/)

        //returns -1 is valid add cant be found
        if (index == -1) {
            //find index for valid multiply expression
            index = ucopy.search(/(multiply \d{1,} \d{1,})/)
        }

        //find index for closing expression
        const endIndex = ucopy.indexOf(')', index)

        //get expression without brackets
        const str = ucopy.slice(index, endIndex)
        console.log('str', str)

        //calculate the expression
        const answer = Calculate(str)

        //get expression with brackets
        const search = ucopy.slice(index - 1, endIndex + 1)
        console.log('search', search)

        //replace found expression with calculated answer
        ucopy = ucopy.replace(search, answer)
        console.log('fin', ucopy)
    }

    document.querySelectorAll("h2")[0].textContent = 'Output: ' + ucopy
}