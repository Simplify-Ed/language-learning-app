// app.js
document.getElementById("submit").addEventListener("click", function() {
    const userResponse = document.getElementById("response").value.toLowerCase();
    const feedback = document.getElementById("feedback");

    if (userResponse === "i'm good" || userResponse === "i'm fine") {
        feedback.textContent = "Great! Keep going!";
    } else {
        feedback.textContent = "Try saying something like 'I'm good' or 'I'm fine'.";
    }

    // Clear the input after submission
    document.getElementById("response").value = "";
});
