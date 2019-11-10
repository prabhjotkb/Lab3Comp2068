$(document).ready(function(){

    let user = localStorage.getItem("userDetails");
    if(user!=null){
        $("#fullName").html(JSON.parse(user).name.toUpperCase())
        $("#loginBranch").hide();
        $("#logout").show();
        $(".register").hide();
    }else{
        $("#loginBranch").show();
        $("#logout").hide();
        $(".register").show();
    }

    $("#logout").on("click",function(){
        localStorage.removeItem("userDetails");
        $("#loginBranch").show();
        $("#logout").hide();
        $(".register").show();
    });

    $("#login").on("click",function(){
        let username = $("#username").val();
        let password = $("#password").val();
        if(username!="" && password!=""){
            $.post("http://3.133.82.171:3000/login", 
            {
                "username":username,
                "password":password
            }).done(function(res, status ){
                localStorage.setItem("userDetails", JSON.stringify(res));
                $("#fullName").html(res.name.toUpperCase())
                    value = localStorage.getItem("userDetails");     
                    $("#loginBranch").hide();        
                    $("#logout").show(); 
                    $(".register").hide();  
            }).fail(function(XMLHttpRequest, textStatus, errorThrown){
                alert(JSON.parse(XMLHttpRequest.responseText).error);
            });
        }else{
            alert("Please enter valid credentials.")
        }
    });
    
    $("#registerUser").on("click",function(){
        let name = $("#name").val();
        let email = $("#email").val();
        let username = $("#usernameRegister").val();
        let password = $("#userPassword").val();
        let password2 = $("#userPassword2").val();
        if(username!="" && password!=""){
            $.post("http://3.133.82.171:3000/register", 
            {
                "name":name,
                "email":email,
                "username":username,
                "password":password,
                "password2":password2
            }).done(function(res, status ){
                localStorage.setItem("userDetails", JSON.stringify(res));
                    value = localStorage.getItem("userDetails");     
                    $("#fullName").html(res.name.toUpperCase())
                    $("#loginBranch").hide();        
                    $("#logout").show();   
                    $(".register").hide();
            }).fail(function(XMLHttpRequest, textStatus, errorThrown){

                alert(XMLHttpRequest.responseText);
            });
        }else{
            alert("Please enter valid credentials.")
        }
    })

});
