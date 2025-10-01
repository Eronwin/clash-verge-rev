import getSystem from "@/utils/get-system";
import { Close, CropSquare, Minimize } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { getCurrentWindow } from "@tauri-apps/api/window";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";

export function useWindowControls() {
  const currentWindow = getCurrentWindow();

  const minimize = () => currentWindow.minimize();
  const close = () => currentWindow.close();
  const toggleFullscreen = async () => {
    await currentWindow.setFullscreen(!(await currentWindow.isFullscreen()));
  };

  const [decorated, setDecorated] = React.useState<boolean | null>(null);

  const refreshDecorated = async () => {
    const val = await currentWindow.isDecorated();
    setDecorated(val);
    return val;
  };

  const toggleDecorations = async () => {
    const val = await refreshDecorated();
    await currentWindow.setDecorations(!val);
    setDecorated(!val);
  };

  useEffect(() => {
    refreshDecorated();
    currentWindow.setMinimizable?.(true);
  }, [currentWindow]);

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

export const WindowControls = forwardRef(function WindowControls(props, ref) {
  const OS = getSystem();
  const { currentWindow, minimize, close, toggleFullscreen } =
    useWindowControls();

  useImperativeHandle(
    ref,
    () => ({ currentWindow, minimize, close, toggleFullscreen }),
    [currentWindow, minimize, close, toggleFullscreen],
  );

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {OS === "macos" ? (
        <>
          <IconButton size="small" sx={{ fontSize: 14 }} onClick={close}>
            <Close fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: 14 }} onClick={minimize}>
            <Minimize fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={toggleFullscreen}
          >
            <CropSquare fontSize="inherit" color="inherit" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton size="small" sx={{ fontSize: 14 }} onClick={minimize}>
            <Minimize fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={toggleFullscreen}
          >
            <CropSquare fontSize="small" color="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: 14 }} onClick={close}>
            <Close fontSize="small" color="inherit" />
          </IconButton>
        </>
      )}
    </div>
  );
});
