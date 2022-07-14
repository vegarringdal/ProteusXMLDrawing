import { ComponentAttribute } from "./ComponentAttribute";


export type Presentation = {
    /**
     * Name of the layer in which the graphical elements resides.  This has no functional semantics associated with it.
     */
    layer: ComponentAttribute;

    /**
     * A lookup in a color index.  This isn’t used by AVEVA software.
     */
    color: ComponentAttribute;

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
    lineType: ComponentAttribute;

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
    lineWeight: ComponentAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of Red component.
     */
    r: ComponentAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of Green component.
     */
    g: ComponentAttribute;

    /**
     * 0 to 1 (double) 1 = maximum intensity of blue component
     */
    b: ComponentAttribute;
};
