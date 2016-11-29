(function($){
$(document).ready(function () {
		var app_container = $("#app-container", $(this))

		 console.log(app_container)

	var clientID = "";
	var domain = "";
		$.getJSON("http://www.balticapp.fi/lukeA/authzero", function (result) {
			clientID = result.AUTH0_CLIENT_ID;
			domain = result.AUTH0_DOMAIN;

			// var lock = new Auth0Lock(clientID, domain, {
			// 	auth: {
			// 		responseType: 'token',
			// 		params: {
			// 			scope: 'openid email'
			// 		} //Details: https://auth0.com/docs/scopes
			// 	}
			// });


			// $('.btn-login').click(function (e) {
			// 	e.preventDefault();
			// 	lock.show();
			// });
			//
			// $('.btn-logout').click(function (e) {
			// 	e.preventDefault();
			// 	logout();
			// })
			// lock.on("authenticated", function (authResult) {
			// 	lock.getProfile(authResult.idToken, function (error, profile) {
			// 		if (error) {
			// 			// Handle error
			// 			return;
			// 		}
			// 		//			console.log('Authorization: Bearer ' + authResult.idToken);
			// 		//			console.log('acstoken: ' + authResult.accessToken);
			// 		//			console.log('payload: ' + authResult.idTokenPayload);
			// 		//			console.log('profile: ' + JSON.stringify(profile));
			//
			// 		localStorage.setItem('id_token', authResult.idToken);
			// 		localStorage.setItem('acstoken', authResult.accessToken);
			// 		localStorage.setItem('payload', authResult.idTokenPayload);
			// 		//			localStorage.setItem('state', authResult.state);
			// 		localStorage.setItem('profile', JSON.stringify(profile));
			//
			// 		// Display user information
			// 		show_profile_info(profile);
			// 	});
			//
			// });
			app_container
				.on('click', 'a#table-link', function(e){
					e.preventDefault()
					var navbar = $("#navbar", app_container)
					var table_container = $(".table-responsive", app_container)
					var table = jQuery("#list-tab1e", table_container)
					console.log(table_container)
					if(!table.hasClass('data-loded')){
						finda11(table)
					}
				})
				.on('click', 'a#report-link', function(e){
					e.preventDefault()
					var navbar = $("#navbar", app_container)
					var report_container = $(".page-wrapper", app_container)
					var reportul = jQuery("#report-ul", report_container)
					console.log(reportul);
					console.log(report_container)
					findreports(reportul)
					// if(!table.hasClass('data-loded')){
					// 	finda11(table)
					// }
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


			httpGetAsync('http://www.balticapp.fi/lukeA/login', function (response) {
				console.log(response);

				response.text().then(function (t) {
					if (response.status !== 200) {
						console.log('error');

						return;
					}
					alert('API Response: ' + JSON.stringify(JSON.parse(t)));
				}).catch(function (err) {
					alert('error: ' + err);
				});
			});

			var findreports (reportul)= function () {httpGetAsync('http://www.balticapp.fi/lukeA/report',
			 function (data) {
			 console.log(data.length);
		   var reports = eval(data);
			 var imgrows = '';
			//  var imgTitle= ''
			//  var imgDesc =''
			var src = 'images.jpg'
			 reports.forEach(function(report){
		      var img = document.createElement('li');
					console.log(img);
					console.log(reportul);
			// 	 var htag = document.createElement('h3');
			// 	 var ptag = document.createElement('p');
			// background-color: "#f44336;" font-size: "16px;" border-radius: "8px;
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
		reportDetail.addEventListener('click', function(event){
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

	    contacts.forEach(function (contactItem) {
	      if (contactItem.id === id) {
	        contactItem.name = name
	        contactItem.contact = contact
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
		//retrieve the profile:
			// var retrieve_profile = function () {
			// 	var id_token = localStorage.getItem('id_token');
			// 	if (id_token) {
			// 		lock.getProfile(id_token, function (err, profile) {
			// 			if (err) {
			// 				return alert('There was an error getting the profile: ' + err.message);
			// 			}
			// 			// Display user information
			// 			show_profile_info(profile);
			// 		});
			// 	}
			// };

			// var show_profile_info = function (profile) {
			// 	$('.nickname').text(profile.nickname);
			// 	$('.btn-login').hide();
			// 	$('.avatar').attr('src', profile.picture).show();
			// 	$('.btn-logout').show();
			// 	$('.nav-container').show();
	    //   $('.find-all').show();
			//
			//
			//
			// };
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
	var userProf = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user'+'?id='+id,
		function (data) {
		console.log(data);

		})
	}

	var removeSubmission = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/report/remove'+'?id='+id,
		function (data) {
		console.log(data);

		})

	}

	// var logout = function () {
	// 	localStorage.removeItem('id_token');
	// 			window.location.href = "/";
	// 		};

			//retrieve_profile();

			// $('#submit').click(function () {
			// 	var title = document.getElementById("title").value;
			// 	var reportGain = document.getElementById("reportGain").value;
			// 	var upvoteGain = document.getElementById("upvoteGain").value;
			// 	var downvoteGain = document.getElementById("downvoteGain").value;
			// 	var active = document.getElementById("active").value;
			// 	var JSONObject = {
			// 		"title": title,
			// 		"reportGain": reportGain,
			// 		"upvoteGain": upvoteGain,
			// 		"downvoteGain": downvoteGain,
			// 		"active": active,
			// 	};
			//
			// 	$.ajax({
			// 		url: 'http://www.balticapp.fi/lukeA/experience/create',
			// 		type: 'post',
			// 		data: JSONObject,
			// 		dataType: 'JSON',
			// 		success: function (data) {
			// 			console.log(data);
			// 			var jsonData = $.parseJSON(data); //if data is not json
			// 			console.log(jsonData);
			// 			$('#title').val(jsonData.title);
			// 			$('#reportGain').val(jsonData.reportGain);
			// 			$('#upvoteGain').val(jsonData.upvoteGain);
			// 			$('#downvoteGain').val(jsonData.downvoteGain);
			// 			$('#active').val(jsonData.active);
			// 		}
			// 	});
			// });

		})
		})

})(jQuery)
// 	$(document).ready( function () {
// var table = document.getElementById("list-tab1e");
// 	console.log(table);
// var reportDetail = document.getElementById("report");
//
// var clientID = "";
// var domain = "";
// 	$.getJSON("http://www.balticapp.fi/lukeA/authzero", function (result) {
// 		clientID = result.AUTH0_CLIENT_ID;
// 		domain = result.AUTH0_DOMAIN;
//
// 		var lock = new Auth0Lock(clientID, domain, {
// 			auth: {
// 				responseType: 'token',
// 				params: {
// 					scope: 'openid email'
// 				} //Details: https://auth0.com/docs/scopes
// 			}
// 		});
//
// 		$.ajaxSetup({
// 			'beforeSend': function (xhr) {
// 				if (localStorage.getItem('id_token')) {
// 					xhr.setRequestHeader('Authorization',
// 						'Bearer ' + localStorage.getItem('id_token'));
// 				}
// 				if (localStorage.getItem('acstoken')) {
// 					xhr.setRequestHeader('acstoken',
// 						localStorage.getItem('acstoken'));
// 				}
// 			}
// 		});
//
// 		var accessToken = localStorage.getItem('acstoken');
// 		var idToken = localStorage.getItem('id_token');
//
// 		function httpGetAsync(theUrl, callback) {
// 			var xmlHttp = new XMLHttpRequest();
// 			xmlHttp.onreadystatechange = function () {
// 				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
// 					callback(xmlHttp.responseText);
// 			}
// 			xmlHttp.open("GET", theUrl, true);
// 			xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'));
// 			xmlHttp.setRequestHeader("acstoken", localStorage.getItem('acstoken')); // true for asynchronous
// 			xmlHttp.send(null);
// 		}
//
// var findreports = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/report',
// 	 function (data) {
//
//    var reports = eval(data);
// 	 var imgrows = '';
// 	//  var imgTitle= ''
// 	//  var imgDesc =''
// 	var src = 'homi.jpg'
// 	 reports.forEach(function(report){
//       var img = document.createElement('li');
// 	// 	 var htag = document.createElement('h3');
// 	// 	 var ptag = document.createElement('p');
// 	 	 img.dataset.id = report.id
// 		 img.innerHTML = `
// 		 <img src=${src} />
// 		<h3>${report.approved}</h3>
// 		<p>${report.description}</p>
//
// 		 `
// 		 imgrows += img;
// 		 reportDetail.appendChild(img)
// 	// 	 //var src = report.image_url
// 	// 	 var title = report.approved
// 	// 	 var desc = report.description
// 	// 	 img.src = 'homi.jpg';
// 	// 	 imgrows += img
// 	// 	 reportDetail.appendChild(img)
// 	// 	 imgTitle += htag
// 	// 	 reportDetail.appendChild(htag)
// 	// 	 imgDesc+=desc
// 	// 	 reportDetail.appendChild(desc)
// //
// //
// 	 })
//
//  })
// }


// //finda11()
// 	//retrieve the profile:
// 		var retrieve_profile = function () {
// 			var id_token = localStorage.getItem('id_token');
// 			if (id_token) {
// 				lock.getProfile(id_token, function (err, profile) {
// 					if (err) {
// 						return alert('There was an error getting the profile: ' + err.message);
// 					}
// 					// Display user information
// 					show_profile_info(profile);
// 				});
// 			}
// 		};
//
// 		var show_profile_info = function (profile) {
// 			$('.nickname').text(profile.nickname);
// 			$('.btn-login').hide();
// 			$('.avatar').attr('src', profile.picture).show();
// 			$('.btn-logout').show();
// 			$('.nav-container').show();
//       $('.find-all').show();
//
//
//
// 		};
// 		//ban user
// var banUser = function (delete_btn,id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/ban'+'?id='+id,
// 	function (data) {
// 		var data = JSON.parse(data)
// 		if(data.success == true ){
// 			console.log(data);
// 			console.log(data.success);
// 			delete_btn.addClass("banned")
// 			//delete_btn.innerHTML = "Unban"
// 			delete_btn.html("Unban")
// 		}
//
// 	})
// }
// 	//unba user
//  var unBanUser = function (delete_btn,id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/unban'+'?id='+id,
//  	function (data) {
//  	var data = JSON.parse(data)
//  	if(data.success == true ){
//  		console.log(data);
//  		console.log(data.success);
// 		delete_btn.removeClass("banned")
// 		delete_btn.html("Ban")
//  		}
//  })
//  }
// //check user roles
//  var userRole = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/roles'+'?id='+id,
// 		function (data) {
// 		console.log(data);
//
// 	})
// }
// var userProf = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user'+'?id='+id,
// 	function (data) {
// 	console.log(data);
//
// 	})
// }
// var viewSubmission = function () {
//
// }
// var newUsername = function (id) {httpGetAsync('http://www.balticapp.fi/lukeA/user/set-username'+'?username='+contact,
// 	function (data) {
// 	console.log(data);
//
// 		})
// 	}
// var logout = function () {
// 	localStorage.removeItem('id_token');
// 			window.location.href = "/";
// 		};
//
// 		retrieve_profile();
//
// 		//ADD NEW EXP PATTERN
// 		$('#submit-exp').click(function () {
//
// 			var title = document.getElementById("title").value;
// 			var reportGain = document.getElementById("reportGain").value;
// 			var upvoteGain = document.getElementById("upvoteGain").value;
// 			var downvoteGain = document.getElementById("downvoteGain").value;
// 			var active = document.getElementById("active").value;
// 			console.log("get here?");
// 			var JSONObject = {
// 				"title": title,
// 				"reportGain": reportGain,
// 				"upvoteGain": upvoteGain,
// 				"downvoteGain": downvoteGain,
// 				"active": active,
// 			};
//
// 			$.ajax({
// 				url: 'http://www.balticapp.fi/lukeA/experience/create',
// 				type: 'post',
// 				data: JSONObject,
// 				dataType: 'JSON',
// 				success: function (data) {
// 					console.log(data);
// 					var jsonData = $.parseJSON(data); //if data is not json
// 					console.log(jsonData);
// 					$('#title').val(jsonData.title);
// 					$('#reportGain').val(jsonData.reportGain);
// 					$('#upvoteGain').val(jsonData.upvoteGain);
// 					$('#downvoteGain').val(jsonData.downvoteGain);
// 					$('#active').val(jsonData.active);
// 				}
// 			});
// 		});
//
// 	})
// });
// })(jQuery)
