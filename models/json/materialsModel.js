import materials from "./costingReport.json" with { type: 'json' };

export class MaterialModel {

    static async getMaterial(materialNumber){
    
        const material = await materials.find((material)=> material.material_number === materialNumber)
        if(typeof material === "undefined" ){
            console.log("El material Number es undefined")
            const material = {"cost": 0}
            return material
        }

        return material;
    }

    static async getMaterials(){
        
    }
}
