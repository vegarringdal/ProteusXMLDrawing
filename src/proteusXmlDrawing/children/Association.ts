import { StringAttribute } from "../utils/StringAttribute";

/**
 * The Association element is used to relate engineering items to other resources.  
 *
 * One documented use of this is to relate in-line ProcessInstrument elements with InstrumentLoop elements.  
 * In this case each in-line ProcessInstrument element has an Association child element which details 
 * the relationship using the Type attribute with a value of ‘is a part of’.
 * 
 */
export class Association {
    public readonly isChild = true;
    public readonly element: Element;
 
    // children
    // no children

    // attributes
    public readonly type: StringAttribute;
    public readonly itemID: StringAttribute;
    public readonly tagName: StringAttribute;
    public readonly name: StringAttribute;
    public readonly uri: StringAttribute;
    public readonly context: StringAttribute;


    constructor(element: Element) {
        this.element = element;
        // no children
        
        // attributes
        this.type = new StringAttribute(element, "Type");
        this.itemID = new StringAttribute(element, "ItemID");
        this.tagName = new StringAttribute(element, "TagName");
        this.name = new StringAttribute(element, "Name");
        this.uri = new StringAttribute(element, "URI");
        this.context = new StringAttribute(element, "Context");
    }
}
