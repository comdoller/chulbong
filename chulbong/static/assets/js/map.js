document.getElementById('map').addEventListener('click', function() {
    document.getElementById('regPoint').style.display = 'block';
    });

var lat, lng;

var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(0, 0),
        level: 1
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
var geocoder = new kakao.maps.services.Geocoder();

{% if where %}

// 주소로 검색할 경우
geocoder.addressSearch('{{where}}', function(result, status) {
     if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
     }
     else{
        alert("지역명으로 검색해주세요.");
        location.replace('https://chulbong.kr');
    }
});

{% else %}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude+'';
        lng = position.coords.longitude+'';

        var locPosition = new kakao.maps.LatLng(lat, lng);
            displayMarker(locPosition);
        });
}

function displayMarker(locPosition) {
    map.setCenter(locPosition);
}

{% endif %}

var positions = [
    {% for s in points %}
    {
        {% if s.content %}
        title : '{{ s.content }}',
        latlng: new kakao.maps.LatLng({{ s.lat }}, {{ s.lng }})

        {% if s.c_cnt or s.p_cnt %}
        ,c_cnt : {{s.c_cnt}},
        p_cnt : {{s.p_cnt}}
        {% endif %}

        {% else %}
        latlng: new kakao.maps.LatLng({{ s.lat }}, {{ s.lng }})
        {% endif %}
    },
    {% endfor %}
];

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i ++) {
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng,
        title : positions[i].title,
        image : markerImage
    });

    marker.c_cnt = positions[i].c_cnt;
    marker.p_cnt = positions[i].p_cnt;


    kakao.maps.event.addListener(marker, 'click', function() {

    document.getElementById('c_cnt').innerHTML = '';
    document.getElementById('p_cnt').innerHTML = '';
    document.getElementById('detail_p').innerHTML = '';

    if ( this['c_cnt'] != undefined && this['c_cnt'] != 0 ) {
        document.getElementById('c_cnt').innerHTML = '철봉<b>  ' + this['c_cnt'] + '</b>';
    }

    if ( this['p_cnt'] != undefined && this['p_cnt'] != 0) {
        document.getElementById('p_cnt').innerHTML = '평행봉<b>  ' + this['p_cnt'] + '</b>';
    }

    document.getElementById('detail_p').innerHTML = this['Fb'];
    modal('detail_modal');
    });
}

var marker = new kakao.maps.Marker({
    position: map.getCenter()
});

marker.setMap(map);

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    var latlng = mouseEvent.latLng;
    marker.setPosition(latlng);

    lat = latlng.getLat()+'';
    lng = latlng.getLng()+'';
});


$('#regPoint').click(function(){
    if( lat >= 38.30 || lng <= 126 || lng >= 129.6 ){
        alert("위치를 다시 확인해주세요.");
        return;
    }

    modal('add_modal');

    $('#add_info').click(function(){
        var c_cnt = document.getElementById("chulbong_cnt").value,
            p_cnt = document.getElementById("Parallel_cnt").value,
            content_add = document.getElementById('content_add').value;

        var emptyCheck = document.getElementById("content_add").value;

        if( emptyCheck ){
            $.ajax({
                url: 'regPoint',
                data: {
                    'lat': lat,
                    'lng': lng,
                    'content' : content_add,
                    'c_cnt' : c_cnt,
                    'p_cnt' : p_cnt
                },
                dataType: 'json',
                success: function(response){
                alert("감사합니다 :)");
                }
           });

           $("#background").trigger("click");
        }

        else {
            alert("설명을 추가해주세요");
            return;
         }
    });

});