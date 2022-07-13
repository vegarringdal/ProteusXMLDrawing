const mapElements = new Map<string, Set<string>>();
const mapAttributes = new Map<string, Set<string>>();
const elementNamesMap = new Map<string, string>();
const attributeNamesMap = new Map<string, string>();

export function collectMissingParts(element: Element, ctx: any) {
    {
        const keys = new Set(Object.keys(ctx).map((e) => e.toLowerCase()));
        const elementNames = new Set<string>();

        if (element?.children) {
            for (let i = 0; i < element.children.length; i++) {
                elementNames.add(element.children[i].tagName.toLowerCase());
                elementNamesMap.set(
                    element.children[i].tagName.toLowerCase(),
                    element.children[i].tagName
                );
            }
            const elementSet = mapElements.get(element.tagName) || new Set();

            elementNames.forEach((tagname) => {
                if (!keys.has(tagname)) {
                    elementSet.add(tagname);
                }
            });

            mapElements.set(element.tagName, elementSet);
        }
    }

    {
        if (element) {
            const keys = new Set(Object.keys(ctx).map((e) => e.toLowerCase()));
            const attributes = element.getAttributeNames();

            const attributeSet = mapAttributes.get(element.tagName) || new Set();

            attributes.forEach((name) => {
                if (!keys.has(name.toLowerCase())) {
                    attributeSet.add(name.toLowerCase());
                    attributeNamesMap.set(name.toLowerCase(), name);
                }
            });

            mapAttributes.set(element.tagName, attributeSet);
        }
    }
}

export function printMissing() {
    Array.from(mapElements.keys()).forEach((tagName) => {
        const missingTags = mapElements.get(tagName);
        if (missingTags?.size) {
            console.log("-------------------------------");
            console.log("--ELEMENT");
            console.log("----", tagName);
            missingTags.forEach((key) => {
                console.log("--------->", elementNamesMap.get(key));
            });
        }
    });

     Array.from(mapAttributes.keys()).forEach((attrName) => {
        const missingTags = mapAttributes.get(attrName);
        if (missingTags?.size) {
            console.log("-------------------------------");
            console.log("--ATTRIBUTE");
            console.log("----", attrName);
            missingTags.forEach((key) => {
                console.log("--------->", attributeNamesMap.get(key));
            });
        }
    });   
}
