import { apiRequest } from "./queryClient";

export interface ChatResponse {
  response: string;
  suggestions: string[];
}

export async function sendChatMessage(message: string, sessionId: string): Promise<ChatResponse> {
  const response = await apiRequest("POST", "/api/chat", {
    userMessage: message,
    sessionId
  });
  
  return response.json();
}

export async function getChatHistory(sessionId: string) {
  const response = await apiRequest("GET", `/api/chat/${sessionId}`);
  return response.json();
}
