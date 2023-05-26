/**
 * 기능 : 티켓 리스트 슬라이드 코드
 * 업데이트 : 리스트 목록 출력 함수화 작업
 */
window.addEventListener("load", function () {
  function parseTicket(_cate) {
    const ticketXhttp = new XMLHttpRequest();
    ticketXhttp.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTicketSlide(data);
      }
    };

    switch (_cate) {
      case "뮤지컬":
        ticketXhttp.open("GET", "../json/ticketdata1.json");
        break;
      case "콘서트":
        ticketXhttp.open("GET", "../json/ticketdataconcert.json");
        break;
      case "연극":
        ticketXhttp.open("GET", "../json/ticketdata2.json");
        break;
      case "클래식/무용":
        ticketXhttp.open("GET", "../json/ticketdata3.json");
        break;
      case "스포츠":
        ticketXhttp.open("GET", "../json/sports.json");
        break;
      case "레저/캠핑":
        ticketXhttp.open("GET", "../json/ticketdata5.json");
        break;
      case "전시/행사":
        ticketXhttp.open("GET", "../json/ticketexhibition.json");
        break;
      case "아동/가족":
        ticketXhttp.open("GET", "../json/ticketdata7.json");
        break;
      default:
        break;
    }
    ticketXhttp.send();
  }
  parseTicket("뮤지컬");
  // parseTicket("콘서트");

  let ticketSwiper;
  function makeTicketSlide(_data) {
    let swTicketHtml = ``;
    for (let i = 0; i < _data.ticket_count; i++) {
      let obj = _data[`ticket_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="#" class="ticket-link">
					<div class="ticket-img">
						<img src="./images/${obj.pic}" alt="${obj.alt || obj.title}" />
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
							<li><span class="ticket-sale"
							${obj.sale ? `style = "display: inline-block;"` : `style = "display: none;"`}>
							${obj.sale}</span></li>
						</ul>
					</div>
				</a>
			</div>
			`;
      /*
			${cate ? (style = "display:block;") : (style = "display: none;")}>
			*/
      swTicketHtml += temp;
    }
    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;
    // swiper
    if (ticketSwiper) {
      ticketSwiper.destroy();
    }
    ticketSwiper = new Swiper(".sw-ticket", {
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

  // 버튼들에 이벤트
  let btns = document.querySelectorAll(".ticket .btns a");
  btns.forEach((item) => {
    item.onclick = (event) => {
      event.preventDefault();
      parseTicket(item.innerHTML);

      btns.forEach((el) => {
        el.classList.remove("btns-active");
      });
      item.classList.add("btns-active");
    };
  });
  // 포커스 적용
  btns[0].classList.add("btns-active");
});
