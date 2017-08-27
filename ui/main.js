var button=document.getElementById('counter');
var counter=0;


button.onClick=function(){
 //Make request to counter end point
 
 
 //Capture response and store it in a variable
 
 
 //Render variable in the correct span
 counter = counter+1;
 var span = document.getElementById('count');
 span.innerHTML = counter.toString();
 
};