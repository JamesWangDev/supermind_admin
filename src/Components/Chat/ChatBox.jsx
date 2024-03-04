import { Chat } from "./Chat";
import { useEffect, useRef, useState } from "react";
import { OpenAIStream } from "@/Utils/OpenAIStream";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    try {
        const charLimit = 12000;
        let charCount = 0;
        let messagesToSend = [];

        for (let i = 0; i < updatedMessages.length; i++) {
            const message = updatedMessages[i];
            if (charCount + message.content.length > charLimit) {
            break;
            }
            charCount += message.content.length;
            messagesToSend.push(message);
        }
        
        const stream = await OpenAIStream(messagesToSend);

        const data = stream;

        if (!data) {
          return;
        }

        setMessages((messages) => [
            ...messages,
            {
            role: "assistant",
            content: data,
            },
        ]);
    
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
        return;
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 overflow-auto px-2 px-sm-10 pb-4 pb-sm-10">
          <div className="mx-auto mt-4 mt-sm-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}
