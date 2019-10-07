jQuery(document).ready(function($) {

	$(document).ready(function(){

	//BUTTON TO TRIGGER MY FUNCTION

	// DID NOT SUBMIT ON FIELD ENTER KEY AS SUBMIT WAS TYPE=BUTTON
	// let subButton = document.getElementById('subButton');
	// subButton.addEventListener('click', getUserInfo, false); 

	$('#nameForm').on('submit', function () {
		getUserInfo();
	    return false;
	});

	//DATE STUFF
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = ('0' + (currentDate.getMonth()+1)).slice(-2);
	let currentDay = ('0' + currentDate.getDate()).slice(-2);
	let fullDate = currentYear + "-" + currentMonth + "-" + currentDay;

		//THE MAIN FUNCTION
		function getUserInfo(){
			
			function getStamps(){
				$('#stampBase').html('');
				
				let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0YWI4NTg3OThjMjhiMzlkNTRlZjQxYmE5NmRjYThiYzkwODRkZTEyODg2YjdmNDJmMzg5NGQ1MmMyMjJjNzkzOTU0ZTk4NWE2NTczZjZmIn0.eyJhdWQiOiIxIiwianRpIjoiMzRhYjg1ODc5OGMyOGIzOWQ1NGVmNDFiYTk2ZGNhOGJjOTA4NGRlMTI4ODZiN2Y0MmYzODk0ZDUyYzIyMmM3OTM5NTRlOTg1YTY1NzNmNmYiLCJpYXQiOjE1NDM4ODcwMDIsIm5iZiI6MTU0Mzg4NzAwMiwiZXhwIjoxNTc1NDIzMDAyLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.iSbS7kaMoaENCAQjrW4PMkvCqP8pi7qa6fKXEMzWdQJkXcXJKX5pIhnxIISb4Udo_4ip__Uq0z9STKp26TL7Kj8Cp1hj7uxokxjc50IdtTercA32R1HWndCeqWYBr1QIVGSr5ByJVh49VQlcwm2EXVq0ll8LQlQelb05MIcmh0oLE4yJ5xA-wIEnHaegYVGn0JhjoyEWaeIxDF_UWlzUZJgtziUtYEf-zBBEeeGg3pdZcT6lDl_6tqOpNgVq1LZ0eBCcEhbJv2sz7TsScHigLNfHtx0UI0hV03bVb5pBods0wI-ieKCmH2xsOj81GQyQyiFCf7Cklw8di60ozm97bTTZRpnKbqLZ_0y9bw9oC23fWmgpqrrHjZ7JCWxhlQcqSFa1iMr7FOg3CQ_VHTdPlfbqg-rRSJkqdn0JULOZUbc6Q9864zBP9pmu5zDXkQWG4Tdhx1GdO8WMP9JuvswSDnHiN_dgkpgMlFlATsgAX9OP6HETkRey4Chre-fTTGZqytfdI3w13Jh8srF33DSWzb5AcSWzOqAdVZBDsjQxia9af4Wbl6OLkxaf7RM8GGbBkLX2UCdm5obwl_nmKD14BCEDWS3C3hEylHMqztib-YXShtW94KlIswSffENGC5XTOIysRe7X6tIuGhW5sg6Nzleg9UZMZ1-89kb5fVqpSJI";
				let urlOne = "https://receiptsus.loyaltyplatform.net/api/customers/"
				let email = document.getElementById('emailField').value;
				let query = "/stamps"
				let url = urlOne + email + query;

				$.ajax({
					beforeSend: function(xhr) {
						xhr.setRequestHeader("Authorization", "Bearer " + token)
					},
					url: url,
					method: 'GET',
					dataType: 'json'
				})
				
				//IF SUCCESS THEN DO THIS
				.then(function (data) {
				    //$.each(data, function (key, value)	
				    $("#email-h2").html(email);
				    $("#intro-h2").html("Stamps collected as of:");
			    	$("#date-h3").html(fullDate);

				    let stampQuant = data.data.active_stamps.count;
				    let stampQuantArray = [];
				    let stampTemp = 32;

					//CREATE AN ARRAY WITH ALL STAMPS

					for (i = 0; i < stampQuant; i++) {
						stampQuantArray.push("stamp");

						//let stampDates = data.data.active_stamps.data[i].datetime;
					}

					document.getElementById("nameForm").reset();

					//SPLIT STAMP ARRAY INTO SMALLER NESTED ARRAYS 15 LARGE MAX

					function chunkArray(myArray, chunk_size){
						var index = 0;
						var arrayLength = myArray.length;
						var tempArray = [];

						for (index = 0; index < arrayLength; index += chunk_size) {
							myChunk = myArray.slice(index, index+chunk_size);
			       			tempArray.push(myChunk); //FOR ARRAY OF ARRAYS
			       		}
			       		return tempArray;
			       	}

			       	let result = chunkArray(stampQuantArray, 15);
			       	let arrayLength = result.length;

					//LOOP THROUGH ARRAYS NESTED IN ARRAY TO CREATE NEW STAMP CARDS AND DETERMINE STAMP QUANTS AND FULL CARDS		

					if (arrayLength==0){
						let newStampCardNoStamps = "<div class='stampcard' id='stampCardEmpty'></div>";
						$('#stampBase').append(newStampCardNoStamps);
						let currentStampCardEmpty = document.getElementById('stampCardEmpty');
						for (let i=0; i < 15; i++){
								let newBlank = "<div class='blank'><div class='blank-inner'></div></div>";
								$(currentStampCardEmpty).append(newBlank);
							}	
						let stampTallyBlank = "<div class='cardtop' id='cardTop'><h2 id='tallyH2Blank' class='tally-h2'>0/15 STAMPS :( </h2></div>";
						$('#stampBase').append(stampTallyBlank);
					}
					else{
						for (let i = 0; i < arrayLength; i++) {
							let newStampCard = "<div class='stampcard' id='stampCard" + i + "'></div>";
							$('#stampBase').append(newStampCard);

							let tempArrayLength = result[i].length;
							let tempArrayBlank = 15 - result[i].length;
							let currentStampCard = document.getElementById('stampCard' + i);

							let stampTally = "<div class='cardtop' id='cardTop'><h2 id='tallyH2-" + i + "' class='tally-h2'>" + tempArrayLength + "/15 STAMPS</h2></div>";
							$('#stampBase').append(stampTally);
							let tallyTitle = document.getElementById('tallyH2-' + i);

							let fullCard = "<div class='fullcard'><h2 class='fullcard-h2-1'>COMPLETED CARD</h2><h2 class='fullcard-h2-2'>GET $5 OFF</h2></div>";
							
							if (tempArrayLength == 15){
								$(currentStampCard).append(fullCard);
								$(currentStampCard).addClass('filledcardlook');
								$(tallyTitle).addClass('filledcardh2');
							}

							//ADD THE NEW STAMPS AND BLANKS TO PREVIOUSLY CREATED CARDS 
							
							for (let i=0; i < tempArrayLength; i++){
								let newStamp = "<div class='stamp'><div class='stamp-inner'></div></div>";
								$(currentStampCard).append(newStamp);
							}
							for (let i=0; i < tempArrayBlank; i++){
								let newBlank = "<div class='blank'><div class='blank-inner'></div></div>";
								$(currentStampCard).append(newBlank);
							}	

						}
					}
				})

				.fail(function (jqXHR, textStatus) {
					console.log("Error: " + textStatus);
					$("#email-h2").html('');
			    	$("#intro-h2").html("");
			   		$("#date-h3").html('');

			   		let noDataBlurb = "<div class='nodatablurb'><h2 class='nodata-h2-1'>Hmmm... I'm afraid we couldn't find " + email + " in our database.</h2><h2 class='nodata-h2-2'>Are you sure that you've entered the correct information?</h2></div>";
					$('#stampBase').append(noDataBlurb);
				})
			}//getStamps

			function getRewards(){
				$('#rewardsBase').html('');
				
				let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0YWI4NTg3OThjMjhiMzlkNTRlZjQxYmE5NmRjYThiYzkwODRkZTEyODg2YjdmNDJmMzg5NGQ1MmMyMjJjNzkzOTU0ZTk4NWE2NTczZjZmIn0.eyJhdWQiOiIxIiwianRpIjoiMzRhYjg1ODc5OGMyOGIzOWQ1NGVmNDFiYTk2ZGNhOGJjOTA4NGRlMTI4ODZiN2Y0MmYzODk0ZDUyYzIyMmM3OTM5NTRlOTg1YTY1NzNmNmYiLCJpYXQiOjE1NDM4ODcwMDIsIm5iZiI6MTU0Mzg4NzAwMiwiZXhwIjoxNTc1NDIzMDAyLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.iSbS7kaMoaENCAQjrW4PMkvCqP8pi7qa6fKXEMzWdQJkXcXJKX5pIhnxIISb4Udo_4ip__Uq0z9STKp26TL7Kj8Cp1hj7uxokxjc50IdtTercA32R1HWndCeqWYBr1QIVGSr5ByJVh49VQlcwm2EXVq0ll8LQlQelb05MIcmh0oLE4yJ5xA-wIEnHaegYVGn0JhjoyEWaeIxDF_UWlzUZJgtziUtYEf-zBBEeeGg3pdZcT6lDl_6tqOpNgVq1LZ0eBCcEhbJv2sz7TsScHigLNfHtx0UI0hV03bVb5pBods0wI-ieKCmH2xsOj81GQyQyiFCf7Cklw8di60ozm97bTTZRpnKbqLZ_0y9bw9oC23fWmgpqrrHjZ7JCWxhlQcqSFa1iMr7FOg3CQ_VHTdPlfbqg-rRSJkqdn0JULOZUbc6Q9864zBP9pmu5zDXkQWG4Tdhx1GdO8WMP9JuvswSDnHiN_dgkpgMlFlATsgAX9OP6HETkRey4Chre-fTTGZqytfdI3w13Jh8srF33DSWzb5AcSWzOqAdVZBDsjQxia9af4Wbl6OLkxaf7RM8GGbBkLX2UCdm5obwl_nmKD14BCEDWS3C3hEylHMqztib-YXShtW94KlIswSffENGC5XTOIysRe7X6tIuGhW5sg6Nzleg9UZMZ1-89kb5fVqpSJI";
				let urlOne = "https://receiptsus.loyaltyplatform.net/api/customers/"
				let email = document.getElementById('emailField').value;
				let query = "/rewards"
				let url = urlOne + email + query;

				$.ajax({
					beforeSend: function(xhr) {
						xhr.setRequestHeader("Authorization", "Bearer " + token)
					},
					url: url,
					method: 'GET',
					dataType: 'json'
				})
				
				//IF SUCCESS THEN DO THIS
				.then(function (data) {
				    // $.each(data, function (key, value){
				    // 	console.log(data);
				    // })
   				    $("#rewardsBaseH2").html("Current Rewards");
	
				    console.log(data);
				    let rewardsQuant = data.data.rewards.count;

				    for (i = 0; i < rewardsQuant; i++) {
				    	let newRewardCont = "<div class='rewardcont'><div class='rewardcontinner1'><img class='rewardimg' src='./img/stampwithbg.png'/></div><div class='rewardcontinner2' id='rewardContInner2" + i + "'></div></div>";
				    	$('#rewardsBase').append(newRewardCont);
				    	let rewardTitle = data.data.rewards.data[i].name;
				    	let rewardTitleStyled = "<h2 class='reward-h2'>" + rewardTitle + "</h2>";
				    	$('#rewardContInner2' + i).append(rewardTitleStyled);
				    }

				})

				.fail(function (jqXHR, textStatus) {
					
				})
			}//getRewards		
			
			getStamps();
			getRewards();
		}


	});

});