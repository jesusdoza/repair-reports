const cloudinary = require('cloudinary').v2;
require('dotenv').config()






// File upload
// cloudinary.uploader.upload('pic01.jpg', { tags: 'basic_sample' }, function (err, image) {
//     console.log();
//     console.log("** File Upload");
//     if (err) { console.warn(err); }
//     console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
//     console.log("* " + image.public_id);
//     console.log("* " + image.url);
//   });


class ImageUpload{
  constructor(name_, key_, secret_){
    
    // this.name=name;
    // this.key=key;
    // this.secret=secret;
    let name=name_;
    let key=key_;
    let secret=secret_;

  }


  //set up clodinary 
  config(name, key, secret){


    name = name;
    key=key;
    secret = secret;
    // cloudinary.config({
    // cloud_name: this.name,
    // api_key:this.key,
    // api_secret:this.secret,

  // });
  }



  read(){
    console.log(name, key, secret)
  }

}



// test
let test = new ImageUpload('orig name','orig key', 'orig secret')

test.read()

test.config('configured name', 'configured key', 'configured secret')

test.read()

// module.exports=ImageUpload;