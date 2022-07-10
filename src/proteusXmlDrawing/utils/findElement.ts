/**
 * helper for reading html collection
 * @param elements
 * @param callback
 */
export function findElement(
    elements: HTMLCollectionOf<Element>,
    useElement: string,
    callback: (element: Element, index?: number) => void
) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === useElement) {
            callback(elements[i], i);
        }
    }
}
