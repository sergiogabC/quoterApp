import materials from "./costingReport.json" with {type: 'json'};

export class MaterialModel {

    static async getMaterial(materialNumber){
    
        if(materialNumber === "" ){
            console.log("El material Number es undefined")
            const material = {cost: 0}
            return material
        }
        
        const material = await materials.find((material)=> material.material_number === materialNumber)
        return material;
    }

    static async getMaterials(){
        
    }
}
