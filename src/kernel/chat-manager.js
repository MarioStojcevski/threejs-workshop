import * as THREE from 'three';

export default class ChatManager {
    constructor() {
        this.chatContainer = document.getElementById("chat");
    }


    speak(person, message) {

        // Create new elements for the message and append them to the chat container
        const newMessage = document.createElement("span");
        newMessage.classList.add("message");

        const playerNameSpan = document.createElement("span");
        playerNameSpan.classList.add("playerName");
        playerNameSpan.innerText = person.name;

        const messageTextSpan = document.createElement("span");
        messageTextSpan.classList.add("messageText");
        messageTextSpan.innerText = message;

        newMessage.appendChild(playerNameSpan);
        newMessage.appendChild(document.createTextNode(":"));
        newMessage.appendChild(messageTextSpan);
        newMessage.appendChild(document.createElement("br")); // Optional: Add line break between messages

        this.chatContainer.appendChild(newMessage);

        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;


    }
}
