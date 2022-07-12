import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";
import { StringAttribute } from "../utils/StringAttribute";

/**
 * The element defines a styles used to draw geometric and textual content.
 * While all attributes are defined as optional in the schema the R, G, B, LineWeight and LineType attributes are expected for all geometric primitives,
 * otherwise the  behaviour is undefined.
 */
export class Presentation {
    isChild = true;
    element: Element;

    /**
     * Name of the layer in which the graphical elements resides.  This has no functional semantics associated with it.
     */
    layer: StringAttribute;

    /**
     * A lookup in a color index.  This isn’t used by AVEVA software.
     */
    color: StringAttribute;

    /**
     * One of the numbers or names from the following (Object Model document v2.2) :-
     * 0 Solid
     * 1 Dotted
     * 2 Dashed
     * 3 Long Dash
     * 4 Long Dash + Short Dash, CenterLine
     * 5 Short Dash
     * 6 Long Dash + Short Dash + Short Dash
     * 7 Dash + Short Dash
     */
    lineType: StringAttribute;

    /**
     * TODO, this will need more work
     * <real>
     * or
     * <real><units>
     * or
     * <real><space><units>
     *
     * Where :-
     *  <real> is an real value.
     *  <space> is a space character (&#20;)
     *
     */
    lineWeight: NumberAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of Red component.
     */
    r: NumberAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of Green component.
     */
    g: NumberAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of blue component
     */
    b: NumberAttribute;

    /**
     * constructor
     * @param element
     */
    constructor(element: Element) {
        this.element = element;
        this.layer = new StringAttribute(element, "Layer");

        // color, using rgb might be best
        this.color = new StringAttribute(element, "Color");

        this.lineType = new StringAttribute(element, "LineType");

        this.lineWeight = new NumberAttribute(element, "LineWeight");

        // colors 0-1 for rgb
        this.r = new NumberAttribute(element, "R");
        this.g = new NumberAttribute(element, "G");
        this.b = new NumberAttribute(element, "B");

        collectMissingParts(this.element, this);
    }
}
