const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
   user:{
    type:String,
   },
   role:{
    type:String,
    default:'1'
   }
  
  })

//parent schema
const GroupSchema = new mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
    members:{
        type:[MemberSchema]
    }
},
{
    collection:"repair-reports"
}
)




module.exports  = mongoose.model('Group', GroupSchema)