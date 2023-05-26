window.onload = function () {
  // 모달창 처리
  const $body = document.querySelector("body");
  $body.classList.add("modal-active");
  const modal = document.querySelector(".modal");
  modal.onclick = function () {
    $body.classList.remove("modal-active");
    this.style.display = "none";
  };

  // 위로 이동하기
  const goTop = document.querySelector(".gotop");
  //goTop 클릭 처리
  goTop.addEventListener("click", function () {
    // 위로 슬라이딩 코드 - 웹브라우저 내장
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // 애니메이션 전용 js 라이브러리가 있다
  });

  // sw-promotion

  // 1. 백틱(``)을 이용한 html (자동)생성
  // 2. json 데이터로 뽑아보기=외부 데이터에서 파일을 불러오는 형태
  /////

  // 2-1. for 문을 이용한 데이터 html 생성
  // json 형태(=Js Object Notation)의 데이터가 전달된다
  // prodata.json 을 불러와서 배치한다.
  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    // console.log(req);
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      //현재 전달된 문자들은 json이 아님.
      // req.response 는 데이터 타입이 문자열임
      // 문자열을 json 객체로 변경하는 작업을 해야 함!
      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };
  xhttp.open("GET", "json/prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];
      let temp_html = `
				<div class="swiper-slide">
					<a href="${obj.link}">
						<img src="./images/${obj.img}" alt="프로모션${obj.name}"/>
					</a>
				</div>
			`;
      swPromotionHtml += temp_html;
    }
    //
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;
    // Swiper
    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000, //1s
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        //el=element=요소
        el: ".sw-promotion-pg",
        clickable: true,
      },
      //반응형
      breakpoints: {
        //760px 이상일 때 2장씩
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  /* event */
  let eventData;
  const eventXhttp = new XMLHttpRequest();
  eventXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      eventData = JSON.parse(req.response);
      makeEventSlide();
    }
  };
  eventXhttp.open("GET", "json/eventdata.json");
  eventXhttp.send();
  function makeEventSlide() {
    let swEventHtml = ``;
    for (let i = 0; i < eventData.event_total; i++) {
      let obj = eventData[`event_${i + 1}`];
      temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="events-link">
					<img src="./images/${obj.pic}" alt="${obj.alt}" />
				</a>
			</div>
			`;
      swEventHtml += temp;
    }
    let swEventWrapper = document.querySelector(".sw-events .swiper-wrapper");
    swEventWrapper.innerHTML = swEventHtml;
    // Swiper
    let eventSwiper = new Swiper(".sw-events", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
      breakpoints: {
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      },
      navigation: {
        nextEl: ".event .sw-next",
        prevEl: ".event .sw-prev",
      },
    });
  }
};
