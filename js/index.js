window.onload = function () {
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
  xhttp.open("GET", "prodata.json");
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

  /* shopping */
  let shoppingData;
  const shopXhttp = new XMLHttpRequest();
  shopXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      shoppingData = JSON.parse(req.response);
      makeShoppingSlide();
    }
  };
  shopXhttp.open("GET", "shoppingdata.json");
  shopXhttp.send();
  function makeShoppingSlide() {
    let swShoppingHtml = ``;
    for (let i = 0; i < shoppingData.good_count; i++) {
      let obj = shoppingData[`good_${i + 1}`];
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
    let shoppingSwiper = new Swiper(".sw-shopping", {
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

  /* tour */
  let tourData;
  const tourXhttp = new XMLHttpRequest();
  tourXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      tourData = JSON.parse(req.response);
      makeTourSlide();
    }
  };
  tourXhttp.open("GET", "tourdata.json");
  tourXhttp.send();
  function makeTourSlide() {
    let swTourHtml = ``;
    for (let i = 0; i < tourData.tour_total; i++) {
      let obj = tourData[`tour_${i + 1}`];
      let cate = obj.category;
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="tour-link">
					<div class="tour-img">
						<img src="images/${obj.pic}" alt="${obj.alt}" />
					</div>
					<div class="tour-info">
						<ul class="tour-info-list">
						<li ${cate ? (style = "display:block;") : (style = "display: none;")}>
							<span class="tour-cate">${obj.category}</span>
						</li>
							<li>
								<span class="tour-title">${obj.title}</span>
							</li>
							<li>
								<span class="tour-place">${obj.place}</span>
							</li>
							<li>
								<span class="tour-price"><b>${obj.price}</b>원~</span>
							</li>
						</ul>
					</div>
				</a>
			</div>
			`;
      swTourHtml += temp;
    }
    let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
    swTourWrapper.innerHTML = swTourHtml;
    // Swiper
    let tourSwiper = new Swiper(".sw-tour", {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".tour .sw-next",
        prevEl: ".tour .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 24,
          slidesPerView: 2,
          //화면 당 움직일 슬라이드의 개수
          slidesPerGroup: 2,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 3,
          //화면 당 움직일 슬라이드의 개수
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  /* ticket */
  let ticketData;
  const ticketXhttp = new XMLHttpRequest();
  ticketXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      ticketData = JSON.parse(req.response);
      makeTicketSlide();
    }
  };
  ticketXhttp.open("GET", "ticketdata.json");
  ticketXhttp.send();
  function makeTicketSlide() {
    let swTicketHtml = ``;
    for (let i = 0; i < ticketData.ticket_count; i++) {
      let obj = ticketData[`ticket_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="#" class="ticket-link">
					<div class="ticket-img">
						<img src="./images/${obj.pic}" alt="${obj.alt}" />
						<span class="ticket-rank">${obj.rank}</span>
					</div>
					<div class="ticket-info">
						<ul class="ticket-info-list">
							<li>
								<span class="ticket-title">${obj.title}</span>
							</li>
							<li>
								<span class="ticket-hall">${obj.hall}</span>
							</li>
							<li>
								<span class="ticket-date">${obj.date}</span>
							</li>
							<li><span class="ticket-sale">${obj.sale}</span></li>
						</ul>
					</div>
				</a>
			</div>
			`;
      swTicketHtml += temp;
    }
    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;
    // swiper
    let ticketSwiper = new Swiper(".sw-ticket", {
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      slidesPerView: 5, //5 대신 "auto"
      spaceBetween: 10,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  /* live */
  let liveData;
  const liveXhttp = new XMLHttpRequest();
  liveXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      liveData = JSON.parse(req.response);
      makeLiveSlide();
    }
  };
  liveXhttp.open("GET", "livedata.json");
  liveXhttp.send();
  function makeLiveSlide() {
    let swLiveHtml = ``;
    for (let i = 0; i < liveData.live_total; i++) {
      let obj = liveData[`live_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="live-link">
					<div class="live-img">
						<img src="./images/${obj.pic}" alt="${obj.picAlt}" />
					</div>
					<div class="live-info">
						<div class="live-info-top">
							<span class="live-info-cate">${obj.cate}</span>
							<p class="live-info-title">${obj.title}</p>
						</div>
						<div class="live-info-main">
							<p class="live-info-date">${obj.date}</p>
							<p class="live-info-time">${obj.time}</p>
						</div>
						<div class="live-info-bottom clearfix">
							<div class="live-info-thumb">
								<img src="./images/${obj.thumb}" alt="${obj.thumbAlt}" />
							</div>
							<div class="live-info-desc">
								<p class="live-info-desc-title">${obj.desTitle}</p>
								<p class="live-info-desc-price">
									<em>${obj.desRatio}%</em> <b>${obj.desPrice}</b>원
								</p>
							</div>
						</div>
					</div>
				</a>
			</div>
			`;
      swLiveHtml += temp;
    }
    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;
    // swiper
    let liveSwiper = new Swiper(".sw-live", {
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      slidesPerView: 4,
      spaceBetween: 10,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  /* books */
  let booksData;
  const booksXhttp = new XMLHttpRequest();
  booksXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      booksData = JSON.parse(req.response);
      makeBooksSlide();
    }
  };
  booksXhttp.open("GET", "booksdata.json");
  booksXhttp.send();
  function makeBooksSlide() {
    let swBooksHtml = ``;
    for (let i = 0; i < booksData.book_total; i++) {
      let obj = booksData[`book_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="books-link">
					<div class="books-img">
						<img src="./images/${obj.pic}" alt="${obj.alt}" />
					</div>
					<div class="books-info">
						<p class="books-info-title">New ${obj.title}</p>
						<p class="books-info-price"><em>${obj.price}</em>원</p>
					</div>
				</a>
			</div>
			`;
      swBooksHtml += temp;
    }
    let swBooksWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBooksWrapper.innerHTML = swBooksHtml;
    // swiper
    let booksSwiper = new Swiper(".sw-books", {
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      slidesPerView: 3,
      spaceBetween: 19,
      grid: {
        rows: 4,
        fill: "row",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
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
  eventXhttp.open("GET", "eventdata.json");
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
