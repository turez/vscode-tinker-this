import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	let disposables = [];

	disposables.push(vscode.commands.registerCommand('tinker-this.runSelection', async () => {
		await vscode.commands.executeCommand('workbench.action.terminal.clear');
		await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'tinker-this: run');
	}));

	disposables.push(vscode.tasks.registerTaskProvider('tinker-this', {
		provideTasks: () => {
			let command = getConsoleCommand();
			if (command === null) {
				vscode.window.showInformationMessage('The tinker command is not available');
				return;
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
			return;
		}
	}));

	function getConsoleCommand() {
		const php = vscode.workspace.getConfiguration('tinker-this').get('phpPath');
		const code = getCode();
		if (code === undefined || code === null || code === "") {
			return null;
		}

		return 'echo "' + getCode() + '"|' + php + ' artisan tinker';
	}

	function getCode() {
		const editor = vscode.window.activeTextEditor;
		if (editor !== undefined) {
			let selection = editor.selection;

			let text =
				selection === undefined || selection.anchor.isEqual(selection.active) ?
					editor.document.getText() : editor.document.getText(selection);

			return text
				.replace(/<\?php/, '')
				.replace(/\r?\n/g, '')
				.replace(/\ +/g, ' ')
				.replace(/"+/g, '\\"');
		}
	}

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() { }
