import axios from "axios";

export const OpenAIStream = async (messages, model, api, api_key) => {
    let editedMessages = JSON.parse(JSON.stringify(messages));
    if (model.includes("claude")) {
      editedMessages.map((message, index) => {
        if (index % 2 == 1) {
          editedMessages[index].role = editedMessages.length % 2 == 0 ? 'user' : 'assistant'
        } else {
          editedMessages[index].role = editedMessages.length % 2 == 0 ? 'assistant' : 'user'
        }
      })

      if (editedMessages.length % 2 == 0) {
        editedMessages.unshift({role: "user", content: "none"});
      }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${model.includes("claude") ? 'https://proxy.cors.sh/' : ''}${api}`, {
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
              'x-cors-api-key': model.includes("claude") ? "temp_368b76b526936e794eb3e109cc7fb026" : undefined
            }
          }).then((response) => {
                if (model.includes("claude")) {
                  resolve(response.data.content[0].text)
                } else {
                  resolve(response.data.choices[0].message.content.trim());
                }
          }).catch((error) => {
                reject(error);
          })
    })
};
