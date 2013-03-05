<style>
body{display:none;}
</style>
<script>
// Password Message
var locstr = String(window.location.href);
if (locstr.indexOf('passUp') != -1) rbf_showInfoMessage("Password Successfully updated.", false);

//This will Hide The Welcome message in Rollbase
$(document).ready(function(){
	var t = window.setTimeout("removeWelcomeText()",100);
});

function removeWelcomeText(){
var a = $("#rb_infoMessageText").html();
	if (a.indexOf('Welcome to Rollbase!') !== -1) {
		$(".rbs_infoMessage").hide();
	}
	$("body").css("display","block");
}

</script>