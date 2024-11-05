// app.js

// Track the current stage
let currentStage = "level-navigation";

// Sample level data
const levels = [
    {
      id: 1,
      tokens: [
        {
          word: "สวัสดี",
          pronunciation: "sa-wat-dee",
          meaning: "Hello",
          usage: "สวัสดีครับทุกคน (Hello everyone)",
          quizOptions: ["Hello", "Goodbye", "Thank you"],
          correctAnswer: "Hello"
        },
        {
          word: "ขอบคุณ",
          pronunciation: "khob-khun",
          meaning: "Thank you",
          usage: "ขอบคุณมาก (Thank you very much)",
          quizOptions: ["Sorry", "Thank you", "Hello"],
          correctAnswer: "Thank you"
        }
      ],
      conversation: [
        "สวัสดีครับ", // Hello
        "ขอบคุณครับ" // Thank you
      ]
    }
  ];

// Initialize the app
function init() {
  showScreen("level-navigation");
  loadLevels();
}

// Load level buttons dynamically
function loadLevels() {
  const levelsContainer = document.getElementById("levels");
  levelsContainer.innerHTML = levels.map(
    (level) => `<button onclick="startLevel(${level.id})">Level ${level.id}</button>`
  ).join("");
}

// Start a level
function startLevel(levelId) {
  const level = levels.find((lvl) => lvl.id === levelId);
  if (!level) return; // Exit if level not found
  currentLevel = level;
  currentTokenIndex = 0;
  currentStage = "introduction-stage";
  loadCurrentStage();
}

// Load the current stage based on `currentStage` and `currentTokenIndex`
function loadCurrentStage() {
  const token = currentLevel.tokens[currentTokenIndex];
  switch (currentStage) {
    case "introduction-stage":
      loadIntroductionPage(token);
      break;
    case "usage-stage":
      loadUsagePage(token);
      break;
    case "quiz-stage":
      loadQuizPage(token);
      break;
    case "conversation-stage":
      loadConversationPage();
      break;
  }
}

// Show introduction page
function loadIntroductionPage(token) {
    document.getElementById("word-list").innerHTML = `
      <div class="word-entry">
        <h2>${token.word}</h2>
        <p><strong>Pronunciation:</strong> ${token.pronunciation}</p>
        <p><strong>Meaning:</strong> ${token.meaning}</p>
      </div>
    `;
    showScreen("introduction-stage");
  }

// Show usage example page
function loadUsagePage(token) {
  document.getElementById("usage-example").innerText = token.usage;
  showScreen("usage-stage");
}

// Show quiz page
function loadQuizPage(token) {
  const quizContainer = document.getElementById("quiz-options");
  quizContainer.innerHTML = token.quizOptions.map(
    (option) => `<button onclick="handleQuizAnswer('${option}', '${token.correctAnswer}')">${option}</button>`
  ).join("");
  showScreen("quiz-stage");
}

// Handle quiz answer
function handleQuizAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct!");
    nextTokenOrConversation();
  } else {
    alert("Incorrect. Try again!");
  }
}

// Move to the next stage or token
function nextStage(next) {
  if (next === 'usage-stage') currentStage = 'usage-stage';
  else if (next === 'quiz-stage') currentStage = 'quiz-stage';
  loadCurrentStage();
}

// Proceed to the next token or conversation stage
function nextTokenOrConversation() {
  currentTokenIndex++;
  if (currentTokenIndex < currentLevel.tokens.length) {
    currentStage = "introduction-stage";
    loadCurrentStage();
  } else {
    currentStage = "conversation-stage";
    loadCurrentStage();
  }
}

// Show conversation page
function loadConversationPage() {
  const conversationContainer = document.getElementById("conversation");
  conversationContainer.innerHTML = currentLevel.conversation
    .map((phrase, index) => `<p>${phrase}</p>`)
    .join("");
  showScreen("conversation-stage");
}

// Show the appropriate screen
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

// Return to level navigation
function returnToLevelNav() {
  showScreen("level-navigation");
}

// Initialize the app on load
init();
