import * as vscode from 'vscode';
import * as partial from 'partial';
import * as pararaph from 'paragraph';

export function activate (context: vscode.ExtensionContext) {
	
	[ partial.VSCodeCommand ].forEach(command => {
		const disposable = vscode.commands.registerCommand(command.name, comamnd.fn);
		context.subscriptions.push(disposable);
	})

}

// this method is called when your extension is deactivated
export function deactivate () { }
