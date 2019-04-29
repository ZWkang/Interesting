export class cyclotron {
    InitState = {
            dampingFactor : 0.93,
            historySize : 5
    }
    
    constructor(option){
        this.InitState = Object.assign(InitState,option);    
    }
    init () {
        requestAnimationFrame(this.main)
    }
    attachEvent(OrignElement){
        
    }
    mosuedownEvent(){

    }
    mosuemoveEvent(){}
    mosueleaveEvent(){}
    main(){
        
    }


}