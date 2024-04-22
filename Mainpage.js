var symptoms = [
  "Does your pet have fever?",
  "Is your pet coughing?",
  "Is your pet vomiting?",
  "Is your pet experiencing diarrhea?",
  "Is your pet limping or showing lameness?",
  "Does your pet have swelling in joints?",
  "Is your pet lethargic?",
  "Is your pet experiencing loss of appetite?",
  "Is your pet excessively thirsty?",
  "Is your pet urinating excessively?",
  "Does your pet have redness in eyes?",
  "Does your pet have discharge in eyes?",
  "Is your pet itching?",
  "Is your pet experiencing hair loss?",
  "Is your pet wheezing?",
  "Is your pet experiencing difficulty breathing?",
];

var currentQuestionIndex = 0;

function sendResponse() {
  var userInput = document.getElementById("user-input").value.toLowerCase();
  var chatBox = document.getElementById("chat-box");

  // Add user's response to the chat window
  var userMessage = document.createElement("div");
  userMessage.className = "chat-message user";
  userMessage.innerHTML = "<p>" + userInput + "</p>";
  chatBox.appendChild(userMessage);

  // Clear user input
  document.getElementById("user-input").value = "";

  // Display Expert System's response
  if (currentQuestionIndex < symptoms.length - 1) {
    currentQuestionIndex++;
    setTimeout(function () {
      var expertMessage = document.createElement("div");
      expertMessage.className = "chat-message expert";
      expertMessage.innerHTML = "<p>" + symptoms[currentQuestionIndex] + "</p>";
      chatBox.appendChild(expertMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // Simulate processing time
  } else {
    setTimeout(function () {
      var expertMessage = document.createElement("div");
      expertMessage.className = "chat-message expert";
      expertMessage.innerHTML =
        "<p>Disease Result: - GastrointestinalIssues : Gastrointestinal issues refer to problems with the digestive system, - Systemic illness refers to illnesses affecting multiple systems of the body - Asthma is a chronic respiratory condition characterized by airway inflammation -Systemic illness refers to illnesses affecting multiple systems of the body.</p>"; // Simulating disease result
      chatBox.appendChild(expertMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // Simulate processing time
  }
}
