(function(win , doc){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.crossOrign = "Anonymous"; //防止跨域错误
    // var imageData = ctx.getImageData(0,0,);

    function screenShot(option){
        var InitObject = {
            targetElement: '#uploadPhoto'
        }
        function init(option){
            this.status = Object.assign(InitObject,option);

        }
        // function a(){}c
        function toSVG(){}
        function toPng(){}
        function toBase64(){}
        init
        return {
            toSVG,
            toPng,
            toBase64,
            
        }
    }
    class ScreenShot{

        constructor(option){
            this.status = Object.assign(InitObject,option); 
            
        }
        
        toSVG(){}
        toPng(){}
        toBase64(){}

    }
    function getElementImageData(targetElement){
        
        var targetPositionObject = targetElement.getBoundingClientRect();
        var imageData = {
            width: targetPositionObject.width,
            height: targetPositionObject.height,
            top: targetPositionObject.top,
            left: targetPositionObject.left,
            data: ctx.getImageData(this.left,this.top,width,height)
        }
        return imageData;
    }
    
})(window || {},document || {});