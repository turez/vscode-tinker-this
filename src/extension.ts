import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('tinker-this.runSelection', () => {

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from tinker-this!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
