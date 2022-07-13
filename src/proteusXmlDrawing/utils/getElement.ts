/**
 * helper for reading html collection
 * @param elements
 * @param callback
 */
export function getElements<T>(
    element: Element,
    elementToFind: string,
    UseClass: { new (element: Element): T }
): T[] {
    const elementsFound: T[] = [];
    if (element?.children) {
        for (let i = 0; i < element.children.length; i++) {
            const el = element.children[i];
            if (el.tagName === elementToFind) {
                elementsFound.push(new UseClass(el));
            }
        }
    }

    return elementsFound;
}
