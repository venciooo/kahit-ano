<?php
require_once ("../include/initialize.php");
 	 // if (!isset($_SESSION['ADMIN_USERID'])){
   //    redirect(web_root."admin/index.php");
   //   }


$action = (isset($_GET['action']) && $_GET['action'] != '') ? $_GET['action'] : '';

switch ($action) {
	case 'add' :
	doInsert();
	break;
	
	case 'edit' :
	doEdit();
	break;
	
	case 'delete' :
	doDelete();
	break;

 
	}

function calcutateAge($dob){

        $dob = date("Y-m-d",strtotime($dob));

        $dobObject = new DateTime($dob);
        $nowObject = new DateTime();

        $diff = $dobObject->diff($nowObject);

        return $diff->y;

}
   
	function doInsert(){
		global $mydb;
		// if(isset($_REQUEST['save'])){
 
  // // // `Fullname`, `CompanyName`, `F_Address`, `S_Address`, `ContactNo`

		$sql="SELECT * FROM tblpatients WHERE Fname='".trim($_POST['Fname'])."' AND Lname='".trim($_POST['Lname'])."'  AND Mname='".trim($_POST['Mname'])."'";
		$mydb->setQuery($sql);
		$cur = $mydb->executeQuery();
		$maxrow = $mydb->num_rows($cur);

		if($maxrow>0){ 
		    
			if (isset($_GET['modal'])) {
				# code... 
				echo '<script>alert("Name already exist.");</script>'; 
			} else{
				message("Name already exist!", "error");
				redirect("index.php?view=add");
			}

		}else{

			$age = calcutateAge($_POST['BirthDate']);

			$patient = New Patients();
			$patient->Fname			= trim($_POST['Fname']); 
			$patient->Mname			= trim($_POST['Mname']); 
			$patient->Lname			= trim($_POST['Lname']); 
			$patient->F_Address		= $_POST['F_Address'];
			$patient->Sex			= $_POST['Sex'];
			$patient->BirthDate		= $_POST['BirthDate'];
			$patient->Age			= $age;
			$patient->ContactNo		= $_POST['ContactNo'];  
			$patient->create();


			// if (isset($_GET['modal'])) {
			// 	# code... 
			// 	echo "New Patient created successfully!";
			// } else{
			// 	message("New Patient created successfully!", "success");
			// 	redirect("index.php");
			// }
			
		}
 
 
			
			
		// echo "get";
		// }  

	}

	function doEdit(){
		if(isset($_POST['save'])){

			$age =calcutateAge($_POST['BirthDate']);

			$patient = New Patients();
			$patient->Fname			= trim($_POST['Fname']); 
			$patient->Mname			= trim($_POST['Mname']); 
			$patient->Lname			= trim($_POST['Lname']); 
			$patient->F_Address		= $_POST['F_Address'];
			$patient->Sex			= $_POST['Sex'];
			$patient->BirthDate		= $_POST['BirthDate'];
			$patient->Age			= $age;
			$patient->ContactNo		= $_POST['ContactNo'];  
			$patient->update($_POST['PatientID']);

			message("Patient has been updated!", "success");
			redirect("index.php");
		}

	}


	function doDelete(){
		global $mydb;
		// if (isset($_POST['selector'])==''){
		// message("Select a records first before you delete!","error");
		// redirect('index.php');
		// }else{

			$id = $_GET['id'];

			$patient = New Patients();
			$patient->delete($id);

			$user = New User();
			$user->delete($id);

			$sql = "DELETE FROM `tblinvoice` WHERE `PatientID`=".$id;
			$mydb->setQuery($sql);
			$mydb->executeQuery();

		 

		    $sql = "DELETE FROM `tblpayments`  WHERE PatientID=".$id;
			$mydb->setQuery($sql);
			$mydb->executeQuery();
 

			message("Patient has been Deleted!","info");
			redirect('index.php');

		// $id = $_POST['selector'];
		// $key = count($id);

		// for($i=0;$i<$key;$i++){

		// 	$category = New Category();
		// 	$category->delete($id[$i]);

		// 	message("Category already Deleted!","info");
		// 	redirect('index.php');
		// }
		// }
		
	}
?>