class FileObject {
    constructor(obj){
        Object.keys(obj).forEach((v)=>{
            this[v] = (obj[v] instanceof Object) ? null : obj[v];
        })
    }
    get name(){
        return this;
    }
    toJSON(){
        name,
        size,
        data,
        type
    }
}
class FileReaderUntil{
    constructor(options){
        const config = {
            'SourceElement':'',
            'TargetElement':'',
            'handlerFileEventCallback':'',
            'handlerDropEventClaaback':'',
            'dragenter':()=>{},
            'dragover':()=>{},
            'drop':()=>{},
            'drag':true
        }
        Object.keys(options).forEach((v,index)=>{
            this[v] = options[v];
        })
    }
    init(){
        this.registerEvent();
    }
    registerEvent(){

    }
    removeListener(){

    }
    dropEventRegister(){
        
    }
    fileHandleRegister(){

    }
    resultHandleRegister(){

    }
    inputChangeEventRegister(){
        this.SourceElement.addEventListener('change',(ev)=>{
            let target = event.target ;
            if(!(target instanceof HTMLInputElement)){
                throw new Error ('target was Error');
            }
            let files = target.files;
            if(files.length <= 0){
                console.log(`you dont choose file`);
            }else if(files.length == 0){
                console.log(`you choose one file`)

            }else{
                console(`you choose more than one file`)
            }

            files = Array.from(files);

        })
    }



}


function bytesToGPEZY(byte = 0){
    let nBytes = byte|0;
    let sOutput = nBytes + " bytes";
    // optional code for multiples approximation
    for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
      sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
    }
    return sOutput;
}