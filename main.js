// main.js
// 
// loosely based on an official electron example at 
// https://github.com/electron/electron-api-demos/blob/master/main.js

const path = require('path');
const glob = require('glob');
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

const init = () => {
	const shouldQuit = makeSingleInstance();
	if(shouldQuit) return app.quit();

	function createWindow() {
		const windowOptions = {
			width: 800,
			minWidth: 680,
			height: 600,
			title: app.getName()
		}

		mainWindow = new BrowserWindow(windowOptions);
		mainWindow.loadURL(path.join('file://',__dirname,'/public/index.html'));

		mainWindow.on('closed', () => {
			mainWindow = null;
		});
	}

	app.on('ready', () => {
		createWindow();
	});

	app.on('window-all-closed', () => {
		if(process.platform !== 'darwin')
			app.quit();
	});

	app.on('activate', () => {
		if(mainWindow === null)
			createWindow();
	});
}

const makeSingleInstance = () => {
	if(process.mas)
		return false;

	return app.makeSingleInstance( () => {
		if(mainWindow) {
			if(mainWindow.isMinimized())
				mainWindow.restore();
			mainWindow.focus();
		}
	});
}

init();