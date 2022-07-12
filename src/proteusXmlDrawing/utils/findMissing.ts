const mapElements = new Map<string, Set<string>>();
const elementNamesMap = new Map<string, string>();

export function collectMissingParts(element: Element, ctx: any) {
    const keys = new Set(Object.keys(ctx).map((e) => e.toLowerCase()));
    const elementNames = new Set<string>();

    for (let i = 0; i < element.children.length; i++) {
        elementNames.add(element.children[i].tagName.toLowerCase());
        elementNamesMap.set(element.children[i].tagName.toLowerCase(), element.children[i].tagName);
    }

    const elementSet = mapElements.get(element.tagName) || new Set();

    elementNames.forEach((tagname) => {
        if (!keys.has(tagname)) {
            elementSet.add(tagname);
        }
    });

    mapElements.set(element.tagName, elementSet);
}

export function printMissing() {
    Array.from(mapElements.keys()).forEach((tagName) => {
        const missingTags = mapElements.get(tagName);
        if (missingTags?.size) {
            console.log("-------------------------------");
            console.log("----", tagName);
            missingTags.forEach((key) => {
                console.log("--------->", elementNamesMap.get(key));
            });
        }
    });
}
