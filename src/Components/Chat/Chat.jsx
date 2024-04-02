import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";

export const Chat = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="d-flex flex-column rounded-lg px-2 p-sm-4 border border-neutral-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 my-sm-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 my-sm-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 mt-sm-8 bottom-56px left-0 w-100">
          <ChatInput loading={loading} onSend={onSend} onReset={onReset} />
        </div>
      </div>
    </>
  );
};
