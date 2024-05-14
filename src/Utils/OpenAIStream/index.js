import axios from "axios";

export const OpenAIStream = async (messages, model, api, api_key) => {
    let editedMessages = messages;
    if (model.includes("claude")) {
      editedMessages = editedMessages.slice(1);
      editedMessages[1].role = "assistant"
    }

    return new Promise((resolve, reject) => {
        axios.post(api, {
            model: model ? model : "gpt-3.5-turbo",
            messages: editedMessages,
            max_tokens: 800,
            temperature: 0.0,
          }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: model.includes("claude") ? undefined : `Bearer ${api_key}`,
                'x-api-key': model.includes("claude") ? api_key : undefined,
                'anthropic-version': model.includes("claude") ? '2023-06-01' : undefined, 
                'anthropic-beta': model.includes("claude") ? 'messages-2023-12-15' : undefined,
            }
          }).then((response) => {
                resolve(response.data.choices[0].message.content.trim());
          }).catch((error) => {
                reject(error);
          })
    })
};
