<script>
var d=document, userRole;

$(d).ready(function(){
	loader();
});

function loader(){
	if(!(parseInt("{!id}") > 0)){
		$("select[name=role] > option").each(function() {	
			userRole = String($(this).html());
			if( userRole.indexOf("Tax") != -1 ) $(this).remove();
		});
	}
}
</script>