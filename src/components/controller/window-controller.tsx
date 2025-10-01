import { useWindowControls } from "@/hooks/use-window-controls";
import getSystem from "@/utils/get-system";
import { Close, CropSquare, Minimize } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";

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
