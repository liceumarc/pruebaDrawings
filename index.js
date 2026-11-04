const figureSelected = document.getElementById("figure-selected");
const figureSettings = document.getElementById("each-figure-settings");

// 1 - He declarado posibles Inputs relacionados con cada figura

const nameField = { id: "name", label: "Nom", type: "text", value: "" };
const colorField = { id: "color", label: "Color", type: "color", value: "#000000" };
// isFilled no esta implementado es para futuro
// const isFilled = { id: "filled", label: "Relleno", type: "", value: "false" };
const radiusField = { id: "radius", label: "Radi", type: "number", value: 50 };
const sizeField = { id: "size", label: "Mida", type: "number", value: 100 };
const baseField = { id: "base", label: "Base", type: "number", value: 100 };
const heightField = { id: "height", label: "Alçada", type: "number", value: 100 };

// 2 - Inputs obligatorios en todas las figuras

const COMMON_FIELDS = [nameField, colorField];

// 3 - Inputs de cada figura 
const FIGURES = {
    circle: [radiusField],
    square: [sizeField],
    triangle: [baseField, heightField]
};

// 4 - Un objeto de la figura
let figureData = {};

// 5 - Según la figura se añadiran los campos para el usuario
figureSelected.addEventListener("change", () => {
    const type = figureSelected.value;
    const specificFields = FIGURES[type];

    if(!specificFields) {
        figureSettings.innerHTML = "";
        return;
    }

    const fields = [...COMMON_FIELDS, ...specificFields];

    renderFields(fields);    
})

function renderFields(fields){

    figureSettings.replaceChildren();

    for (let index = 0; index < fields.length; index++) {

        const container = document.createElement("div");
        
        const label = document.createElement("label");
        label.htmlFor = fields[index].id;
        label.textContent = fields[index].label;

        const input = document.createElement("input");
        input.type = fields[index].type;
        input.id = fields[index].id;
        input.name = fields[index].id;
        input.value = fields[index].value;

        container.appendChild(label);
        container.appendChild(input);
        figureSettings.appendChild(container);
    }
    
}


