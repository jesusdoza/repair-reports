
//repair entry class will contain all information necessary for repair process
class RepairEntry{
    constructor(title_='test title', tags_='test tags', instructionsArr_ =[]){
        this.title =title_;
        this.tags=tags_;
        this.instructionsArr = instructionsArr_ // will be an array of objects containing steps for repair optional images and paragraphs 
        
    }

    print(){
        console.log(`title : ${this.title} tags: ${this.tags}`)
    }

    makeJson(){
        return JSON.stringify(this)
    }

    addStep(step_){
        this.instructionsArr.push(step_)
    }

}





let a = new RepairEntry()

console.log(a.makeJson())