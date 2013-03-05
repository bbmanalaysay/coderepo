<script>
/* Telephone Number */
$('#telephone_number_pre').attr({
'length':'3','maxlength':'3','size':'5'
});
$('#telephone_number').attr({
'length':'7','maxlength':'7','size':'9'
});
$('#rbi_F_telephone_number').prepend( $('#rbi_F_telephone_number_pre input') );
$('#rbi_F_telephone_number').append( '<br/>' );
$('#rbi_F_telephone_number').append( $('font', $('#rbi_F_telephone_number_pre').parent() ) );
$('#rbi_F_telephone_number').append( '<div><font size=1>Format: +### ###-####</font></div>' );

/* Cellphone Number */
$('#rbi_F_cellphone_number_2').prepend( $('#rbi_F_cellphone_number_1 input') );
$('#rbi_F_cellphone_number_2').append( '<br/>' );
$('#rbi_F_cellphone_number_2').append( $('font', $('#rbi_L_cellphone_number_1').parent() ) );
$('#rbi_F_cellphone_number_2').append( '<div><font size=1>Format: #### #######</font></div>' );

</script>
<style>
#rbi_L_telephone_number_pre,
#rbi_F_telephone_number_pre,
#rbi_L_cellphone_number_1,
#rbi_F_cellphone_number_1
{ display:none; }
</style>