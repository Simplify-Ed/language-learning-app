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
          image: "Assets/bye-bye.png",
          sentences: [
            {
              sentence: "สวัสดีครับทุกคน",
              pronunciation: "sa-wat-dee khrap tuk-kon",
              translation: "Hello everyone"
            },
            {
              sentence: "สวัสดีครับ",
              pronunciation: "sa-wat-dee khrap",
              translation: "Hello (formal)"
            },
            {
              sentence: "สวัสดีค่ะ",
              pronunciation: "sa-wat-dee ka",
              translation: "Hello (female speaker)"
            }
          ],
          quizOptions: ["Hello", "Goodbye", "Thank you"],
          correctAnswer: "Hello"
        },
        {
          word: "ขอบคุณ",
          pronunciation: "khob-khun",
          meaning: "Thank you",
          sentences: [
            {
              sentence: "ขอบคุณสำหรับของขวัญ",
              pronunciation: "khob-khun sam-rap khong-kwan",
              translation: "Thank you for the gift"
            },
            {
              sentence: "ขอบคุณครับ",
              pronunciation: "khob-khun khrap",
              translation: "Thank you (formal)"
            },
            {
              sentence: "ขอบคุณมาก",
              pronunciation: "khob-khun mak",
              translation: "Thank you very much"
            }
          ],
          quizOptions: ["Sorry", "Thank you", "Hello"],
          correctAnswer: "Thank you"
        },
        {
          word: "ไป",
          pronunciation: "bpai",
          meaning: "Go",
          sentences: [/* ... */]
        },
        {
          word: "มา",
          pronunciation: "maa",
          meaning: "Come",
          sentences: [/* ... */]
        }
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
    case "practice-stage":
      loadPracticePage(token);
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
      <img src="${token.image}" alt="${token.meaning} graphic" class="token-image">        <h2>${token.word}</h2>
        <p>${token.pronunciation}</p>
        <p>${token.meaning}</p>
      </div>
      <div class="sentence-entry">
      <h3>${token.sentences[0].sentence}</h3>   <!-- First sentence -->
      <p>${token.sentences[0].pronunciation}</p> <!-- First sentence pronunciation -->
      <p>${token.sentences[0].translation}</p>    <!-- First sentence translation -->
    </div>
    `;
    showScreen("introduction-stage");
  }
  
  

// Show usage example page
function loadPracticePage(token) {
    const practiceContainer = document.getElementById("practice-sentences");
  
    // Create HTML for each sentence in the `sentences` array
    const sentencesHtml = token.sentences.map(sentence => `
      <div class="practice-box">
        <h3>${sentence.sentence}</h3>
        <p>${sentence.pronunciation}</p>
        <p>${sentence.translation}</p>
      </div>
    `).join('');
  
    // Set the inner HTML of the practice container
    practiceContainer.innerHTML = sentencesHtml;
    showScreen("practice-stage");
  }
  
  

// Show quiz page
function loadQuizPage(token) {
    const quizContainer = document.getElementById("quiz-options");
  
    // Display the English meaning at the top of the page
    document.getElementById("quiz-word").innerHTML = `
      <h2>${token.meaning}</h2>
      <p>Guess the correct Thai word:</p>
    `;
  
    // Prepare answer choices (one correct answer and three incorrect options)
    const correctAnswer = { word: token.word, pronunciation: token.pronunciation };
    const otherOptions = levels
      .flatMap(level => level.tokens)
      .filter(t => t.word !== correctAnswer.word) // Exclude the correct answer
      .map(t => ({ word: t.word, pronunciation: t.pronunciation }));
    
    // Randomly select three incorrect answers
    const incorrectAnswers = otherOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  
    // Combine the correct and incorrect answers, then shuffle them
    const allOptions = [...incorrectAnswers, correctAnswer]
      .sort(() => 0.5 - Math.random());
  
    // Create the quiz options as buttons with Thai word and pronunciation
    quizContainer.innerHTML = allOptions.map(option => `
      <button onclick="handleQuizAnswer('${option.word}', '${correctAnswer.word}')" class="quiz-card">
        <h3>${option.word}</h3>
        <p>${option.pronunciation}</p>
      </button>
    `).join("");
  
    // Show the quiz screen
    showScreen("quiz-stage");
  }
  

// Handle quiz answer
function handleQuizAnswer(selectedWord, correctWord) {
    if (selectedWord === correctWord) {
      alert("Correct! Great job!");
      nextStage();
    } else {
      alert("Incorrect. Try again!");
    }
  }
  

// Move to the next stage or token
function nextStage() {
    if (currentStage === 'practice-stage') {
      currentStage = 'quiz-stage';
    } else if (currentStage === 'introduction-stage') {
      currentStage = 'practice-stage';
    } else if (currentStage === 'quiz-stage') {
      currentStage = 'conversation-stage';
    }
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
