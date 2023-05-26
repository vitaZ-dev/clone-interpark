/**
 * 작성자 : 홍길동
 * 연락처 : 000@000.net
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 코드
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화 작업
 */
window.addEventListener("load", function () {
  // 메뉴 실행 시(메뉴버튼 클릭 시) 쇼핑 목록 slide 내용 변경
  function parseShopping(_menu) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeShoppingSlide(data);
      }
    };

    // 전달된 매개변수 _menu 에 따라
    // 관련된 json 데이터 불러들이고,
    switch (_menu) {
      case "쎈딜":
        xhr.open("GET", "../json/shoppingdata.json");
        break;
      case "베스트":
        xhr.open("GET", "../json/shoppingdata1.json");
        break;
      case "오늘만특가":
        xhr.open("GET", "../json/shoppingdata2.json");
        break;
      case "어린이날":
        xhr.open("GET", "../json/어린이날.json");
        break;
      /*	
      case "소담상회":
        xhr.open("GET", "../json/shoppingdata4.json");
        break;
			*/

      default:
        break;
    }
    xhr.send();
    // html을 만들어 slide 를 만들어준다.
  }
  parseShopping("쎈딜");

  // 슬라이더는 만들기 전에 삭제하자!
  let shoppingSwiper;
  function makeShoppingSlide(_data) {
    let swShoppingHtml = ``;
    for (let i = 0; i < _data.good_count; i++) {
      let obj = _data[`good_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="good">
					<img src="./images/${obj.pic}" alt="${obj.product}" />
					<div class="good-info">
						<ul class="good-info-list">
							<li>
								<b><span>${obj.ratio}%</span> ${obj.price}원</b>
							</li>
							<li><p>${obj.product}</p></li>
						</ul>
					</div>
				</a>
			</div>
			`;
      swShoppingHtml += temp;
    }
    let swShoppingWrapper = document.querySelector(
      ".sw-shopping .swiper-wrapper"
    );
    swShoppingWrapper.innerHTML = swShoppingHtml;
    // swiper
    // 스와이퍼 삭제 명령어
    // 새로 생성 전에 swiper API 를 이용해서 삭제!
    // null, delete 등으로는 삭제 못함!
    if (shoppingSwiper) {
      shoppingSwiper.destroy();
    }
    shoppingSwiper = new Swiper(".sw-shopping", {
      spaceBetween: 10,
      slidesPerView: 5,
      grid: {
        rows: 2,
        fill: "row",
      },
      navigation: {
        nextEl: ".shopping .sw-next",
        prevEl: ".shopping .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          //화면 당 움직일 슬라이드의 개수
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          //화면 당 움직일 슬라이드의 개수
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  // 버튼 클릭 시 카테고리 변경
  // 대상이 1개인 경우는 querySelector
  // 대상이 여러개인 경우는 querySelectorAll
  // a가 4개라서 querySelectorAll
  const btns = document.querySelectorAll(".shopping .btns a");

  btns.forEach((item) => {
    item.onclick = (event) => {
      event.preventDefault();
      parseShopping(item.innerText);

      btns.forEach((el) => {
        el.classList.remove("btns-active");
      });
      item.classList.add("btns-active");
    };
  });

  // 포커스 적용
  btns[0].classList.add("btns-active");
  // 다른 사이트로 이동
  btns[btns.length - 1].onclick = (event) => {
    event.preventDefault();
    alert("다른 사이트로 이동");
  };
});
