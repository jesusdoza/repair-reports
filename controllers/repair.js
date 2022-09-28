// const dataBase = require('../modules/database.js'); //database interface
// const mongoose = require('mongoose');
const Repair = require('../models/Repair')



module.exports.testPost = async (req, res)=>{
    res.send(req.user)
}

module.exports.deletePost = async (req, res)=>{
    res.send('delete not implemented ID: '+ req.params.id)
}

//add repair to database
module.exports.addRepair = async (req, res)=>{
        try {
            //todo destructure req.body to be more visible to what is happening
            // let entry = (req.body)

            let entry = {
                procedureArr: req.body.procedureArr,
                searchtags: req.body.searchtags,
                title: req.body.title,
                boardType: req.body.boardType,
                engineMake: req.body.engineMake,
                createdBy:req.user.username,
                removed:false,
            }
            // console.log(req.user)
            // console.log(`post at /repairform`,entry)

            let result = await Repair.create(entry)
            console.log(`done uploading at server result`,result)

            const repLink= `/repair/${result._id}` //add link to repair

            // console.log(`server response to send`,result)
            res.send({result:entry,link:repLink})
            
        } catch (error) {
            res.status(400).json({message:'failed to save repair', "error":error.message})
        }
    }


    
//retrieve repairs matching query
module.exports.searchRepairs = async (req, res)=>{
    try {
        console.log(`repairsController.searchRepairs`,req.query)
        const searchStr = req.query.searchPhrase
        const results = 
        await Repair.aggregate(
            [
                { 
                  $search: {
                    index: 'repairs_search',
                    text: {
                      query: searchStr,
                    //   path:["title","searchtags","procedureArr","instructions"],
                        path:{'wildcard': '*'},
                      fuzzy:{maxEdits:2,prefixLength:3}
                    }
                  }
                }
              ]);
        res.render('search.ejs',{title:'Search Results',repairs:results});
    } catch (error) {
        res.status(400).json({message:'failed to get repairs', "error":error.message})
    }
}

//get a number of newest repairs
module.exports.getNewestRepairs = async (req, res)=>{
    try {
        console.log(`controller repair.getNewestRepairs`)
        console.log( `number of repairs requested`,req.params.num)
        const numRepairs = 8;

        const results = await Repair.find().sort({_id:-1}).limit(numRepairs);
        console.log( `number of repairs returned`,results.length)
        
        res.render('latest.ejs',{title:'Latest Repairs',repairs:results})
    
    } catch (error) {
        res.status(500).json({message:'failed get repairs', "error":error.message})
    }
}


/// api get repair JSON
module.exports.getRepair = async (req, res)=>{
  
        try{
            // get paremeter from url
           const repairId = req.params.id
        //    const repairObj = await dataBase.findRepair(repairId)//! use model
           const repairObj = await Repair.findOne({_id:repairId}).lean() /// swap to mongoose
    
           console.log(`getting repair JSON`,repairObj)
           res.status(200).json(repairObj)
        }
        catch(err){
           res.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err})
       }
}



/// render single repair 
module.exports.getRepairPage = async (req, res)=>{
  
    try{
        // get paremeter from url
       const repairId = req.params.id
    //    const repairObj = await dataBase.findRepair(repairId)//! use model
       const repairObj = await Repair.findOne({_id:repairId}).lean() /// swap to mongoose

       res.render('repairinfo.ejs',{title:'Repair Information',repair:repairObj})
    }
    catch(err){
       res.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err.message})
   }


}



module.exports.getSearchPage = async (req, res)=>{
  
    try{
        // get paremeter from ur

       res.render('search-page.ejs',{title:'Search Records'})
    }
    catch(err){
       res.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err.message})
   }



}


