$(document).ready(function(){
	
	var morerules = document.getElementsByClassName("morerulescontainer");
	var advanced = document.getElementsByClassName("advanced");
	var morerulessprite = document.getElementsByClassName("morerulessprite");
	var morerulestext = document.getElementsByClassName("morerulestext");
	
	
	
	for (var i = 0; i<morerules.length; i++) {
		morerules[i].style.display = "block";
		advanced[i].style.height = "0px";
		morerules[i].childNodes[3].innerHTML = "Expand.";
		
		morerules[i].onclick = function() {
			var ruletarget = this.parentNode.childNodes[5];
			ruletarget.style.webkitTransition = "height "
			+ Math.max(ruletarget.scrollHeight, 500) + "ms ease";
			
			var rulesprite = this.childNodes[1]
			var expandtext = this.childNodes[3]
				
			if (ruletarget.clientHeight == 0) {
				ruletarget.style.height = ruletarget.scrollHeight + "px";
				expandtext.innerHTML = "Collapse.";
				rulesprite.style.transform = "rotate(180deg)";
				
			} else {
				ruletarget.style.height = "0px";
				expandtext.innerHTML = "Expand.";
				rulesprite.style.transform = "rotate(0deg)";
			}
		}
	}
	
	var bottommenucontainer = document.getElementsByClassName("bottommenucontainer");
	bottommenucontainer[0].style.display = "block";
	
	
	$(".Example_images a").each(function () {
		$(this).removeAttr("href");
	});
	
	$(".bottommenucontainer").hover(function () {
		$(".bottommenu").css({"bottom": "0", "transition": "0.5s ease"});
	}, function() {
		$(".bottommenu").css("bottom", "-30px");
	});
	
	$("#expandbox").click(function() {
		for (var i = 0; i<morerules.length; i++) {
			morerulestext[i].innerHTML = "Collapse.";
			morerulessprite[i].style.transform = "rotate(180deg)";
			advanced[i].style.webkitTransition = "height 0.5s ease";
			advanced[i].style.height = advanced[i].scrollHeight + "px";
		}
	});
	
	$("#collapsebox").click(function() {
		for (var i = 0; i<morerules.length; i++) {
			morerulestext[i].innerHTML = "Expand.";
			morerulessprite[i].style.transform = "rotate(0deg)";
			advanced[i].style.webkitTransition = "height 0.5s ease"
			advanced[i].style.height = "0px";
		}
	});
	
	
	
	
	var rule = document.querySelectorAll(".ruleset ol > li")	
	for (var i = 0; i < rule.length; i++) {
		var rulenumber = document.createElement("span");
		rulenumber.style.display = "inline-block";
		rulenumber.style.opacity = "0";
		rulenumber.style.webkitTransition = "opacity 0.5s";
		rulenumber.className = "rulenumber";
		rulenumber.innerHTML = rule[i].parentElement.getAttribute("id");
		
		$(rule[i]).prepend(rulenumber);
		
		var width = $(rulenumber).width();
		rulenumber.style.marginLeft = -width + "px";
	}
	
		
	$(".ruleset ol > li").hover(function (){
		$(this).children("span").css("opacity", "1");
	}, function() {
		$(this).children("span").css("opacity", "0");
	});
		
	
	$(".Example_images").click( function(f){
		$("#myModal_example").css("display","block");
		$("#img_example").attr("src", "http://chronet.com/styles/chronet/custom/images/rules/" + $(this).attr("target"));
	});
	
	$(".close, .modal").click(function() {
		$(".modal").css("display","none");
	});

	var getModifiedTime = function(url, callback) {
		
		var rulesajax = new XMLHttpRequest();
		rulesajax.open("GET", url, true);
		rulesajax.onreadystatechange = function() {
			if (rulesajax.readyState === 4 && rulesajax.status === 200) {
				var modifiedTime = rulesajax.getResponseHeader("Last-Modified");
				callback(modifiedTime);
			}
		};
		rulesajax.send();
	}
	
	getModifiedTime("Index.php?v=" + Math.floor(Math.random()*1000), function(modifiedTime) {
		if (modifiedTime) {
			$("#modifieddate").html(modifiedTime);
			console.log("Last modified: " + modifiedTime);
		} else {
			getModifiedTime("Index.php", function(modifiedTime) {
				if (modifiedTime) {
					$("#modifieddate").html(modifiedTime);
				} else {
					getModifiedTime("js/chronet/rp_rules.js?v=" + Math.floor(Math.random()*1000)", function(modifiedTime) {
						if (modifiedTime) {
							$("#modifieddate").html(modifiedTime);
						}
					});
				}
			});
		}
	});
			
});