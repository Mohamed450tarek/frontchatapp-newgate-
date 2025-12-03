import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function SocketInitializer() {
  const { authUser } = useAuthStore();
  const { initSocket } = useChatStore();

  useEffect(() => {
    if (!authUser?.token) return;

    const socket = initSocket(authUser.token);

    return () => {
      socket.disconnect();
    };
  }, [authUser]);
  
  return null;
}

export default SocketInitializer;
