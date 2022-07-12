import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { UnitsOfMeasure } from "./UnitsOfMeasure";

/**
 * The properties of a plant model This includes properties like its name,
 * modification date, editing system etc.
 * The PlantInformation element must be the first child element of a PlantModel element.
 */
export class PlantInformation {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly unitsOfMeasure: UnitsOfMeasure[];

    // attributes
    public readonly schemaVersion: StringAttribute;
    public readonly originatingSystem: StringAttribute;
    public readonly modelName: StringAttribute;
    public readonly date: StringAttribute;
    public readonly projectName: StringAttribute;
    public readonly projectCode: StringAttribute;
    public readonly projectDescription: StringAttribute;
    public readonly companyName: StringAttribute;
    public readonly time: StringAttribute;
    public readonly is3D: StringAttribute;
    public readonly units: StringAttribute;
    public readonly discipline: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.unitsOfMeasure = getElements(element, "UnitsOfMeasure", UnitsOfMeasure);

        // attributes
        this.schemaVersion = new StringAttribute(element, "SchemaVersion");
        this.originatingSystem = new StringAttribute(element, "OriginatingSystem");
        this.modelName = new StringAttribute(element, "ModelName");
        this.date = new StringAttribute(element, "Date");
        this.projectName = new StringAttribute(element, "ProjectName");
        this.projectCode = new StringAttribute(element, "ProjectCode");
        this.projectDescription = new StringAttribute(element, "ProjectDescription");
        this.companyName = new StringAttribute(element, "CompanyName");
        this.time = new StringAttribute(element, "Time");
        this.is3D = new StringAttribute(element, "Is3D");
        this.units = new StringAttribute(element, "Units");
        this.discipline = new StringAttribute(element, "Discipline");
    }
}
