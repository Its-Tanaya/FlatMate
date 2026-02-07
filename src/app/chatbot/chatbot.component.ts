import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  messages = [
    { text: 'Hi there! I am your AI assistant. How can I help you find a room today?', sender: 'bot' }
  ];
  userMessage = '';

  quickReplies = [
    'Find a Room',
    'List a Room',
    'Pricing Info',
    'Contact Support'
  ];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      const msg = this.userMessage;
      this.messages.push({ text: msg, sender: 'user' });
      this.userMessage = '';
      this.isTyping = true;
      this.scrollToBottom();

      // Simulate bot typing/response
      setTimeout(() => {
        this.isTyping = false;
        this.processBotResponse(msg);
      }, 1500);
    }
  }

  handleQuickReply(reply: string) {
    this.userMessage = reply;
    this.sendMessage();
  }

  processBotResponse(userMsg: string) {
    let responseText = 'I am just a demo bot for now, but I like your query!';
    const lowerMsg = userMsg.toLowerCase();

    if (lowerMsg.includes('find')) {
      responseText = 'I can help you find a room! Please tell me your preferred location and budget.';
    } else if (lowerMsg.includes('list')) {
      responseText = 'Great! Listing a room is easy. Go to the "Register Room" section to get started.';
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      responseText = 'Our pricing is transparent. No hidden fees!';
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('support')) {
      responseText = 'You can reach our support team at support@flatmate.com.';
    }

    this.messages.push({ text: responseText, sender: 'bot' });
  }
}
