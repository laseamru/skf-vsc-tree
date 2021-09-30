import { QuickPickItem } from "vscode";

export class ChecklistItem implements QuickPickItem {
    id: number;
    label: string;

    constructor(id: number, label: string) {
        this.id = id;
        this.label = `${this.id}. ${label}`;
    }
}
