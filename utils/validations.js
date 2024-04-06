
const validateText = (input) => {
    if (input.length < 1) {
        return "Please input 1 or more characters"
    }
    return true;
};

const validateNum = (input) => {
    if (!(input % 1 == 0)) {
        return "Please enter a number";
    }
    return true;
};

module.exports = {
validateText,
validateNum
}