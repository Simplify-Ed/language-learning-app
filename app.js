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
              sentence: "Hello",
              pronunciation: "sa-wat-dee ",
              translation: "สวัสดี"
            },
            {
              sentence: "Hello, how are you?",
              pronunciation: "sa-wat-dee, khun sabai dee mai?",
              translation: "สวัสดีคุณสบายดีไหม?"
            },
            {
              sentence: "Hello, nice to meet you.",
              pronunciation: "sa-wat-dee yin-dee tee dai ruu-jak",
              translation: "สวัสดียินดีที่ได้รู้จัก"
            }
          ],
          quizOptions: ["Hello", "Goodbye", "Thank you"],
          correctAnswer: "Hello"
        },
        {
          word: "คุณสบายดีไหม?",
          pronunciation: "khun sabai dee mai?",
          meaning: "How are you?",
          sentences: [
            {
              sentence: "How are you today?",
              pronunciation: "khun sabai dee mai wan nee?",
              translation: "คุณสบายดีไหมวันนี้?"
            },
            {
              sentence: "I just wanted to ask, how are you?",
              pronunciation: "phom kae ma tham khun sabai dee mai?",
              translation: "ผมแค่มาถามคุณสบายดีไหม?"
            },
            {
              sentence: "How are you, my friend?",
              pronunciation: "khun sabai dee mai phuean rak?",
              translation: "คุณสบายดีไหมเพื่อนรัก?"
            }
          ],
          quizOptions: ["How are you?", "What’s your name?", "Good morning"],
          correctAnswer: "How are you?"
        },
        {
          word: "สบายดี",
          pronunciation: "sabai dee",
          meaning: "I'm fine",
          sentences: [
            {
              sentence: "I'm fine, thank you.",
              pronunciation: "sabai dee, khop khun khrap/ka",
              translation: "สบายดีขอบคุณครับ/ค่ะ"
            },
            {
              sentence: "I'm fine, and you?",
              pronunciation: "sabai dee laew khun la?",
              translation: "สบายดีแล้วคุณล่ะ?"
            },
            {
              sentence: "I’m fine after resting.",
              pronunciation: "sabai dee lang phak phawn",
              translation: "สบายดีหลังพักผ่อน"
            }
          ],
          quizOptions: ["I'm fine", "Thank you", "See you later"],
          correctAnswer: "I'm fine"
        },
        {
          word: "แล้วคุณล่ะ?",
          pronunciation: "laew khun la?",
          meaning: "And you?",
          sentences: [
            {
              sentence: "I'm fine, and you?",
              pronunciation: "sabai dee laew khun la?",
              translation: "สบายดีแล้วคุณล่ะ?"
            },
            {
              sentence: "And you, how was your day?",
              pronunciation: "laew khun la wan nee pen yang ngai?",
              translation: "แล้วคุณล่ะวันนี้เป็นยังไง?"
            },
            {
              sentence: "Nice to meet you, and you?",
              pronunciation: "yin-dee tee dai ruu-jak laew khun la?",
              translation: "ยินดีที่ได้รู้จักแล้วคุณล่ะ?"
            }
          ],
          quizOptions: ["And you?", "Thank you", "Goodbye"],
          correctAnswer: "And you?"
        }
      ],
      // Define the conversation as references to tokens and their sentences
conversation: [
    { tokenIndex: 0, sentenceIndex: 0, speaker: "p1" }, // "Hello"
    { tokenIndex: 0, sentenceIndex: 0, speaker: "p2" }, // "Hello"
    { tokenIndex: 1, sentenceIndex: 0, speaker: "p1" }, // "How are you?"
    { tokenIndex: 2, sentenceIndex: 1, speaker: "p1" }, // "I'm fine, and you?"
    { tokenIndex: 2, sentenceIndex: 0, speaker: "p2" }  // "I'm fine, thank you."
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
      <h3>${token.sentences[0].translation}</h3>   <!-- First sentence -->
      <p>${token.sentences[0].pronunciation}</p> <!-- First sentence pronunciation -->
      <p>${token.sentences[0].sentence}</p>    <!-- First sentence translation -->
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
        <h3>${sentence.translation}</h3>
        <p>${sentence.pronunciation}</p>
        <p>${sentence.sentence}</p>
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
    if (currentStage === 'introduction-stage') {
      currentStage = 'practice-stage';
    } else if (currentStage === 'practice-stage') {
      currentStage = 'quiz-stage';
    } else if (currentStage === 'quiz-stage') {
      // If we have more tokens, go to the introduction of the next token
      if (currentTokenIndex < currentLevel.tokens.length - 1) {
        currentTokenIndex++;
        currentStage = 'introduction-stage';
      } else {
        // If all tokens are completed, go to the conversation stage
        currentStage = 'conversation-stage';
      }
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
  
    // Generate HTML for each conversation bubble by referencing tokens and sentences
    conversationContainer.innerHTML = currentLevel.conversation.map(line => {
      const token = currentLevel.tokens[line.tokenIndex];
      const sentence = token.sentences[line.sentenceIndex];
      return `
        <div class="chat-bubble ${line.speaker}">
          <p class="translation">${sentence.translation}</p>
          <p class="pronunciation">${sentence.pronunciation}</p>
          <p class="text">${sentence.sentence}</p>
        </div>
      `;
    }).join('');
  
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
