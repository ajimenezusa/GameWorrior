$(document).ready(function(){
	
	

	var config = {
	    apiKey: "AIzaSyBJEf-9pGFWooqFdxd-sLAkozFU-YV369M",
	    authDomain: "project-weeken-warrior.firebaseapp.com",
	    databaseURL: "https://project-weeken-warrior.firebaseio.com",
	    projectId: "project-weeken-warrior",
	    storageBucket: "project-weeken-warrior.appspot.com",
	    messagingSenderId: "11980125710"
	  };
	    
	firebase.initializeApp(config);
// Create a variable to reference the database
	var database = firebase.database();
	var currentusername = sessionStorage.getItem("username");

	

	console.log("CURRENT USER :: "+currentusername);
		
	var userref = database.ref("users/"+currentusername);

	userref.once("value").then(function(snapshot) {

		$("#firstName").text(snapshot.val().firstname);
		$("#lastName").text(snapshot.val().lastname);
		$("#email").text(snapshot.val().email);
		console.log(snapshot.val().firstname);
    });

	$("#registration-form").validate({

		errorClass: 'invalid',
             errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text());
    	},
	    // Specify validation rules
	    rules: {
	      firstname: "required",
	      lastname: "required",
	      childfirstname: "required",
	      childlastname: "required",
	      dob: "required",
	      address: "required",
	      city: "required",
	      zipcode: "required",
	      email: {
	        required: true,
	        email: true
	      },
	      phone: {
	      	 required: true,
             number: true
         }
	      
	    },
	    // Specify validation error messages
	    messages: {
	      firstname: "Please enter your firstname",
	      lastname: "Please enter your lastname",
	      childfirstname: "Please enter your child's firstname",
	      childlastname: "Please enter your child's lastname",
	      dob: "Please select your child's date of birth",
	      address: "Please enter your address",
	      city: "Please enter your city",
	      zipcode: "Please enter your zipcode",
	      phone: {
                required: "Please enter your phone number",
                number: "Please enter only numeric value"
          },
	      email: "Please enter a valid email address"
	    }
	    // Make sure the form is submitted to the destination defined
	    // in the "action" attribute of the form when valid
	   /* submitHandler: function(form) {
	    	event.preventDefault();
	    	registeruser();
	     }*/
	  });

	var firstname,lastname,childfirstname,childlastname,address,city,zipcode,phone,email,dob,gamelocation,agegroup,emailnotify,textnotify;

	$("#ready").on("click", function(event){

		event.preventDefault();

		firstname = $("#firstName").val().trim();
		lastname = $("#lastName").val().trim();
		childfirstname = $("#childFirstName").val().trim();
		childlastname = $("#childLastName").val().trim();
		address = $("#address").val().trim();
		city = $("#city").val().trim();
		zipcode = $("#zipcode").val().trim();
		phone = $("#phoneNumber").val().trim();
		email = $("#email").val().trim();
		dob = moment($("#dateOfBirth").val().trim()).format('MM/DD/YYYY');
		gamelocation = $("#location").val().trim();
		agegroup = $("#agegroup").val().trim();
		emailnotify = $("#emailnotify").val();
		textnotify = $("#textnotify").val();
		childnextgame = moment().format("MM/DD/YYYY");

		var authuser = firebase.auth().currentUser;
		var userinfo = {

			firstname: firstname,
   			lastname: lastname,
   			email: email,
   			emailverified: authuser.emailVerified, 
  			address: address,
   			city: city,
   			phone: phone,
   			emailnotify: emailnotify,
   			textnotify: textnotify,
   			zipcode: zipcode
		}
		var childinfo = {

			childfirstname: childfirstname,
   			childlastname: childlastname,
   			dob: dob,
   			gamelocation: gamelocation,
   			agegroup: agegroup,
   			nextgame: childnextgame,
   			gamewin: 0,
   			gameplayed: 0
		}
			
   		var currentusername = sessionStorage.getItem("username");
			
		firebase.database().ref('users/'+currentusername+'/parent').update(userinfo);
		firebase.database().ref('users/'+currentusername+'/child'+childfirstname).set(childinfo);

		firebase.database().ref('users/'+currentusername+'/parent').once('value').then(function(snapshot){
  			console.log(snapshot.val().childfirstname);
  			$("#registration-form").reset();
  			alert("child information added successfully");
  		});
	
	});

	$("#addchild").on("click", function(){

		event.preventDefault();
		firebase.database().ref('users/'+currentusername+'/parent').once('value').then(function(snapshot){
  			
  			Materialize.updateTextFields();
  			console.log("Parent : "+snapshot.val().firstname);

  			$("#firstName").val(snapshot.val().firstname).focus();
  			$("#lastName").val(snapshot.val().lastname).focus();
  			$("#address").val(snapshot.val().address).focus();
  			$("#city").val(snapshot.val().city).focus();
  			$("#zipcode").val(snapshot.val().zipcode).focus();
  			$("#phoneNumber").val(snapshot.val().phone).focus();
  			$("#email").val(snapshot.val().email).focus();

  			
  		});

	});

});


