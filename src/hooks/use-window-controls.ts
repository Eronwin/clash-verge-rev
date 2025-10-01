import { getCurrentWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useState } from "react";

export function useWindowControls() {
  const currentWindow = getCurrentWindow();

  const minimize = () => currentWindow.minimize();
  const close = () => currentWindow.close();
  const toggleFullscreen = async () => {
    await currentWindow.setFullscreen(!(await currentWindow.isFullscreen()));
  };

  const [decorated, setDecorated] = useState<boolean | null>(null);

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

  return {
    currentWindow,
    minimize,
    close,
    toggleFullscreen,
    toggleDecorations,
    decorated,
    refreshDecorated,
  };
}
