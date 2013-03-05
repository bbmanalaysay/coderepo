<div class="btn_container" align="center">
<input type="button" value=" Lock for Auditing " onclick="lock_unlock('lock')" id="lock_button"></input>
<input type="button" value=" Unlock " onclick="lock_unlock('unlock')" id="unlock_button"></input>
</div>

<script>
$(document).ready(function(){	
	/* Retain only the field name */
	var thisLabel, remove1, remove2, remove4;
	$(".rbs_rightLabel").each(function(){
		thisLabel = $(this).html();
		/* Everything after these characters/words will be removed */
		remove1 = thisLabel.indexOf("[");
		remove2 = thisLabel.indexOf("equals");
		remove3 = thisLabel.indexOf("[taxpayer_identification_number]");
        remove4 = thisLabel.indexOf("[R95404485]");
		if(remove1 != -1) $(this).html(thisLabel.substring(0, remove1));
		if(remove2 != -1) $(this).html(thisLabel.substring(0, remove2));
		if(remove3 != -1) $(this).html(thisLabel.substring(0, remove3));
        if(remove4 != -1) $(this).html(thisLabel.substring(0, remove4));		
	});

	/* Change the Label of Return Period End > Return Period Start */
	var currLabel = String($("#opValueDet5").parent().parent().parent().parent().parent().parent().html());
	$("#opValueDet5").parent().parent().parent().parent().parent().parent().html(currLabel.replace(/Return Period End/g, "Return Period Start"));
	
	var TIN = $("input[name*='opValueDet0']");
	TIN.after("<div style='text-indent: 3px;font-size: 10px;'><p id = 'tin'>Format: ###<span>-</span>###<span>-</span>###<span>-</span>###</p></div>");
	
	var t = window.setInterval("removeOtherListViews();",100);
	
/*Modified by Benjie Manalaysay for TIN MASKING */	
$("input[value*='Clear']").hide().after("<input type='button' value=' Clear ' class='bold' onClick='clearAll();' />");
	numOnly(0);
	searchLength(0,15);
	searchButton(0,15, false);
	$('body').on('keypress',function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode == 13) return false;
	});
/*-----END----*/	
	
});

/* Hides the other list views that are not related to Audit Locking */
function removeOtherListViews(){
	var thisLabel, isSelected,
		forLocking = "Forms For Auditing/Locking",
		forUnlocking = "Forms For Auditing/Unlock";
	 $("[name='listViews'] > option").each(function(){
		thisLabel = $(this).html(), isSelected = $(this).attr("selected");
		if(thisLabel.indexOf(forLocking) == -1 && thisLabel.indexOf(forUnlocking) == -1 ) $(this).remove();
		
		/* Toggle the buttons */
		if(isSelected){
			if(thisLabel == forLocking){
				$("#lock_button").show(); $("#unlock_button").hide();
			}else if(thisLabel == forUnlocking){
				$("#lock_button").hide(); $("#unlock_button").show();
			}
		}
	});
	
	/* Hides the "More Actions" and "Select" picklists*/ 
	$(".left > select > option, .right > select > option").each(function(){
		if(($(this).html()).indexOf("More actions") != -1 || ($(this).html()).indexOf("Select") != -1) 
			$(this).parent().parent().hide();
	});
}

/* Select|Unselect the "Lock" or "Unlock" option in the "More Actions" picklist */
function lock_unlock(lockOrUnlock){
	var confirmMessage, actionName;
	if(lockOrUnlock == "unlock"){
		confirmMessage = "Are you sure you want to unlock selected form(s)?";
		actionName = "Unlock";
	}else{
		confirmMessage = "Are you sure you want to send selected form(s) for Auditing?";
		actionName = "Lock for Auditing";
	}
	var x = confirm(confirmMessage);
	if (x) {
		$(".left > select > option").each(function(){
			if(($(this).html()).indexOf(actionName) != -1){
				$(this).attr("selected",true).parent().trigger("change");
			}
		});
	} else {
		$(".left > select > option").each(function(){
			if(($(this).html()).indexOf("More actions") != -1){
				$(this).attr("selected",true);
			}
		});
	}	
}

/*modified by Benjie Manalaysay*/
/* Enable|Disable the 'Search' button 
- added masking
- added max length parameter
- new function searchLength
- new function for number only */
function searchButton(pos,len, disable){	
	var inputElem = $("input[name*='opValueDet"+pos+"']");	
	//Bind KeyUp event
	inputElem.keyup(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len && disable ) {
			$("input[value*='Search']").removeAttr("disabled");
			if (charCode == 13) $("input[value*='Search']").click();
		} else if (!disable) {
			if (charCode == 13) $("input[value*='Search']").click();
		} else
			$("input[value*='Search']").attr("disabled","disabled");
	});
	inputElem.focusout(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
		if( String( $(this).val() ).length == len && disable ) {
			$("input[value*='Search']").removeAttr("disabled");
			if (charCode == 13) $("input[value*='Search']").click();
		} else if (!disable) {
			if (charCode == 13) $("input[value*='Search']").click();
		} else
			$("input[value*='Search']").attr("disabled","disabled");
	});		
}
function searchLength(pos,len) {
	$("input[name*='opValueDet"+pos+"']").attr('maxlength',len);
}
function numOnly(pos) {
	var inputElem = $("input[name*='opValueDet"+pos+"']");
	//Bind keypress events
	inputElem.attr({
		"onkeydown":"return c_numerical(event,false);",
		"onkeypress":"return c_numerical(event,false);"
	});
}
function clearAll() {
	$("input[name*='opValueDet']").val("").focusout();
$("#opValueDet4").prop('selectedIndex', 0);
}
$("input[name*='opValueDet']").val("");	//clear onload
</script>