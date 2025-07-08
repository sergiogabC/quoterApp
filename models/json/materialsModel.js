import materials from "./costingReport.json" with { type: 'json' };

export class MaterialModel {

    static async getMaterial(materialNumber){
        
        const material = await materials.find((material)=> material.material_number === materialNumber)
        if(typeof material === "undefined" ){            
            throw new Error("getMaterial: El material Number es undefined")
        }
        
        return material;
    };

    static async getMaterials(materialsNumbers){
            
        let mats=[];
        for(let mat of materialsNumbers){

            let material = await materials.find((material)=>material.material_number === mat);
            if(typeof material ==="undefined"){
                new Error("getMaterials: El material Number es undefined")
            }else{
                mats.push(material);
            }                                    
        }
        
        return mats;

    }
}
