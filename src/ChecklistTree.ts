import { TreeDataProvider, TreeItem, Uri } from "vscode";
import * as json from 'jsonc-parser';

export class KnowledgebaseItemsProvider implements TreeDataProvider<KnowledgebaseItem> {

    constructor(public path: Uri) {
        this.path = path;
    };

    getTreeItem(element: ): TreeItem {
        /** Return the UI representation of the that get's displayed in the view */

    }

    getChildren(element?: KnowledgebaseItem): Thenable<KnowledgebaseItem[]> {
        /** return the children for the given element or root (if no element is passed) */
    }
    
}