import fetch from 'node-fetch';
import * as vscode from 'vscode';
import { checklistPicker } from './ChecklistControlPicker';
import { KnowledgebaseItemFile } from './KnowledgeBaseItemFile';
import * as json from 'jsonc-parser';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('skf-tree.SKFChecklist', () => {
		checklistPicker.showCategories()
			.then((item) => checklistPicker.showTypes(item.id))
			.then((item) => {
				const doc = new KnowledgebaseItemFile(item.id);
			})
			.catch((err) => vscode.window.showErrorMessage(`${err}`));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
