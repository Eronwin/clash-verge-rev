import getSystem from "@/utils/get-system";
import { Close, CropSquare, Minimize } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function WindowControls() {
  const currentWindow = getCurrentWindow();
  const OS = getSystem();

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {OS === "macos" ? (
        <>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.close()}
          >
            <Close fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.hide()}
          >
            <Minimize fontSize="inherit" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.toggleMaximize()}
          >
            <CropSquare fontSize="inherit" color="inherit" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.minimize()}
          >
            <Minimize fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.toggleMaximize()}
          >
            <CropSquare fontSize="small" color="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => currentWindow.close()}
          >
            <Close fontSize="small" color="inherit" />
          </IconButton>
        </>
      )}
    </div>
  );
}
