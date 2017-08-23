console.log('Loaded!');
var element=document.getElementById('main_text');
element.innerHTML='yo!';
var img=document.getElementById('madi');
var marginLeft=30;
function moveRight(){
    marginLeft=marginLeft+3;
    img.style.marginLeft=marginLeft+'px';
}
madi.onclick = function(){
    madi.style.marginLeft='50px';
    var interval=setInterval(moveRight,50);
};
