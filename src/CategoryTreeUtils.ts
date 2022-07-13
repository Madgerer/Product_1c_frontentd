import {ICategory} from "./domain/types";

export default class CategoryTreeUtils {
    static findCategory(id: number, categories: ICategory[]): ICategory | null {
        for (let i = 0; i < categories.length; i++) {
            const category = CategoryTreeUtils.searchInTree(id, categories[i]);
            if(category != null){
                return category;
            }
        }
        return null;
    }

    static searchInTree(id: number, category: ICategory): ICategory | null {
        if(category.id === id){
            return category;
        }
        else if (category.children != null){
            let result: ICategory | null = null;
            for(let i = 0; result == null && i < category.children.length; i++){
                result = CategoryTreeUtils.searchInTree(id, category.children[i]);
            }
            return result;
        }
        return null;
    }

    static getPathByParent(childId: number, categories: ICategory[]): number[] {
        return this.getPathByParentPrivate(childId, categories, []);
    }

    static getCategoriesByParent(childId: number, categories: ICategory[]): ICategory[] {
        return this.getCategoriesByParentPrivate(childId, categories, []);
    }

    private static getPathByParentPrivate(id: number, categories: ICategory[], result: number[]): number[] {
        const category = this.findCategory(id, categories);
        if (category !== null)
        {
            result.unshift(id);
            return this.getPathByParentPrivate(category.parentId, categories, result);
        }

        return result;
    }

    private static getCategoriesByParentPrivate(id: number, categories: ICategory[], result: ICategory[]): ICategory[] {
        const find = this.findCategory(id, categories);
        if (find !== null)
        {
            result.unshift(find);
            return this.getCategoriesByParentPrivate(find.parentId, categories, result);
        }
        return result;
    }
}