import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent implements OnInit {
  chatForm!: FormGroup;
  messages: Message[] = [];
  frequentlyAskedQuestions: string[] = [
    'What is my balance?',
    'Show my recent transactions',
    'How can I save money?',
    'What are the best investment options?',
    'How do I transfer money?'
  ];

  aiFeatures: { name: string; icon: string }[] = [
    { name: 'Analyse des dépenses', icon: 'expenses.png' },
    { name: 'Conseils d’épargne', icon: 'savings.png' },
    { name: 'Alertes personnalisées', icon: 'alerts.png' },
    { name: 'Prédictions de marché', icon: 'forecast.png' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initChatForm();
    this.addAiWelcomeMessage();
  }

  initChatForm(): void {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  addAiWelcomeMessage(): void {
    this.messages.push({
      sender: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA bancaire, prêt à vous aider avec vos questions financières. Comment puis-je vous assister aujourd\'hui ?',
      timestamp: new Date()
    });
  }

  sendMessage(): void {
    if (this.chatForm.valid) {
      const userMessageContent = this.chatForm.value.message;
      this.messages.push({
        sender: 'user',
        content: userMessageContent,
        timestamp: new Date()
      });
      this.chatForm.reset();

      // Appel à l'API Flask
      this.http.post<{ reply: string }>('http://127.0.0.1:5000/api/chat', {
        message: userMessageContent,
        
      }).subscribe({
        next: (response) => {
          this.messages.push({
            sender: 'ai',
            content: response.reply,
            timestamp: new Date()
          });
        },
        error: (err) => {
          this.messages.push({
            sender: 'ai',
            content: "❌ Une erreur est survenue lors de la communication avec l'assistant IA.",
            timestamp: new Date()
          });
          console.error(err);
        }
      });
    }
  }

  sendQuickQuestion(question: string): void {
    this.chatForm.get('message')?.setValue(question);
    this.sendMessage();
  }

  getIconPath(iconName: string): string {
    return `assets/icons/${iconName}`;
  }
}
