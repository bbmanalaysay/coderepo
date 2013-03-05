<div class="headerText">Reports</div>

<script>
$(document).ready(function(){

/*Hide Edit and Delete */
	var user_role = '{!#CURR_USER.role#code}',
		isEdit, isDel, isPerm, isEditThisPage;
	if(user_role != "$admin"){

    $("#rbi_S_"+rbf_getSectionIdByTitle("List")).each(function(){
	   if( String($(this).html()).indexOf("|") != -1 ){
                       var test = String($(this).html()).replace(/\|/g,"");
                       $(this).html(test);
               }
       })

	$("a").each(function(){
			isEdit = $(this).html().indexOf("Edit") != -1,
			isDel = $(this).html().indexOf("Del") != -1,
			isPerm = $(this).html().indexOf("Permissions") != -1,
			isEditThisPage = $(this).html().indexOf("Edit this Page") == -1;
			if( (isEdit || isDel || isPerm ) && isEditThisPage ) {
				$(this).hide();
			}
		});
	}


$("a:contains('No. of TP Attempted to Proceed to Online Payment')").html("No. of TP Attempted To Proceed To Online Payment (TPs that actually clicked the "Proceed to Payment" button)");

	
});
</script>