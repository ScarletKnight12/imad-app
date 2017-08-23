console.log('Loaded!');
var element=document.getElementById('main_text');
element.innerHTML='yo!';
var img=document.getElementById('madi');
var marginLeft=10;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
madi.onclick = function(){
    madi.style.marginLeft='100px';
    var interval=setInterval(moveRight,100);
};
