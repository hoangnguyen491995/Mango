import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import serve from "electron-serve";

import { createWindow } from "./helpers";
import { format } from "url";
import { join } from "path";
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}
let loadingScreen;
app.disableHardwareAcceleration();
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 640,
      height: 480,
      frame: false,
      transparent: true,
      icon: __dirname + "/mango-apple-icon.ico",
      autoHideMenuBar: true,
    })
  );

  if (isProd) {
    const port = process.argv[2];
    loadingScreen.loadURL(`file://${__dirname}/loading-app.html`);
    // mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    loadingScreen.loadURL(__dirname + `/loading-app.html`);
  }
  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.webContents.on("did-finish-load", () => {
    loadingScreen.show();
  });
};
app.whenReady().then(() => {
  createLoadingScreen();
  const mainWindow = createWindow("main", {
    icon: __dirname + "/mango-apple-icon.ico",
    autoHideMenuBar: true,
    show: false,
    title: "POS MANGO APP",
    backgroundColor: "#00BED6",
  });

  if (isProd) {
    mainWindow.loadURL(`app://./workspace.html`);

    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    mainWindow.loadURL(`http://localhost:${port}/workspace`);
  }

  mainWindow.webContents.on("did-finish-load", () => {
    /// then close the loading screen window and show the main window

    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.close();
      }
      mainWindow.maximize();
      mainWindow.show();
    }, 3000);
  });
  // mainWindow.webContents.executeJavaScript('localStorage.setItem("saveToken", "sa");', true);
});

app.on("window-all-closed", () => {
  app.quit();
});
