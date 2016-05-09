/**
 * Created by zeqingzhang on 5/5/16.
 */

var object = {
    name: "terry"
};

if(object){
    console.log(true);
}else{
    console.log(false);
}


    myDate = new Date(1000*1462431600);

console.log(myDate.toString().substring(0,21));
console.log(myDate.toLocaleString());
console.log(myDate.toUTCString());
var index = 5;
console.log(index%2);
console.log(index);

var colorIndex = -1;
var colorArray = ["table-success"," ","table-warning"," ","table-danger"," ", "table-info"," "];
function getDifferentColor() {
    if (colorIndex == 7) {
        colorIndex = 0;
        return colorArray[7];
    } else {
        return colorArray[colorIndex++];
    }

}

for(var i = 0; i<20; i++){
    console.log(getDifferentColor());
}