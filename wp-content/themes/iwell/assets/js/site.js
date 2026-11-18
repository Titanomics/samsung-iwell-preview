/**
 * iwell 점진 향상(Task 7 수정 1) — 자바스크립트가 없으면 기본 details·링크 그대로 동작한다. 이 파일은 그 위에 얹기만 한다.
 *
 * R01 모바일 드로어(<details class="iwell-drawer">): 열린 동안 뒤쪽(머리 나머지·본문·바닥글·하단 바 — 드로어 조상의 형제 전부)을 inert 로
 *     포커스 대상에서 빼고, Tab·Shift+Tab 을 패널 안에서 순환, Escape 로 닫고 여는 버튼(summary)으로 초점을 돌린다.
 *     넓은 화면(≥1200px — 드로어가 숨는 폭)으로 바뀌면 닫는다(숨은 드로어가 뒤쪽을 inert 로 묶어 두지 않게).
 * R02 형제 탭(nav.iwell-tabs): 좁은 화면에서 탭 줄이 가로로 넘치면 첫 표시 때 현재 탭이 탭 줄 가운데에 오게 탭 줄의 scrollLeft 만 맞춘다
 *     (페이지 세로 스크롤은 건드리지 않는다).
 */
(function () {
	'use strict';

	var FOCUSABLE = 'summary, a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
	var SKIP = /^(SCRIPT|STYLE|LINK|META|TEMPLATE|NOSCRIPT)$/;

	function visible(el) {
		return el.getClientRects().length > 0;
	}

	function drawer(details) {
		var toggle = details.querySelector(':scope > summary');
		if (!toggle) {
			return;
		}
		var held = [];

		function hold() {
			for (var node = details; node.parentElement && node !== document.body; node = node.parentElement) {
				for (var sib = node.parentElement.firstElementChild; sib; sib = sib.nextElementSibling) {
					if (sib !== node && !sib.inert && !SKIP.test(sib.tagName)) {
						sib.inert = true;
						held.push(sib);
					}
				}
			}
		}

		function release() {
			while (held.length) {
				held.pop().inert = false;
			}
		}

		function focusables() {
			return Array.prototype.filter.call(details.querySelectorAll(FOCUSABLE), visible);
		}

		function close() {
			details.open = false;
			toggle.focus();
		}

		details.addEventListener('toggle', function () {
			release();
			if (details.open) {
				hold();
			}
		});

		document.addEventListener('keydown', function (e) {
			if (!details.open) {
				return;
			}
			if (e.key === 'Escape' || e.key === 'Esc') {
				e.preventDefault();
				close();
				return;
			}
			if (e.key !== 'Tab') {
				return;
			}
			var list = focusables();
			if (!list.length) {
				return;
			}
			var first = list[0];
			var last = list[list.length - 1];
			var active = document.activeElement;
			var inside = details.contains(active);
			if (e.shiftKey && (!inside || active === first)) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && (!inside || active === last)) {
				e.preventDefault();
				first.focus();
			}
		});

		if (window.matchMedia) {
			var wide = window.matchMedia('(min-width: 1200px)');
			var onWide = function () {
				if (wide.matches && details.open) {
					details.open = false;
				}
			};
			if (wide.addEventListener) {
				wide.addEventListener('change', onWide);
			} else if (wide.addListener) {
				wide.addListener(onWide);
			}
		}

		if (details.open) {
			hold();
		}
	}

	function centerCurrentTab(nav) {
		var current = nav.querySelector('a[aria-current="page"]') || nav.querySelector('a[aria-current]');
		if (!current || nav.scrollWidth <= nav.clientWidth) {
			return;
		}
		var box = nav.getBoundingClientRect();
		var cur = current.getBoundingClientRect();
		nav.scrollLeft += cur.left - box.left - (box.width - cur.width) / 2;
	}

	function init() {
		Array.prototype.forEach.call(document.querySelectorAll('details.iwell-drawer'), drawer);
		Array.prototype.forEach.call(document.querySelectorAll('nav.iwell-tabs'), centerCurrentTab);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
