const isEven = require("./isEven");
const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

let result;

if (operation === "add") {
    result = num1 + num2;
}
else if (operation === "subtract") {
    result = num1 - num2;
}
else if (operation === "multiply") {
    result = num1 * num2;
}
else if (operation === "divide") {

    if (num2 === 0) {
        console.log("Cannot divide by zero");
    }
    else {
        result = num1 / num2;
        console.log("Result:", result);
    }

}
else {
    console.log("Invalid operation");
}

// Display result for add, subtract and multiply
if (
    operation === "add" ||
    operation === "subtract" ||
    operation === "multiply"
) {
    console.log("Result:", result);
}
console.log("Is 10 even?", isEven(10));
console.log("Is 7 even?", isEven(7));

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Smart Utility Toolkit");
    }

    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is the About Page");
    }

    else if (req.url === "/contact") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is the Contact Page");
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

const fileName = "data.txt";
fs.writeFile(fileName, "This is my Smart Utility Toolkit file.", (err) => {

    if (err) {
        console.log("Error creating file:", err);
        return;
    }

    console.log("1. File created successfully.");

    // READ
    fs.readFile(fileName, "utf8", (err, data) => {

        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        console.log("2. File content:", data);

        // UPDATE
        fs.appendFile(
            fileName,
            "\nThis line was added during update.",
            (err) => {

                if (err) {
                    console.log("Error updating file:", err);
                    return;
                }

                console.log("3. File updated successfully.");

                // READ AGAIN
                fs.readFile(fileName, "utf8", (err, updatedData) => {

                    if (err) {
                        console.log("Error reading updated file:", err);
                        return;
                    }

                    console.log("Updated content:", updatedData);

                    // DELETE
                    fs.unlink(fileName, (err) => {

                        if (err) {
                            console.log("Error deleting file:", err);
                            return;
                        }

                        console.log("4. File deleted successfully.");
                    });

                });

            }
        );

    });

});

function rollDice() {

    const randomNumber = crypto.randomInt(1, 7);

    console.log("Dice Rolled:", randomNumber);
}

for (let i = 1; i <= 5; i++) {
    rollDice();
}