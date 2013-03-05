<style>
/*#rbi_S_295124{
	position:relative;
	bottom:35px;
} */

tr.groupRow td {
	display: none;
	color: #777777;
	padding: 2px 2px 2px 4px;
}

tr.groupRow {
	border-bottom: 0px solid #DDDDDD;
	background-color: #E8FCDC;
	display: none;
}

#rbi_S_44099{
	padding-top:40px;
}
.rbs_viewSectionLinks{display:none;}
</style>

<script>
$(document).ready(function(){
	var t = window.setInterval("removeOtherListViews()",100);
});

/* Hides the other list views that are not related to the "TA Maintenance" module */
function removeOtherListViews(){
	/*var thisLabel, isSelected,
		accTA = "Accredited Tax Agents",
		disAccTA = "Disaccredited Tax Agents";
	 $("[name='listViews'] > option").each(function(){
		thisLabel = $(this).html(), isSelected = $(this).attr("selected");
		if(thisLabel.indexOf(accTA) == -1 && thisLabel.indexOf(disAccTA) == -1 ) $(this).remove();
		
		//Show Hide the "Disaccredit" button:
		if(isSelected){
			if(thisLabel == accTA){
				$("#disaccredit_button").show();
			}else if(thisLabel == disAccTA){
				$("#disaccredit_button").hide();
			}
		}
	});*/
	
	/* Hides the "More Actions" and "Select" picklists*/ 
	$(".left > select > option, .right > select > option").each(function(){
		if(($(this).html()).indexOf("More actions") != -1 || ($(this).html()).indexOf("Select") != -1) 
			$(this).parent().parent().hide();
	});
}

/* Select|Unselect the "Disaccredit" option in the "More Actions" picklist*/
function c_disaccredit(){
	var x = confirm("Are you sure you want to disaccredit selected Tax Agent(s)?");
	if (x) {
		$("#disaccredit_button").attr("enabled",false);
		$(".left > select > option").each(function(){
			if(($(this).html()).indexOf("Disaccredit") != -1){
				$(this).attr("selected",true).parent().trigger("change");
			}
		});
	} else {
		$("#disaccredit_button").attr("enabled",true);
		$(".left > select > option").each(function(){
			if(($(this).html()).indexOf("More actions") != -1){
				$(this).attr("selected",true);
			}
		});
	}	
}
</script>