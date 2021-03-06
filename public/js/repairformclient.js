

// const Procedure = require('./Procedure')
const form = document.querySelector("form");


class Repair{
    constructor(procedures=[],searchtags='blank tags',title='blank title', board='no board type', engine='no engine make'){
        this.procedureArr=procedures;
        this.searchtags=searchtags;
        this.title=title;
        this.boardType=board;
        this.engineMake=engine;
    }

    addProcedure(proc) {
        this.procedureArr.push(proc);
        this.getObj()
    }

    getObj(){
        return this;
    }

    buildRepair (procArr){
        // console.log(procArr)
            this.procedureArr = procArr;
            this.boardType=document.querySelector('#board-type').value;
            this.searchtags= document.querySelector('#search-tags').value;
            this.title =  document.querySelector('#rep-title').value;
            this.engineMake = document.querySelector('.model input:checked').value;
        
        return this
    }
    
}



document.addEventListener('DOMContentLoaded', async () => {
    console.log(`doc loaded repair form`)
    
    const signResponse = await fetch('/signform'); //fetch signature from server
    const signData = await signResponse.json();



    //upload url
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    
    // const form = document.querySelector("form");
    const instructions =form.querySelector('#instructions')


    // =========================================================
    //event listeners
    // =========================================================

    instructions.addEventListener('click',(event)=>{
        

        
        const action = event.target.dataset.action

        //parent of target
        const procedure = event.target.closest('.procedure')


        switch (action) {
           
            case 'add-image':
                console.log(`add image`)
                addImageToProcedure(event);
                break;
            
            case 'remove-image':
                removeImage(event);
                break;
            case 'add-procedure':
                addProcedureToInstructions(event);
                break;

            default:
                break;
        }

    })
})




 //submit form event
 form.addEventListener("submit",async (event) => {
    event.preventDefault();
    const allProcedures = Array.from( document.querySelectorAll('.procedure'))
    const signResponse = await fetch('/signform'); //fetch signature from server
    const signData = await signResponse.json();
    
    const statusIcons = document.querySelector('.status-icons')
        statusIcons.classList.toggle("hidden");
    const statusMessage = document.querySelector('.loading-text')


    procedurePromises=Array.from(allProcedures).map( async(proc,index)=>{

        //upload images if any
        const images= await uploadImages(proc, signData)

        const procedure = new Procedure();
           procedure.images= images.links; // add images urls Array
           procedure.thumbs = images.thumbs;
           procedure.procedureNum = index; //identifying sequence number
           procedure.instructions = proc.querySelector('.instructions').value
        return (procedure)
       
    })

    //display status at this point
        statusMessage.innerHTML+="<br>Uploading images"

    const procArr = await Promise.all(procedurePromises) 

    console.log(procArr)

        statusMessage.innerHTML+="<br>Uploading Done";

    const repair = new Repair
        repair.buildRepair(procArr)


        statusMessage.innerHTML+="<br>Saving Report"

    const repairId = await postToServer(repair);

    console.log(repairId)
    // statusIcons.classList.toggle("hidden");
    location.assign(`/repairinfo/${repairId}`);

});





// ==========================================================================
// FUNCTIONS
// ==========================================================================


//new with class methods
// async function buildProcedures(allProcedures, signData){
//     //for each procedure upload its images 
    
//     procedurePromises=Array.from(allProcedures).map( async(proc,index)=>{
//         let procedure = new Procedure();

//             procedure.images= await uploadImages(proc, signData)
//             procedure.procedureNum=index
//             procedure.instructions = proc.querySelector('.instructions').value
            
//             // console.log(procedure.images)
//         return (procedure)
       
//     })

//    const procArr = await Promise.all(procedurePromises) 

//     return procArr

// }





//add another procedure to instructions
function addProcedureToInstructions(event){
    const procedure = new Procedure()
    // console.log(`add procedure`)

    const instructions = event.target.closest('#instructions');
        instructions.dataset.currentprocid++;
        
    const parentProcedure = event.target.closest('.procedure')//new
    

    const li = document.createElement('li');
        li.dataset.procedureid=instructions.dataset.currentprocid;
        li.classList.add('procedure')
        li.innerHTML=procedure.procedureHtml();
    

    // instructions.appendChild(li);
    parentProcedure.insertAdjacentElement("afterend",li)
}




