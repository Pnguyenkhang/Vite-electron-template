import { app, BrowserWindow, session } from "electron";
import { isDev } from "./util.js";
import path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // Disable web security for development
    },
  });
  console.log("Called in ts");

  if (isDev()) {
    console.log("Loading development URL...");
    mainWindow.loadURL("http://localhost:5123");
    mainWindow.webContents.openDevTools();

    // Set CSP for development
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self' 'unsafe-inline' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob: ws://localhost:5123;",
          ],
        },
      });
    });
  } else {
    console.log("Loading production build...");
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));

    // Set CSP for production
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';",
          ],
        },
      });
    });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
