const { app, BrowserWindow } = require('electron');

const indexHtmlString = `${__dirname}/index.html`

//store window globally, avoiding js garbage-collection
let bW = null

app.on('ready', () => {
	console.log('Main.js log here, app is ready!');

	// BROWSER WINDOW 
	// https://www.electronjs.org/docs/api/browser-window#browserwindow
	bW = new BrowserWindow();

	// LOAD FILE
	// https://www.electronjs.org/docs/api/browser-window#winloadfilefilepath-options
	bW.loadFile(indexHtmlString)
})
