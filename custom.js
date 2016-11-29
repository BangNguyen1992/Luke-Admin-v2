(function ($) {

	$(document).ready(function () {
		
		var clientID = "";
		var domain = "";

		var accessToken = localStorage.getItem('acstoken');
		var idToken = localStorage.getItem('id_token');

		var httpGetAsync = function (theUrl, callback) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					callback(xmlHttp.responseText);
			};
			xmlHttp.open("GET", theUrl, true);
			xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'));
			xmlHttp.setRequestHeader("acstoken", localStorage.getItem('acstoken')); // true for asynchronous
			xmlHttp.send(null);
		}

		$.getJSON("http://www.balticapp.fi/lukeA/authzero", function (result) {
			clientID = result.AUTH0_CLIENT_ID;
			domain = result.AUTH0_DOMAIN;

			var lock = new Auth0Lock(clientID, domain, {
				auth: {
					responseType: 'token',
					params: {
						scope: 'openid email'
					} //Details: https://auth0.com/docs/scopes
				}
			});


			$('.btn-login').click(function (e) {
				e.preventDefault();
				lock.show();
			});

			$('.btn-logout').click(function (e) {
				e.preventDefault();
				logout();
			});

			//Storing user profile
			lock.on("authenticated", function (authResult) {
				lock.getProfile(authResult.idToken, function (error, profile) {
					if (error) {
						// Handle error
						return;
					}
					//			console.log('Authorization: Bearer ' + authResult.idToken);
					//			console.log('acstoken: ' + authResult.accessToken);
					//			console.log('payload: ' + authResult.idTokenPayload);
					//			console.log('profile: ' + JSON.stringify(profile));

					localStorage.setItem('id_token', authResult.idToken);
					localStorage.setItem('acstoken', authResult.accessToken);
					localStorage.setItem('payload', authResult.idTokenPayload);
					//			localStorage.setItem('state', authResult.state);
					localStorage.setItem('profile', JSON.stringify(profile));

					// Display user information
					show_profile_info(profile);
				});

			});

			//		Auto adding header to ajax request
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



			//		Connect to the API
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



			//retrieve the profile:
			var retrieve_profile = function () {
				var id_token = localStorage.getItem('id_token');
				if (id_token) {
					lock.getProfile(id_token, function (err, profile) {
						if (err) {
							return alert('There was an error getting the profile: ' + err.message);
						}
						// Display user information
						show_profile_info(profile);
					});
				}
			};

			var show_profile_info = function (profile) {
				$('.nickname').text(profile.nickname);
				$('.btn-login').hide();
				$('.avatar').attr('src', profile.picture).show();
				$('.btn-logout').show();
				$('.nav-container').show();
				$('.find-all').show();



			};

			var logout = function () {
				localStorage.removeItem('id_token');
				window.location.href = "/";
			};

			retrieve_profile();

			//Create a new exp pattern
			$('#submit').click(function () {
				var title = document.getElementById("title").value;
				var reportGain = document.getElementById("reportGain").value;
				var upvoteGain = document.getElementById("upvoteGain").value;
				var downvoteGain = document.getElementById("downvoteGain").value;
				var active = document.getElementById("active").value;
				var JSONObject = {
					"title": title,
					"reportGain": reportGain,
					"upvoteGain": upvoteGain,
					"downvoteGain": downvoteGain,
					"active": active,
				};

				console.log(JSONObject);
				
				$.ajax({
					url: 'http://www.balticapp.fi/lukeA/experience/create',
					type: 'post',
					data: JSONObject,
					dataType: 'JSONP',
					success: function (data) {
						//					console.log(data);
						var jsonData = $.parseJSON(data); //if data is not json
						console.log(jsonData);
						$('#title').val(jsonData.title);
						$('#reportGain').val(jsonData.reportGain);
						$('#upvoteGain').val(jsonData.upvoteGain);
						$('#downvoteGain').val(jsonData.downvoteGain);
						$('#active').val(jsonData.active);
					}
				});
			});

			$.getJSON("http://www.balticapp.fi/lukeA/experience", function (result) {

				var resultArray = eval(result);
				console.log(resultArray);
			});


		});
	});

})(jQuery);