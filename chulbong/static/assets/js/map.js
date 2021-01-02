
document.getElementById('map').addEventListener('click', function() {
    document.getElementById('regPoint').style.display = 'block';
    });

{% if where %}

var lat, lng;

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.863423999999995, 127.7394944), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch('{{where}}', function(result, status) {

    // 정상적으로 검색이 완료됐으면
     if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    }
});

{% else %}

 var lat, lng;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude+'';
            lng = position.coords.longitude+'';

            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
            center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
            level: 1 // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);

           // 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지
    });
}

// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter()

});

// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    var message = 'lat : ' + latlng.getLat() + ' ';
    message += 'lng :  ' + latlng.getLng();

    lat = latlng.getLat()+'';
    lng = latlng.getLng()+'';
});


$('#regPoint').click(function(){
        $.ajax({
            url: 'regPoint',
            data: {
                'lat': lat,
                'lng': lng
            },
            dataType: 'json',
            success: function(response){
                alert("감사합니다 :)");
                }
        })
    })
});



    }
    else {
        alert("위치정보를 가져올 수 없습니다.");
    }

{% endif %}

// 마커를 표시할 위치와 title 객체 배열입니다
var positions = [

    {% for s in points %}
    {
        latlng: new kakao.maps.LatLng({{ s.lat }}, {{ s.lng }})
    },
    {% endfor %}

];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지
    });
}

// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter()

});

// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    var message = 'lat : ' + latlng.getLat() + ' ';
    message += 'lng :  ' + latlng.getLng();

    lat = latlng.getLat()+'';
    lng = latlng.getLng()+'';
});


$('#regPoint').click(function(){
        $.ajax({
            url: 'regPoint',
            data: {
                'lat': lat,
                'lng': lng
            },
            dataType: 'json',
            success: function(response){
                alert("감사합니다 :)");
                }
        })
    })