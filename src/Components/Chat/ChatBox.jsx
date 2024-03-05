import { Chat } from "./Chat";
import { useEffect, useMemo, useRef, useState } from "react";
import { OpenAIStream } from "@/Utils/OpenAIStream";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import { prompt } from "@/Utils/AxiosUtils/API";

export default function ChatBox({activeTab, values}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  const messagesEndRef = useRef(null);

  const { data: promptData, isLoading: promptLoader } = useQuery(["prompts", values['prompts']], () => request({ url: prompt }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(!promptLoader && promptData) {
        const selectedPromptData = promptData.data.filter(data => values['prompts'].includes(data.id));
        setSelectedPrompts(selectedPromptData)
    }
  }, [promptLoader, promptData])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    const promptTexts = selectedPrompts.map(prom => ({role: "user", content: prom.prompt_text}))
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
                messagesToSend.push(...promptTexts);
                messagesToSend.push(updatedMessages[updatedMessages.length - 1]);
                break;
            }
            charCount += message.content.length;
            if(i === updatedMessages.length - 1) {
                messagesToSend.push(...promptTexts);
            }
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
