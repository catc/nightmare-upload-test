
$('#test').on('change', function (){
	const files = this.files;
	console.log( files )
	$('#name').html(files[0].name);
	$('#type').html(files[0].type);
});