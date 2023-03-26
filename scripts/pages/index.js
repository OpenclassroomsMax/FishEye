    
    import { Photographer } from "../factories/photographer.js"
    

    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

            const data = await fetch("/data/photographers.json") 
            .then((res)=> res.json())
            .then((data) =>{
                return data
            } )
            console.log ("data = ",data)
            
            console.log(data.photographers)
        let photographers = data.photographers


        
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers
           
    }
   
    /* exported Photographer */
    /* eslint-disable */
    
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log(photographers)
        
        photographers.forEach((photographer) => {
            const photographerModel = new Photographer(photographer);
            const userCardDOM = photographerModel.createhtml();
            photographersSection.innerHTML=photographersSection.innerHTML+(userCardDOM);
            
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const  photographers  = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
