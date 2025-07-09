import materials from "./costingReport.json" with { type: 'json' };

export class MaterialModel {

    static async getMaterial(materialNumber){
        
        const material = await materials.find((material)=> material.material_number === materialNumber)
        if(typeof material === "undefined" ){            
            throw new Error("getMaterial: El material_number es invalido")
        }
        
        return material;
    };

    static async getMaterials(materialsNumbers){
            
        let mats=[];
        let matsErros=[];
        for(let mat of materialsNumbers){

            let material = await materials.find((material)=>material.material_number === mat);
            if(typeof material ==="undefined"){
                matsErros.push(new Error("getMaterials: El material_number es invalido: ", mat))
            }else{
                mats.push(material);
            }                                    
        }
        
        if(mats.length === 0){
            
            throw new Error("getMaterials: Todos los material_number son invalidos")
        }
                
        return mats;

    }
}
