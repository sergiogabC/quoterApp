import materials from "./costingReport.json" with {type: 'json'};

export class MaterialModel {

    static async getMaterial(materialNumber){
    
        if(materialNumber === ""){
            return "materialNumber es nulo"
        }
        
        const material = await materials.find((material)=> material.material_number === materialNumber)
        return material;
    }

    static async getMaterials(){
        
    }
}
