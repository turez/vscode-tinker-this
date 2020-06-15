import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	let disposables = [];

	disposables.push(vscode.commands.registerCommand('tinker-this.runSelection', async () => {
		await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'tinker-this: run');		
	}));

	disposables.push(vscode.tasks.registerTaskProvider('tinker-this', {
		provideTasks: () => {
		  let command = getConsoleCommand();
		  if(command === null) {
			  vscode.window.showInformationMessage('The tinker command is not available');
			  return undefined;
		  }
		  return [new vscode.Task(
					  { type: "tinker-this", task: "run" },
					  2,
					  "run",
					  'tinker-this',
					  new vscode.ShellExecution(command)
				  )];
		},
		resolveTask(_task: vscode.Task): vscode.Task | undefined {
		  return undefined;
		}
	}));

	function getConsoleCommand() {
		const php = vscode.workspace.getConfiguration('tinker-this').get('phpPath');
		const code = getSelectedCode();
		if (code === undefined || code === null || code === "") {
			return null;
		}

		return "echo '" + getSelectedCode()  + "'|" + php + ' artisan tinker';
	}

	function getSelectedCode() {
		const editor = vscode.window.activeTextEditor;
			if(editor !== undefined) {
				let selection = editor.selection;
				let text = editor.document.getText(selection);
				return text.replace(/\r?\n|\r|\ /g,'').replace(/'+/g, '"');
			}
	}

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
