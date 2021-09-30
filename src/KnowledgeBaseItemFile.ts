import { WorkspaceEdit, Uri, workspace } from "vscode";
import { fetchItems } from "./utils";
// import * as json from 'jsonc-parser';

export class KnowledgebaseItemFile {
    // private static instance: KnowledgebaseItemFile;
    readonly edit: WorkspaceEdit;
    readonly name: string;
    readonly path: Uri;
    readonly workspace = workspace.workspaceFolders;

    constructor(public id:number) {
        this.id = id;
        this.name = 'skf-checklist.json';
        this.path = Uri.parse(`${this.getCurrentWorkspaceUri()}/${this.name}`);
        this.edit = new WorkspaceEdit();
        this.workspace =  workspace.workspaceFolders;

        this.createFile();
        this.insertIntoJSONFile();
        this.readFile();
    }

    private getCurrentWorkspaceUri(): Uri | undefined {
        if (this.workspace) {
            return Uri.joinPath(this.workspace[0].uri);
        }

        throw new Error('No workspace');
    }

    private createFile() {
        this.edit.createFile(this.path, { overwrite: true, ignoreIfExists: true});
        
        return workspace.applyEdit(this.edit);
    }

    private async insertIntoJSONFile() {
        const fetchedItems: {}[] = await fetchItems(`checklist/items/${this.id}`);
        const formattedItems: KnowledgebaseItem[] = [];

        fetchedItems.forEach((item: any) => {
            formattedItems.push(new KnowledgebaseItem(
                item.checklist_items_checklist_id,
                item.checklist_items_content, 
                item.add_resources,
                item.maturity));
        });

        const json = JSON.stringify(formattedItems, null, 2);

        const writeItems = Buffer.from(json);

        await workspace.fs.writeFile(this.path, writeItems);
    }

    async readFile() {
        const fetchedItems: {}[] = await fetchItems(`checklist/items/${this.id}`);
    }
}

class KnowledgebaseItem {

    constructor(public id: number, public content: string, public resource: string, public maturity: number) {
        this.id = id;
        this.content = content;
        this.resource = resource;
        this.maturity;
    }

}
