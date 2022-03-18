var accordion = document.getElementById('accordion');
	console.log(accordion)
		accordion.addEventListener('click', change);
		function change(event) {
			var targ = event.target;
			if (targ.tagName !== 'H3') return;
			if (targ.classList.contains('select')) {
				hideAll();
			} else {
				hideAll();
				targ.classList.add('select');
				showText(targ.nextElementSibling);
			}
		}
		function hideAll() {
			var h3El = accordion.querySelectorAll('h3');
			var divEl = accordion.querySelectorAll('div');
			for (var i = 0; i < h3El.length; i++) {
				h3El[i].classList.remove('select');
			}
			for (var i = 0; i < divEl.length; i++) {
                divEl[i].style.height = '0';
                // divEl[i].classList.remove('tabs__text_s')
			}
		}
		function showText(textEl) {
            textEl.style.height = textEl.scrollHeight + 'px';
            // textEl.classList.add('tabs__text_s')
            console.log(textEl)
		}
	