import axios from "axios";

export const OpenAIStream = async (messages, model, api, api_key) => {
    return new Promise((resolve, reject) => {
        axios.post(api, {
            model: model ? model : "gpt-3.5-turbo",
            messages: [
            // {
            //     role: "system",
            //     content: `You are a helpful, friendly, assistant.`
            // },
            ...messages
            ],
            max_tokens: 800,
            temperature: 0.0,
          }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: model.includes("claude") ? undefined : `Bearer ${api_key}`,
                'x-api-key': model.includes("claude") ? api_key : undefined
            }
          }).then((response) => {
                resolve(response.data.choices[0].message.content.trim());
          }).catch((error) => {
                reject(error);
          })
    })
};
