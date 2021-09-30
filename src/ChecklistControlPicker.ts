import fetch from 'node-fetch';
import { window } from 'vscode';
import { fetchItems } from './utils';
import { ChecklistItem } from './QuickPickItem';

class ChecklistControlPicker {
    
    async showCategories(): Promise<any> {
        const categories: ChecklistItem[] = [];
        const items: any[] = await fetchItems('checklist_category/items');

        items.forEach((item) => categories.push(new ChecklistItem(item.id, item.name)));

        return window.showQuickPick(categories);
    }

    async showTypes(id: number): Promise<any> {
        const types: ChecklistItem[] = [];
        const items: any[] = await fetchItems(`checklist_types/types/${id}`);

        items.forEach((item) => types.push(new ChecklistItem(item.id, item.title)));

        return window.showQuickPick(types);
    }
}

export const checklistPicker = new ChecklistControlPicker();