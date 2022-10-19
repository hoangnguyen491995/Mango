import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  app,
} from "electron";
import Store from "electron-store";
import { join } from "path";
export default (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store({ name });

  const defaultSize = {
    width: options.maxWidth || 1368,
    height: options.maxHeight || 768,
  };
  let state = {};
  let win: BrowserWindow;


  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());


  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    frame: false,
    // titleBarStyle: "hidden",
    backgroundColor: "#00BED6",
    title: "POS MANGO APP",
    // icon: __dirname + "/mango-apple-icon.ico",
    // transparent: true,

    // titleBarOverlay: {
    //   height: 32,
    //   color: "#00BED6",

    // },

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      // preload: join(__dirname, 'preload.js'),
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);

  win.on("close", saveState);


  //Minimize app
  ipcMain.on("hideRes", async (event, value) => {
    win.minimize()
  })
  //Minimize app
  ipcMain.on("minMaxRes", async (event, value) => {
    if (win.isMaximized()) {
      win.restore()
    }
    else {
      win.maximize()
    }
  })
  ipcMain.on("closeApp", async (event, value) => {
    win.close()
    app.quit()
  })

  ipcMain.on("accessToken", async (event, value) => {
    // await win.webContents.executeJavaScript(`'localStorage.setItem("saveToken","${value}");'`, true)
    await store.set("accessToken", value)

  });
  console.log("AccessTokenWindow", store.get("accessToken"));
  ipcMain.handle("getToken", async (event, value) => {
    const token = store.get("accessToken")
    return token
  })
  win.webContents.openDevTools()
  return win;
};
