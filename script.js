let dataURL = [];
let zip = new JSZip();
let perDimension = [20, 29, 40, 60, 76, 83.5, 1024]

function main(e){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.onload = function () {
            perDimension.forEach(number=>{
                if(number != 1024){
                    canvas.width = number;
                    canvas.height = number;
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, number, number);
                    dataURL.push({name: number+'X'+number+'@1x', data: canvas.toDataURL()});
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = number*2;
                    canvas.height = number*2;
                    ctx.scale(2,2);
                    ctx.drawImage(img, 0, 0, img.width*2 , img.height*2, 0, 0, number*2, number*2);
                    dataURL.push({name: number+'X'+number+'@2x', data: canvas.toDataURL()});
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = number*3;
                    canvas.height = number*3;
                    ctx.scale(3,3);
                    ctx.drawImage(img, 0, 0, img.width*3, img.height*3, 0, 0, number*3, number*3);
                    dataURL.push({name: number+'X'+number+'@3x', data: canvas.toDataURL()});
                } else {
                    canvas.width = number;
                    canvas.height = number;
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, number, number);
                    dataURL.push({name: number+'X'+number+'@1x', data: canvas.toDataURL()});
                }

            })
        }
        img.src = event.target.result;
        document.getElementById('image').style.backgroundImage = "url(" +img.src + ")";
        document.getElementById('image-text').style.display = "none";
    }
    reader.readAsDataURL(e.target.files[0]);
}

function download(){
    dataURL.forEach(item=>{
        item.data = item.data.replace(/^data:image\/(png|jpg);base64,/, "")
        zip.file(item.name + ".png", item.data, {base64: true});
    })
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "icons.zip");
        document.getElementById('image').style.backgroundImage = "";
        document.getElementById('image-text').style.display = "block";
    });
}

function revokeInput(){
    document.getElementById('input').click()
}