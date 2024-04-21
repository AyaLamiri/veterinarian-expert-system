var symptoms = [
    "Votre animal tousse-t-il ?",
    "Votre animal a-t-il de la fièvre ?",
    "Votre animal a-t-il des vomissements ?",
    "Votre animal a-t-il de la diarrhée ?",
    "Votre animal a-t-il des éternuements fréquents ?",
    "Votre animal a-t-il des difficultés à respirer ?",
    "Votre animal a-t-il perdu l'appétit ?"
];

var currentQuestionIndex = 0;

function sendResponse() {
    var userInput = document.getElementById("user-input").value.toLowerCase();
    var chatBox = document.getElementById("chat-box");

    // l'ajout la réponse de user a la fenêtre de chat
    var userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerHTML = "<p>" + userInput + "</p>";
    chatBox.appendChild(userMessage);

    // Efface l'entrée utilisateur
    document.getElementById("user-input").value = "";

    // Affiche la réponse de l'Expert Système
    if (currentQuestionIndex < symptoms.length - 1) {
        currentQuestionIndex++;
        setTimeout(function() {
            var expertMessage = document.createElement("div");
            expertMessage.className = "chat-message expert";
            expertMessage.innerHTML = "<p>" + symptoms[currentQuestionIndex] + "</p>";
            chatBox.appendChild(expertMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000); // hna simule un temps de traitement
    } else {
        setTimeout(function() {
            var expertMessage = document.createElement("div");
            expertMessage.className = "chat-message expert";
            expertMessage.innerHTML = "<p>Résultat de la maladie: Fièvre du Nil Occidental</p>"; // hna ysimiler résultat de la maladie
            chatBox.appendChild(expertMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000); // w hna simile un temps de traitement
    }
}
