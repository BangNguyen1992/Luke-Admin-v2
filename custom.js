(function($){
$(document).ready(function () {
		var app_container = $("#app-container", $(this))

		 console.log(app_container)

	var clientID = "";
	var domain = "";
		$.getJSON("http://www.balticapp.fi/lukeA/authzero", function (result) {
			clientID = result.AUTH0_CLIENT_ID;
			domain = result.AUTH0_DOMAIN;

			app_container
				.on('click', 'a#table-link', function(e){
					e.preventDefault()
					var navbar = $("#navbar", app_container)
					var table_container = $(".table-responsive", app_container)
					var table = jQuery("#list-tab1e", table_container)
					if(!table.hasClass('data-loded')){
						finda11(table)
					}
				})
			.on('click', 'a#report-link', function(e){
					e.preventDefault()
					var navbar = $("#navbar", app_container)
					var report_container = $(".page-wrapper", app_container)
					var reportul = jQuery("#report-ul", report_container)
					findreports(reportul)

				})


			$.ajaxSetup({
				'beforeSend': function (xhr) {
					if (localStorage.getItem('id_token')) {
						xhr.setRequestHeader('Authorization',
							'Bearer ' + localStorage.getItem('id_token'));
					}
					if (localStorage.getItem('acstoken')) {
						xhr.setRequestHeader('acstoken',
							localStorage.getItem('acstoken'));
					}
				}
			});

			var accessToken = localStorage.getItem('acstoken');
			var idToken = localStorage.getItem('id_token');

			function httpGetAsync(theUrl, callback) {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
						callback(xmlHttp.responseText);
				}
				xmlHttp.open("GET", theUrl, true);
				xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'));
				xmlHttp.setRequestHeader("acstoken", localStorage.getItem('acstoken')); // true for asynchronous
				xmlHttp.send(null);
			}

	var finda11 = function (table) {httpGetAsync('http://www.balticapp.fi/lukeA/user/get-all',
		function (data) {
		var mData = eval(data);
		var rows = '';
	  mData.forEach(function (contact) {
			var $row = document.createElement('tr')
			var did = (contact.id).substr(2, 7)
											       $row.dataset.id = contact.id
														 var Status = "Ban"
		                         $row.innerHTML = `
		                         <td>
														 <a href="userDetail.html" data-action="user"> ${did}</a>
		                         </td>
		                         <td>
		                         ${contact.username || 'no username'}
		                         </td>
		                         <td>
		                         ${contact.score || 'no score'}
		                         </td>
		                         <td class="actions">
		                         <a href="#" data-action="edit">Edit</a> |
		                         <a href="#" class = "ban-user" data-action="delete">${Status}</a>
		                         </td>
		                        `
	// rows += $row;
		table.append($row);
		table.addClass('data-loded')
	});
	table.on('click', function (event) {
		event.preventDefault()
		var $button = event.target
		var $row = $button.closest('tr')
		var id = $row.dataset.id
		var action = $button.dataset.action
		if (action === 'delete') {
			var delete_btn = $(".ban-user",$row)

			if(delete_btn.hasClass("banned")){
				userRole(id)
				unBanUser(delete_btn, id)
				userRole(id)
			}else{
				userRole(id)
				banUser(delete_btn, id)
				userRole(id)
			}
		}
		if (action === 'user') {
			userProf(id)
		}
		if (action === 'edit') {
		  var $cells = $row.querySelectorAll('td')
		  var name = $cells[0].textContent.trim()
		  var contact = $cells[1].textContent.trim()
		  var note = $cells[2].textContent.trim()
		    $row.innerHTML = `
		      <td>
		        <input value="${name}" data-original="${name}">
		      </td>
		      <td>
		        <input value="${contact}" data-original="${contact}">
		      </td>
		      <td>
		        <textarea data-original="${note}">${note}</textarea>
		      </td>
		      <td class="actions">
		        <button data-action="save">save</button>
		        <a href="#" data-action="cancel">cancel</a>
		      </td>
		    `
		  }

		  if (action === 'save') {
		    var $inputs = $row.querySelectorAll('input, textarea')
		    var name = $inputs[0].value
		    var contact = $inputs[1].value
		    var note = $inputs[2].value

		    $row.innerHTML = `
		      <td>
		        ${name}
		      </td>
		      <td>
		        ${contact}
		      </td>
		      <td>
		        ${note}
		      </td>
		      <td class="actions">
		        <a href="#" data-action="edit">edit</a> |
		        <a href="#" data-action="delete">delete</a>
		      </td>
		    `

	    mData.forEach(function (contactItem) {
	      if (contactItem.id === id) {
	        contactItem.name = name
	        contactItem.contact = contact
					console.log(contact);
	        contactItem.note = note
	      }
	    })
			var newUsername = function () {httpGetAsync('http://www.balticapp.fi/lukeA/user/set-username'+'?username='+contact,
				function (data) {
					console.log(data);

				})
			}
		newUsername()
	  }

	  if (action === 'cancel') {
	    var $inputs = $row.querySelectorAll('input, textarea')
	    var name = $inputs[0].dataset.original
	    var contact = $inputs[1].dataset.original
	    var note = $inputs[2].dataset.original

	    $row.innerHTML = `
	      <td>
	        ${name}
	      </td>
	      <td>
	        ${contact}
	      </td>
	      <td>
	        ${note}
	      </td>
	      <td class="actions">
	        <a href="#" data-action="edit">edit</a> |
	        <a href="#" data-action="delete">Ban</a>
	      </td>
	    `
	  }
	})
		});
	};

			//ban user
	var banUser = function (delete_btn,id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/ban'+'?id='+id,
		function (data) {
			var data = JSON.parse(data)
			if(data.success == true ){
				console.log(data);
				console.log(data.success);
				delete_btn.addClass("banned")
				//delete_btn.innerHTML = "Unban"
				delete_btn.html("Unban")
			}

		})
	}
		//unba user
	 var unBanUser = function (delete_btn,id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/unban'+'?id='+id,
	 	function (data) {
	 	var data = JSON.parse(data)
	 	if(data.success == true ){
	 		console.log(data);
	 		console.log(data.success);
			delete_btn.removeClass("banned")
			delete_btn.html("Ban")
	 		}
	 })
	 }
	//check user roles
	 var userRole = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/roles'+'?id='+id,
			function (data) {
			console.log(data);

		})
	}
	//show user profile
	var userProf = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user'+'?id='+id,
		function (data) {
		console.log(data);

		})
	}
	//delete a submission
	var removeSubmission = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/report/remove'+'?id='+id,
		function (data) {
		console.log(data);
		})
	}
	//list all submissions
	var findreports = function (reportul) {httpGetAsync('http://www.balticapp.fi/lukeA/report',
	 function (data) {
	 console.log(data.length);
	 var reports = eval(data);
	 var imgrows = '';
   var src = 'images.jpg'
	 reports.forEach(function(report){
		 var img = document.createElement('li');
		 img.dataset.id = report.id
		 img.dataset.action = "view"
		 img.innerHTML = `
		 <img src=${src} />
		 <h3>${report.title}</h3>
		 <p>${report.description}</p>
		 <button id="report" data-action="remove" ">Delete</button>
		 `
		 reportul.append(img)
	 })
	reportul.on('click', function(event){
	event.preventDefault()
	var rButton = event.target
	var deleteI = rButton.closest('li')
	var id = deleteI.dataset.id
	var action = rButton.dataset.action
	if (action === 'remove'  ){
		removeSubmission(id)
	}
	deleteI.remove()
	})

	})
	}
		})
		})

})(jQuery)
