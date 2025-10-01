import { getCurrentWindow } from "@tauri-apps/api/window";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface WindowContextType {
  decorated: boolean | null;
  toggleDecorations: () => Promise<void>;
  refreshDecorated: () => Promise<boolean>;
  minimize: () => void;
  close: () => void;
  toggleFullscreen: () => Promise<void>;
  currentWindow: ReturnType<typeof getCurrentWindow>;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentWindow = getCurrentWindow();
  const [decorated, setDecorated] = useState<boolean | null>(null);

  const minimize = useCallback(() => currentWindow.minimize(), [currentWindow]);
  const close = useCallback(() => currentWindow.close(), [currentWindow]);
  const toggleFullscreen = useCallback(async () => {
    await currentWindow.setFullscreen(!(await currentWindow.isFullscreen()));
  }, [currentWindow]);

  const refreshDecorated = useCallback(async () => {
    const val = await currentWindow.isDecorated();
    setDecorated(val);
    return val;
  }, [currentWindow]);

  const toggleDecorations = useCallback(async () => {
    const currentVal = await currentWindow.isDecorated();
    await currentWindow.setDecorations(!currentVal);
    setDecorated(!currentVal);
  }, [currentWindow]);

  useEffect(() => {
    refreshDecorated();
    currentWindow.setMinimizable?.(true);
  }, [currentWindow, refreshDecorated]);

  return (
    <WindowContext.Provider
      value={{
        decorated,
        toggleDecorations,
        refreshDecorated,
        minimize,
        close,
        toggleFullscreen,
        currentWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error("useWindow must be used within WindowProvider");
  }
  return context;
};

export const useWindowControls = () => {
  const { minimize, close, toggleFullscreen, currentWindow } = useWindow();
  return { minimize, close, toggleFullscreen, currentWindow };
};

export const useWindowDecorations = () => {
  const { decorated, toggleDecorations, refreshDecorated } = useWindow();
  return { decorated, toggleDecorations, refreshDecorated };
};
