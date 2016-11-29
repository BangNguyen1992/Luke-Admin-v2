$(document).ready(function () {
	console.log("get here?");
	//Create a new exp pattern
			var submit = $('#submit').click(function () {
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

				var createNewExp = $.ajax({
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
})
