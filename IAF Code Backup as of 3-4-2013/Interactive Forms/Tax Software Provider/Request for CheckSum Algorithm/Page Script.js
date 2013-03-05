<style>
.submit2, .tosa_buttons {
	cursor: pointer;
	/*display: block;*/
	height: 25px;
	width: 90px;
	text-align: center;
	line-height: 22px;
	color: #525252;
	padding: 1px 0 2px 0;
	border: 1px solid #B8B8B8;
	margin: 0;
	font-weight: bold;
	text-shadow: 0px 1px 0px white;
	font-size: 12px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	background: #E1E1E1;
	-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 1px 0 white;
	-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 1px 0 white;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 1px 0 white;
	float:none !important;
}

.tosa_buttons{
	margin:20px;
}

textarea:focus, input:focus {
	border: 1px solid #09C;
}
input {
	text-align: center;	
	font-size: 16px;
	margin-bottom: 10px;
}

.input2{
	display:block;
	border: 1px solid #999;
	height: 25px;
	width: 100%;
	-webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
	-moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);	
}
.cursor { cursor:pointer; }
.loginFormOuter { 
	margin:30px; position:relative;
	float:none;
	color: #666;
}
.loginForm {
	margin-top: 15px;	
}
#input_chal_Q{
	background: #AFF39E;
}
#challenge{
	width: 50%;
}
#submit_answer, #cancel_button{
	margin-top: 20px;
	width:150px;
}
font{
	font-family: 'Arial', 'Helvetica', sans-serif;
}
</style>

<script>
$(document).ready(function(){
	"Download Checksum Algorithm and Utility".c_sectionHide(false);
	
	rbf_selectQuery("SELECT challenge_question FROM USER WHERE id ={!#CURR_USER.id}", 1, function(data){
		$("#input_chal_Q").val(data[0][0]);
	});
});

function showSection(){
	"TOSA".c_sectionHide(false);
	"Download Checksum Algorithm and Utility".c_sectionHide(true);
}
function hideSection(){
	"TOSA".c_sectionHide(true);
	"Download Checksum Algorithm and Utility".c_sectionHide(false);
	$("#submit_answer").button("enable");
	$("#answer_Q").val(''); //clear answer
}

function sendEmail(){	
	var enteredAnswer = $("#answer_Q").val();
	if(enteredAnswer != ""){
		rbf_selectQuery("SELECT answer FROM USER WHERE id = {!#CURR_USER.id}", 1, function(data){
			var correctAnswer = data[0][0];
			if(enteredAnswer == correctAnswer){
				$("#submit_answer").button("disable","disabled");
				hideSection();			
				rbf_runTrigger("USER", parseInt("{!#CURR_USER.id}"), "^email_checksum");				
				alert("An email has been sent to you, containing the Checksum Algorithm.");
			}else{
				alert("The entered answer is incorrect.");
			}
		});
	}else{
		alert("Answer must not be blank.");
	}
}
</script>

<div class="loginFormOuter">
	<div class="loginForm">
	<div style="height:3px;"></div>
	<div align="center">
		<div id="challenge" align="center">
		
		<label for="chal_Q">Challenge Question</label>
		<input name="chal_Q" readonly='readonly' size="50" type="text" class="input2" id="input_chal_Q">
		
		<div>
			<b style="color:#000;">
			Once you answer your challenge question that you provided upon registration,
			you will receive an email with the Checksum's Algorithm, in a ZIP file.
			</b>
		</div><br/>
		
		<label for="answer" style="color:#000 !important;">Answer (Case Sensitive)</label>
		
		<input name="answer" autocomplete="OFF" size="50" type="password" class="input2" style="background:#FFC;" id="answer_Q">
		<div align="center">
		<input type="button" value=" Submit Answer " class="input2 cursor" id="submit_answer" onclick="sendEmail();"/>
		<input type="button" value=" Cancel " class="input2 cursor" id="cancel_button" onclick="hideSection();"/>
		</div>
		</div>
	</div>
</div> <!--loginFormOuter-->
</div> <!--loginFormOuter-->