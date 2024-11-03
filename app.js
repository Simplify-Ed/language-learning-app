// app.js

const levels = [
    {
      id: 1,
      words: [
        { word: "สวัสดี", meaning: "Hello", pronunciation: "sa-wat-dee", usage: "สวัสดีครับ/ค่ะ (Hello, formal)" },
        { word: "ขอบคุณ", meaning: "Thank you", pronunciation: "khob-khun", usage: "ขอบคุณมาก (Thank you very much)" }
      ],
      conversation: [
        { phrase: "สวัสดีครับ", meaning: "Hello", blank: false },
        { phrase: "ขอบคุณครับ", meaning: "Thank you", blank: true }
      ]
    }
  ];
  
  let currentLevel = 0;
  let currentStage = 'level-navigation';
  
  function init() {
    showScreen('level-navigation');
    loadLevels();
  }
  
  function loadLevels() {
    const levelsContainer = document.getElementById('levels');
    levelsContainer.innerHTML = levels.map(level => `
      <button onclick="startLevel(${level.id})">Level ${level.id}</button>
    `).join("");
  }
  
  function startLevel(levelId) {
    currentLevel = levels.find(level => level.id === levelId);
    showScreen('introduction-stage');
    loadIntroductionStage();
  }
  
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  }
  
  function loadIntroductionStage() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = currentLevel.words.map(word => `
      <div class="word-entry">
        <h3>${word.word}</h3>
        <p><strong>Meaning:</strong> ${word.meaning}</p>
        <p><strong>Pronunciation:</strong> ${word.pronunciation}</p>
        <p><strong>Usage:</strong> ${word.usage}</p>
      </div>
    `).join("");
  }
  
  function nextStage(stage) {
    switch (stage) {
      case 'usage-stage':
        loadUsageStage();
        break;
      case 'quiz-stage':
        loadQuizStage();
        break;
      case 'conversation-stage':
        loadConversationStage();
        break;
    }
    showScreen(stage);
  }
  
  function loadUsageStage() {
    document.getElementById('usage-example').textContent = currentLevel.words[0].usage;
  }
  
  function loadQuizStage() {
    const quizOptions = document.getElementById('quiz-options');
    quizOptions.innerHTML = currentLevel.words.map(word => `
      <button onclick="handleQuizAnswer('${word.meaning}', this)">${word.word}</button>
    `).join("");
  }
  
  function handleQuizAnswer(answer, button) {
    const correctAnswer = "Thank you"; // Hardcoded for this example
    if (answer === correctAnswer) {
      button.classList.add("correct");
      alert("Correct!"); // Basic feedback; we could improve this.
      nextStage('conversation-stage');
    } else {
      button.classList.add("incorrect");
      alert("Try again!");
    }
  }
  
  function loadConversationStage() {
    const conversation = document.getElementById('conversation');
    conversation.innerHTML = currentLevel.conversation.map(sentence => {
      if (sentence.blank) {
        return `<input type="text" placeholder="Translate '${sentence.meaning}'" class="conversation-input">`;
      }
      return `<p>${sentence.phrase}</p>`;
    }).join("");
  
    const finishButton = document.createElement('button');
    finishButton.textContent = "Check Conversation";
    finishButton.onclick = checkConversation;
    conversation.appendChild(finishButton);
  }
  
  function checkConversation() {
    const inputs = document.querySelectorAll('.conversation-input');
    let correct = true;
  
    inputs.forEach((input, index) => {
      const correctAnswer = currentLevel.conversation[index].phrase;
      if (input.value === correctAnswer) {
        input.classList.add("correct");
      } else {
        input.classList.add("incorrect");
        correct = false;
      }
    });
  
    if (correct) {
      alert("Well done! You've completed the conversation.");
      returnToLevelNav();
    } else {
      alert("Some answers are incorrect. Try again!");
    }
  }
  
  function returnToLevelNav() {
    showScreen('level-navigation');
  }
  
  init();
  
