import { ReactNode, useState } from "react";
import { createContext } from "vm";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

// interface StreamResponse  {
//   addMessage: () => void;
//   message: string;
//   handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   isLoading: boolean;
// };

export const ChatContext = createContext({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
