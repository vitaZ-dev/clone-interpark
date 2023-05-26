/**
 * 업데이트 : 리스트 목록 출력 함수화 작업
 * 				 : 데이터 파싱 및 슬라이드 제작
 */
window.addEventListener("load", function () {
  // tour 데이터 파싱 및 슬라이드 제작
  function parseTour(_cate) {
    const tourXhttp = new XMLHttpRequest();
    tourXhttp.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTourSlide(data);
      }
    };

    if (_cate === "망설이면 품절") {
      tourXhttp.open("GET", "../json/tourdataJS.json");
    } else if (_cate === "패키지") {
      tourXhttp.open("GET", "../json/tourdata1.json");
    } else if (_cate === "국내숙소") {
      tourXhttp.open("GET", "../json/tourdata2.json");
    } else if (_cate === "해외숙소") {
      tourXhttp.open("GET", "../json/tourdata3.json");
    }
    tourXhttp.send();
  }
  parseTour("망설이면 품절");

  let tourSwiper;
  function makeTourSlide(_data) {
    let swTourHtml = ``;
    for (let i = 0; i < _data.tour_total; i++) {
      let obj = _data[`tour_${i + 1}`];
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
    if (tourSwiper) {
      tourSwiper.destroy();
    }
    tourSwiper = new Swiper(".sw-tour", {
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
          slidesPerGroup: 2,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 3,
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  // 버튼들에 이벤트
  let btns = document.querySelectorAll(".tour .btns a");
  btns.forEach((item) => {
    item.onclick = (event) => {
      event.preventDefault();
      parseTour(item.innerHTML);

      btns.forEach((el) => {
        el.classList.remove("btns-active");
      });
      item.classList.add("btns-active");
    };
  });
  // 포커스 적용
  btns[0].classList.add("btns-active");
});
