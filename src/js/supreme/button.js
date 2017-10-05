const
	createQuickBuyButton = () => {
		var btn = document.createElement("input")
		btn.id = "quickbuy"
	    btn.type = "button"
	    btn.value = "instant buy"
	    btn.className = "button"
	    btn.style = "background-color: #000000; border-color: #000000; margin-top: 30px;"
	    btn.onclick = clickOnBuy
	    return btn
	},
	clickOnBuy = () => {
		var article = {
			name: document.title.split("Supreme: ")[1],
			price: (() => {
				for (var span in document.body.getElementsByTagName("span")) {
					span = document.body.getElementsByTagName("span")[span]
					if (span.getAttribute("itemprop")) {
						if (span.getAttribute("itemprop") == "price")
							return span.innerText
					}
				}
			})(),
			size: (() => {
				var s = document.getElementById("size")
				if (s.type != "hidden")
					return s.options[s.selectedIndex].text
				else
					return 0
			})()
		}
		if (confirm("Vill du köpa:\n\n" + article.name +", storlek: " + article.size + "\n\nFör  " + article.price + " ?\n\n(The parameter \"Auto-fill chekcout page and submit it\" must be enabled)") == true) {

			$.ajax({
				type: 'POST',
				url: $('#cart-addf').attr('action'),
				dataType: 'json',
				data: $('#cart-addf').serialize(),
				success: function(rep) {
					if (rep && rep.length) {
						location.href = "https://www.supremenewyork.com/checkout"
					}
				}
			})
			
		}
	}