function reverseString(str: string) {
    return str.split("").reverse().join("");
}

process.stdin.setEncoding('utf-8');

process.stdin.on("data", (str: string) => {
    process.stdout.write(reverseString(str.toString()) + "\n\n");
});
