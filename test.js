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

console.log(myDate.toString().substring(0,4));
console.log(myDate.toLocaleString());
console.log(myDate.toUTCString());