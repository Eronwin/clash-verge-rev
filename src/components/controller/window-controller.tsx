import getSystem from "@/utils/get-system";
import { Close, CropSquare, Minimize } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { useEffect } from "react";

export function WindowControls() {
  const currentWindow = getCurrentWindow();

  useEffect(() => {
    currentWindow.setMinimizable?.(true);
  }, [currentWindow]);

  const OS = getSystem();

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {OS === "macos" ? (
        <>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().close()}
          >
            <Close fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().minimize()}
          >
            <Minimize fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().toggleMaximize()}
          >
            <CropSquare fontSize="inherit" color="inherit" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().minimize()}
          >
            <Minimize fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().toggleMaximize()}
          >
            <CropSquare fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={async () => await getCurrentWindow().close()}
          >
            <Close fontSize="small" color="inherit" />
          </IconButton>
        </>
      )}
    </div>
  );
}
