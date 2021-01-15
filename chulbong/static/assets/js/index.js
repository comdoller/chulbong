/* Android Viewport height fix
stackoverflow : https://stackoverflow.com/questions/8556933
*/
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.write('<meta name="viewport" content="width=device-width,height='+window.innerHeight+', initial-scale=1.0">');
}

document.getElementById('submit').addEventListener('click', function() {
    if(document.getElementById("where").value){
        document.getElementById('search').submit();
        }
    else{
        alert("지역을 입력해주세요.");
    }
});
