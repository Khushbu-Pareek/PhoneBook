+ function() {
	//global variables
	var count = 0,
		list = oEmployeeInfo.employees.length,
		searchResult, searchCount = 0;

	//Binds functions to buttons
	(function _bindEvents() {
		$("#showContacts").on("click", showContacts);
		$(".pgBtn-prev").on("click", prevContacts);
		$(".pgBtn-next").on("click", nextContacts);
		$(".pgBtnS-prev").on("click", prevSearchContacts);
		$(".pgBtnS-next").on("click", nextSearchContacts);
		//handling list item click event
		$(document).on("click", ".employeeList", showDetails);
	}());

	//function to show all contacts
	function showContacts() {

		document.getElementById('detail').style.backgroundColor = "lightblue";
		var sInnerContent = '<div id="searchContainer"><input type=search results=7 placeholder="SEARCH by Name/ Email" id="search"></div><style id="search_style"></style><br /><ul class="scroll">',
			i;

		for (i in oEmployeeInfo.employees) {
			sInnerContent += '<li id="employeeList_' + i + '" class="searchable hide" data-index="' + oEmployeeInfo.employees[i].fullName + oEmployeeInfo.employees[i].email + oEmployeeInfo.employees[i].mobile + '"><dl class="employeeList">';
			sInnerContent += '<dt>Name: ' + oEmployeeInfo.employees[i].fullName + '</dt>';
			sInnerContent += '<dt>Email: ' + oEmployeeInfo.employees[i].email + '</dt>';
			sInnerContent += '</li>';
		}

		sInnerContent += '<div id= "noData" class="hidden">No Data Found</div></ul>';
		document.getElementsByClassName("contacts")[0].innerHTML = sInnerContent;
		$('#showContacts').attr('onclick', '').unbind('click');
		for (i = 0; i < 7; i++) {
			$('#employeeList_' + i).addClass("show").removeClass("hide");
		}

		var searchStyle = document.getElementById('search_style');

		//search functionality
		$('#search').on('input', function() {

			for (i = 0; i < list; i++) {
				$('#employeeList_' + i).removeClass("hidden").addClass("hide").removeClass("searchResult").removeClass("show");
			}
			for (i = 0; i < 7; i++) {
				$('#employeeList_' + i).removeClass("show").removeClass("hide").addClass("show");
			}

			if (!this.value) {
				searchStyle.innerHTML = "";
				$('#pagination').addClass("show").removeClass("hidden");
				toggleNoData(false);
				$('#paginationSearch').addClass("hidden").removeClass("show");
				$('#currentPage').html('1');
				return;
			}
			$('#pagination').addClass("hidden").removeClass("show");

			searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none !important; }";
			searchStyle.innerHTML += ".hide[data-index*=\"" + this.value.toLowerCase() + "\"] { display: block; }";
			toggleNoData($('.scroll li:visible').length == 0);
			$('#currentSearchPage').html('1');
			searchResult = $('.scroll li:visible').length;
			var totalSearchPage = Math.ceil(searchResult / 7);
			$('#totalSearchPage').html("in " + totalSearchPage);
			searchCount = 0;
			if(totalSearchPage>1){
				$('#paginationSearch').addClass("show").removeClass("hidden");
			}else {
				$('#paginationSearch').addClass("hidden").removeClass("show");
			}
			for (i = 0; i < searchResult; i++) {
				$($('.scroll li:visible')[0]).removeClass("hide").removeClass("hidden").removeClass("show").removeClass("searchResult").addClass("searchResult").addClass("hidden");
			}
			for (i = 0; i < 7 && i < searchResult; i++) {
				$($('.searchResult')[i]).removeClass("show").removeClass("hide").removeClass("hidden").addClass("show");
			}
		});
		$('#paginationSearch').addClass("hidden").removeClass("show");
		$('#pagination').addClass("show").removeClass("hidden");
		$('#currentPage').html('1');
		var totalPage = Math.ceil(list / 7);
		$('#totalPage').html("in " + totalPage);
	}

	function toggleNoData(shouldShow) {
		shouldShow ? $('#noData').addClass("show").removeClass("hidden") : $('#noData').addClass("hidden").removeClass("show");
	}

	//function to show details of a employee
	function showDetails(event) {
		var index = $(event.target).closest(".searchable").attr("id").split('_')[1],
			innerHtml = '<ul><li><dl>';

		innerHtml += '<dt> <img src="contact.jpg" alt="contact.jpg" class="personalImage"> </dt>';
		innerHtml += '<dt>Name: ' + oEmployeeInfo.employees[index].fullName + '</dt>';
		innerHtml += '<dt>Email: <a href="mailto:' + oEmployeeInfo.employees[index].email + '">' + oEmployeeInfo.employees[index].email + '</a></dt>';
		innerHtml += '<dt>Phone: ' + oEmployeeInfo.employees[index].mobile + '</dt>';
		innerHtml += '<dt>Telephone: ' + oEmployeeInfo.employees[index].telephone + '</dt>';
		innerHtml += '<dt>Seat: ' + oEmployeeInfo.employees[index].seatloc + '</dt>';
		innerHtml += '<dt>Location: ' + oEmployeeInfo.employees[index].workloc + '</dt>';
		innerHtml += '</dl></li></ul>';

		$("#completeDetails").html(innerHtml);
	}

	//function for next button in pagination
	function nextContacts() {
		console.log("Method Executing - nextContacts");
		currentPage = document.getElementById("currentPage").innerHTML;
		if (currentPage <= list / 7) {
			var limit = count + 7,
				start;
			for (; count < list && count < limit; count++) {
				$('#employeeList_' + count).addClass("hide").removeClass("show");
			}
			limit += 7;
			start = count;
			for (; start < list && start < limit; start++) {
				$('#employeeList_' + start).addClass("show").removeClass("hide");
			}

			$('#currentPage').html(parseInt(currentPage) + 1);
		}
	}

	//function for prev button in pagination
	function prevContacts() {
		console.log("Method Executing - prevContacts");
		currentPage = document.getElementById("currentPage").innerHTML;
		if (currentPage > 1) {
			var limit = count + 7,
				start = count;
			for (; start < list && start < limit; start++) {
				$('#employeeList_' + start).addClass("hide").removeClass("show");
			}
			limit = count;
			count = count - 7;

			for (; count < list && count < limit; count++) {
				$('#employeeList_' + count).addClass("show").removeClass("hide");
			}
			count = count - 7;

			$('#currentPage').html(parseInt(currentPage) - 1);
		}
	}

	//function for next button in search result in pagination
	function nextSearchContacts() {
		console.log("Method Executing - nextContacts");
		currentSearchPage = document.getElementById("currentSearchPage").innerHTML;
		if (currentSearchPage <= searchResult / 7) {
			var limit = searchCount + 7,
				start;
			for (; searchCount < searchResult && searchCount < limit; searchCount++) {
				$('.searchResult').eq(searchCount).addClass("hidden").removeClass("show");
			}
			limit += 7;
			start = searchCount;
			for (; start < searchResult && start < limit; start++) {
				$('.searchResult').eq(start).addClass("show").removeClass("hidden");
			}

			$('#currentSearchPage').html(parseInt(currentSearchPage) + 1);
		}
	}

	//function for prev button in search result in pagination
	function prevSearchContacts() {
		console.log("Method Executing - prevContacts");
		currentSearchPage = document.getElementById("currentSearchPage").innerHTML;
		if (currentSearchPage > 1) {
			var limit = searchCount + 7,
				start = searchCount;
			for (; start < searchResult && start < limit; start++) {
				$('.searchResult').eq(start).addClass("hidden").removeClass("show");
			}
			limit = searchCount;
			searchCount = searchCount - 7;

			for (; searchCount < searchResult && searchCount < limit; searchCount++) {
				$('.searchResult').eq(searchCount).addClass("show").removeClass("hidden");
			}
			searchCount = searchCount - 7;

			$('#currentSearchPage').html(parseInt(currentSearchPage) - 1);
		}
	}
}();