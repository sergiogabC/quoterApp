import materials from "./costingReport.json" with {type: 'json'};

export class MaterialModel {

    static async getMaterial(materialNumber){
        //console.log("Material Number desde model: " + materialNumber)
        const material = materials.find((material)=> material.material_number === materialNumber)
        //console.log("Material desde el model: " + JSON.stringify(material))
        return material;
    }

    static async getMaterials(){
        
    }
}
