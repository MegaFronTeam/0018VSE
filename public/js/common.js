"use strict";

const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		// Fancybox.bind('[data-fancybox="gallery-with-caption"]', {
		// 	Image: {
		// 		zoom: true,
		// 	},
		// });
		Fancybox.bind('[data-fancybox="gallery-with-caption"]', {
			Toolbar: {
				display: [
					{
						id: "counter",
						position: "center",
					},
					"toggleInfo",
					"zoom",
					"slideshow",
					"fullscreen",
					"thumbs",
					"close",
				],
			},
		
			on: {
				initLayout: (fancybox) => {
					// Create elements
					// ===
		
					// Create left column
					const $leftCol = document.createElement("div");
					$leftCol.classList.add("fancybox__leftCol");
		
					while (fancybox.$container.firstChild) {
						$leftCol.appendChild(fancybox.$container.firstChild);
					}
		
					// Create right column
					const $rightCol = document.createElement("div");
					$rightCol.classList.add("fancybox__rightCol");
					// $rightCol.createElement('button');
					// $rightCol.innerHTML =
					// 	'<p class="mb-2">You can place any content here, such as ads, comments or map</p>';
		
					// Create info-box
					const $info = document.createElement("div");
					const $button = document.createElement("button");
					$button.classList.add('closeBtn');
					$rightCol.appendChild($button);
					$rightCol.appendChild($info);
					fancybox.$info = $info;
		
					// Add elements to DOM
					fancybox.$container.appendChild(fancybox.$backdrop);
		
					fancybox.$container.appendChild($leftCol);
					fancybox.$container.appendChild($rightCol);
		
					fancybox.$leftCol = $leftCol;
					fancybox.$rightCol = $rightCol;
					let closeBtn = document.querySelector('.closeBtn');
					closeBtn.addEventListener('click', function(e) {
						e.preventDefault();
						$('.fancybox__rightCol').removeClass('active');
					});
				},
				"Carousel.ready Carousel.change": (fancybox, carousel, slideIndex) => {
					// Update info-box
					// ===
		
					// Get index of the current gallery item
					slideIndex =
						slideIndex === undefined ? carousel.options.initialPage : slideIndex;
		
					// Get link related to current item
					const $trigger = fancybox.items[slideIndex].$trigger;
					
					// Get data from `data-info` attribute
					const data = $trigger.dataset.info || "";
					const dataTitle = $trigger.dataset.title || "";
					const dataName = $trigger.dataset.name || "";
					
					// Update info
					if (dataTitle != "" || dataName != "") {
						fancybox.$info.innerHTML = 
							`<div class="fancyBox-title">${dataTitle}</div> 
							<div class="fancyBox-name">${dataName}</div> 
							<p>${data}</p>`;
					} else {
						fancybox.$info.innerHTML = 
							`<p>${data}</p>`;
					}
				},
			},
		});
		Fancybox.Plugins.Toolbar.defaults.items.toggleInfo = {
			type: "button",
			class: "fancybox__button--toggleInfo",
			label: "Toggle Info",
			html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.3992 10.8V16.8H12.5992V10.8H11.3992Z" fill="white"/>
			<path d="M11.9992 5.99995C11.3365 5.99995 10.7992 6.53721 10.7992 7.19995C10.7992 7.86269 11.3365 8.39995 11.9992 8.39995C12.662 8.39995 13.1992 7.86269 13.1992 7.19995C13.1992 6.53721 12.662 5.99995 11.9992 5.99995Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22.7992 12C22.7992 17.9646 17.9639 22.7999 11.9992 22.7999C6.03454 22.7999 1.19922 17.9646 1.19922 12C1.19922 6.03528 6.03454 1.19995 11.9992 1.19995C17.9639 1.19995 22.7992 6.03528 22.7992 12ZM21.5992 12C21.5992 17.3019 17.3012 21.6 11.9992 21.6C6.69728 21.6 2.39922 17.3019 2.39922 12C2.39922 6.69802 6.69728 2.39995 11.9992 2.39995C17.3012 2.39995 21.5992 6.69802 21.5992 12Z" fill="white"/>
			</svg>`,
			click: function (event) {
				event.preventDefault();
				$('.fancybox__rightCol').addClass('active');
			},
		};
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.getCurrentYear('.footer__name span');
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.header');
		if (!topNav) return;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		// console.log(scrollTop);

		scrollTop > 160 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		scrollTop > 250 ? topNav.classList.add('fixed-animate') : topNav.classList.remove('fixed-animate');
		scrollTop > 400 ? topNav.classList.add('fixed-show') : topNav.classList.remove('fixed-show');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', () => {
		whenResize();
	}, {
		passive: true
	});

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
	});
	
	let sliderWraps = document.querySelectorAll(".headerBlock");

	for (const sliderWrap of sliderWraps) {

		const swiperFade = new Swiper(sliderWrap.querySelector('.slider--fade-js'), { 
			slidesPerView: 1,
			rewind: true, 
			effect: 'fade',
			speed: 1000,
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: sliderWrap.querySelector('.swiper-button-next'),
				prevEl: sliderWrap.querySelector('.swiper-button-prev'),
			},
			scrollbar: {
				el: sliderWrap.querySelector(".swiper-scrollbar"),
				draggable: true,
			},
		});
		
		const swiperText = new Swiper(sliderWrap.querySelector('.slider--text-js'), { 
			slidesPerView: 1,
			rewind: true,
			effect: 'fade',
			speed: 1000,
			// fadeEffect: {
			// 	crossFade: true
			// },
			navigation: {
				nextEl: sliderWrap.querySelector('.swiper-button-next'),
				prevEl: sliderWrap.querySelector('.swiper-button-prev'),
			},
			pagination: {
				el: sliderWrap.querySelector(' .swiper-pagination'),
				type: 'bullets',
				clickable: true,
				// renderBullet: function (index, className) {
				// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
				// }
			},
			thumbs: {
				swiper: swiperFade
			},
			scrollbar: {
				el: sliderWrap.querySelector(".swiper-scrollbar"),
				// hide: true,
				draggable: true,
			},
		});


		// swiperFade.controller.control = swiperText;
		swiperText.controller.control = swiperFade;
	}

	// modal window
	document.addEventListener('mouseup', (event) => {
		let popup = event.target.closest('.success');
		let cross = event.target.closest('.success__cross');
		if (cross) {
			$(popup).fadeOut();
		};
	}, { passive: true });

	$(".menu-item-has-children>a ").on('click', function() {
		if (innerWidth < 992) {
			$(this).parent().toggleClass("active");
			$(this).next().slideToggle();
		}
	})
	
	const swiperMediaContent = new Swiper(('.mediaContent__slider--js'), {
		slidesPerView: 1,
		rewind: true, 
		effect: 'fade',
		speed: 1000,
		fadeEffect: {
			crossFade: true
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			// hide: true,
			draggable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	AOS.init();

	let tagsItems = document.querySelectorAll('.tags');
	if (tagsItems) {
		for (const tagsItem of tagsItems) {
			let links = tagsItem.querySelectorAll('.tags__inner-col--shown');
			if (links.length > 4) {
				let showMore = tagsItem.querySelector('.tags__inner-col--js');
				showMore.classList.add('active');
			};
		}
		let tagsLinks = document.querySelectorAll('.tags__link--js');
		for (const tagsLink of tagsLinks) {
			tagsLink.addEventListener('click', function() {
				if (window.innerWidth <= 768) {
					$(this.nextElementSibling).slideToggle();
					$(this).hide();
				}
			});
		}
	};

	const sSearchSwiper = new Swiper('.sSearch__tabs-slider--js', {
		slidesPerView: 'auto',
		// spaceBetween: 17,
		// freeMode: true,
		watchOverflow: true,
	});

	$(".search-toggle--js").on("click", function(e){
		e.preventDefault;
		$(".search-block--js").toggleClass("active");
	})

	$('.soc--js').hcSticky({
		// mobileFirst: true,
		stickTo: $('.main-block'),
		top: 20,
		responsive: {
			768: {
				disable: true,
			}
		},
  });

	let jsChoices = document.querySelectorAll('.js-choice');
	if(jsChoices) {
		for (const jsChoice of jsChoices) {
			const choices = new Choices(jsChoice, {
				searchEnabled: false,
				callbackOnInit: () => {
					$(".choices__list--dropdown .choices__list").mCustomScrollbar({
						axis:"y",
						theme:"dark",
					});
				},
			});
		}
	}

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// $(window).load(function() {
// 	var $grid = $('.sMaterials__row--js').masonry({
// 		itemSelector: '.col--js',
// 	});
// });

window.onload = function () {
	var $grid = $('.sMaterials__row--js').masonry({
		itemSelector: '.col--js',
	});
	// let sMaterialsLinks = document.querySelectorAll('.sMaterials__link--js');
	// 	for (const sMaterialsLink of sMaterialsLinks) {
	// 		sMaterialsLink.addEventListener('click', function() {
	// 			if (window.innerWidth <= 768) {
	// 				$grid.masonry('reloadItems');
	// 			}
	// 		});
	// 	}
}