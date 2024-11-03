// app.js
const tokens = [
    {
        english: "Hello",
        foreign: "Hola",
        context: "Simple Greetings",
        hint: "A common greeting",
        pronunciation: "oh-lah",
        responses: [
            {
                userInput: "Hola",
                nextToken: 1 // Move to the next token in the sequence
            }
        ]
    },
    {
        english: "How much is this?",
        foreign: "¿Cuánto cuesta esto?",
        context: "Money",
        hint: "Asking about price",
        pronunciation: "kwan-to kwes-ta es-to",
        responses: [
            {
                userInput: "¿Cuánto cuesta esto?",
                nextToken: null // End of the conversation path for this topic
            }
        ]
    }
    // Add more tokens as needed
];

// app.js
let currentTokenIndex = 0;

function displayToken() {
    const token = tokens[currentTokenIndex];
    document.getElementById("english-text").textContent = token.english;
    document.getElementById("context-name").textContent = token.context;
    document.getElementById("hint-text").textContent = token.hint;
    document.getElementById("pronunciation-text").textContent = token.pronunciation;
}

function checkResponse() {
    const userResponse = document.getElementById("user-input").value.trim().toLowerCase();
    const token = tokens[currentTokenIndex];
    const feedback = document.getElementById("feedback");

    // Find if there’s a matching response in the token's responses array
    const responseMatch = token.responses.find(r => r.userInput.toLowerCase() === userResponse);

    if (responseMatch) {
        feedback.textContent = "Correct!";
        // Move to the next token in the sequence
        if (responseMatch.nextToken !== null) {
            currentTokenIndex = responseMatch.nextToken;
            displayToken();
            document.getElementById("user-input").value = ""; // Clear input
        } else {
            feedback.textContent = "You've completed this conversation!";
        }
    } else {
        feedback.textContent = "Try again! Hint: " + token.hint;
    }
}

document.getElementById("check-answer").addEventListener("click", checkResponse);

// Initialize the first token display
displayToken();

