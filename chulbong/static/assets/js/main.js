
        /*
            모달창
            저작자 : 슷호브 New 훌로구
            원문주소 : https://stove99.github.io/javascript/2019/04/19/javasript-center-modal/
            감사합니다.
        */

            function modal(id) {
                var zIndex = 9999;
                var modal = document.getElementById(id);

                // 모달 div 뒤에 희끄무레한 레이어
                var bg = document.createElement('div');
                bg.id='background';
                bg.setStyle({
                    position: 'fixed',
                    zIndex: zIndex,
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    // 레이어 색갈은 여기서 바꾸면 됨
                    backgroundColor: 'rgba(0,0,0,0.4)'
                });
                document.body.append(bg);

                // 뒷배경 클릭시 모달 닫기
                document.getElementById('background').addEventListener('click', function() {
                bg.remove();
                modal.style.display = 'none';
                });

                document.getElementById('message_submit').addEventListener('click', function() {
                alert("감사합니다. :)");
                bg.remove();
                modal.style.display = 'none';
                });

                modal.setStyle({
                    position: 'fixed',
                    display: 'block',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

                    // 시꺼먼 레이어 보다 한칸 위에 보이기
                    zIndex: zIndex + 1,

                    // div center 정렬
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    msTransform: 'translate(-50%, -50%)',
                    webkitTransform: 'translate(-50%, -50%)'
                });
            }

            // Element 에 style 한번에 오브젝트로 설정하는 함수 추가
            Element.prototype.setStyle = function(styles) {
                for (var k in styles) this.style[k] = styles[k];
                return this;
            };

            document.getElementById('info_wraper').addEventListener('click', function() {
                // 모달창 띄우기
                modal('info_modal');
            });

            document.getElementById('message_wraper').addEventListener('click', function() {
                // 모달창 띄우기
                modal('message_modal');
            });

           /* document.getElementById('detail_wraper').addEventListener('click', function() {
                // 모달창 띄우기
                modal('detail_modal');
            });*/


