import { ChatGPTAPI } from "../AxiosUtils/API";
import axios from "axios";

export const OpenAIStream = async (messages, model) => {
  const response = await axios.post(ChatGPTAPI, {
    model: model ? model : "gpt-3.5-turbo",
    messages: [
    {
        role: "system",
        content: `You are a helpful, friendly, assistant.`
    },
    ...messages
    ],
    max_tokens: 800,
    temperature: 0.0,
  }, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  })

  return response.data.choices[0].message.content.trim();
};
