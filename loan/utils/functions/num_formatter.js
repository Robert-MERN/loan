const formatter = (num) => {
    return Number(num.replace(/,/g, '')).toLocaleString();
}

export default formatter;