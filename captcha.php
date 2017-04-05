<?php
	if($_POST['captcha'] == 'a1b1'){
		echo json_encode(true);
	}else{
		echo json_encode(false);
	}
	
