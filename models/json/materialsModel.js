import materials from "./costingReport.json" with { type: 'json' };

export class MaterialModel {

    static async getMaterial(materialNumber){
        
        const material = await materials.find((material)=> material.material_number === materialNumber)
        if(typeof material === "undefined" ){            
            throw new Error("getMaterial: El material Number es undefined")            
        }

        return material;
    }

    static async getMaterials(){
        
    }
}