async function postToServer(repairObj){

    try{
        // let repair = JSON.stringify({repairObj})

        const response = await fetch(`/repairform`,{
             method: 'post',
             headers: {'Content-Type':'application/json'},
             body:JSON.stringify(repairObj)
         }).then(data=>data.json())
     
     
         
         const repairId = await response.insertedId
         console.log(`post serv respons`,response)
         console.log(`post serv respons`,repairId)
     
         return repairId;
        //  location.assign(`/repairinfo/${repairId}`)
    }
   
    catch(error){
        console.error(`post error`)
    }
    
}





 function buildRepair (procArr){
    const repair =  new Repair()
    // console.log(procArr)
        repair.procedureArr = procArr;
        repair.boardType=document.querySelector('#board-type').value;
        repair.searchtags= document.querySelector('#search-tags').value;
        repair.title =  document.querySelector('#rep-title').value;
        repair.engineMake = document.querySelector('.model input:checked').value;
    
    return repair
}


// async function buildProcedures(allProcedures, signData){
//     //for each procedure upload its images 
    
//     procedurePromises=Array.from(allProcedures).map( async(proc,index)=>{
//         let procedure = new Procedure();

//             procedure.images= await uploadImages(proc, signData)
//             procedure.procedureNum=index
//             procedure.instructions = proc.querySelector('.instructions').value
            
//             // console.log(procedure.images)
//         return (procedure)
       
//     })

//    const procArr = await Promise.all(procedurePromises) 

//     return procArr

// }





//return image links
 async function uploadImages(element, signData){

    // const files=element
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const formData = new FormData();
    
    //get images
    const imagesToUpload=getImages(element);

            let imageLinksPromise = Array.from(imagesToUpload).map(async (filesList)=>{
 
                for (let i = 0; i < filesList.length; i++) {
            
                    let file = filesList[i];
            
                    formData.append("file", file);
                    formData.append("api_key", signData.apikey);
                    formData.append("timestamp", signData.timestamp);
                    formData.append("signature", signData.signature);
                    // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); //some form of transformation dont need
                    formData.append("folder", "cata"); //put this file in folder named cata
                
                    const response = await fetch(url, {
                            method: "POST",
                            body: formData
                        }).then(data => data.json());
                    
                    // imageLinks.push(response.url)
                    console.log(`link`,response.url)
                    return response.url    
                }
    
            })

            // console.log(`images promises`,imageLinksPromise)
            let linksResolved = await Promise.all(imageLinksPromise)
            let thumbsLinks = linksResolved.map((link)=>{

                //small thumb
                // return link.replace('/upload/','/upload/t_media_lib_thumb/')
                //larger thumb
                return link.replace('/upload/','/upload/c_scale,w_400/')

                // https://res.cloudinary.com/da6jwh1id/image/upload/c_scale,w_400/v1657981954/cata/hkzv8i0p6ghwfktk8ah8.jpg
            })
            // console.log(`resolved links`,linksResolved)


            return {links:linksResolved,thumbs:thumbsLinks}
    
}


//get images if any and return them
function getImages(element){
    let files = []

    // get all elements with files
    const allUploads = element.querySelectorAll("[type=file]");

        allUploads.forEach((element)=>{

            //if a file is attached 
            if(element.files.length >0){
                files.push(element.files)
            }
        })

return files;
}




function removeImage(event){

    const procedure = event.target.closest('.procedure');

        const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles--;

    //li the image input is in
    const imageListItem = event.target.closest('li');

    imageListItem.remove();


}

//preview image on page locally when input for image is changed
function previewImage(event){

    const uploadnum= event.target.closest('.uploads').dataset.totalfiles    


    const currentUpload = event.target.closest('.imageuploaded') 
        const image = currentUpload.querySelector('img');
            image.src = URL.createObjectURL(event.target.files[0]);
            image.alt='image preview';
            image.classList.add('img-mini');

        
}




// add extra image to repair procedure

function addImageToProcedure(event){
    //parent line item
    const procedure = event.target.closest('.procedure')

    const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles++; //amount of files
        uploadList.dataset.uploadId++; //id for uploading

    let uploadId =uploadList.dataset.uploadId;

    const image = document.createElement('img')
        image.alt='image preview';
        image.classList.add('img-mini');

    const input = document.createElement('input');
        input.dataset.uploadId = uploadId;
        input.name=`picture${uploadId}`;
        input.type='file';
        input.accept="image/*";
        input.onchange=(event)=>{previewImage(event)}

    const removeButton = document.createElement('span');
        removeButton.classList.add('button', 'clickable');
        removeButton.innerText='remove item';
        removeButton.dataset.action='remove-image';
        removeButton.dataset.uploadId = uploadId;
        
    const li = document.createElement('li');
        li.classList.add('imageuploaded');
        li.appendChild(image)
        li.appendChild(input);
        li.appendChild(removeButton);
    

    uploadList.appendChild(li);

   
}

