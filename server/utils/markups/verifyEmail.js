const verifyEmailMarkup = (username, token, host) => `
<!DOCTYPE html>
<html lang="en"> 
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Writalil</title>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<style>
* {
font-family: "Nunito", "Courier New", Courier, monospace;
}

body {
padding: 50px;
}
.container {
width: 80%;
margin: auto;
box-shadow: 0px 0px 5px rgb(223, 222, 222);
}
.logo {
display: block;
}
.logo img {
float: right;
padding: 2%;
}
h2 {
margin-top: 100px;
position: relative;
background: #613F5E;
display: inline-block;
color: white;
padding: 20px;
font-size: 3rem;
text-transform: capitalize;
}
h2:after {
position: absolute;
z-index: -1;
content: "";
right: -10%;
top: 0;
height: 100%;
width: 100%;
background-color: inherit;
-webkit-transform: skewX(-10deg);
-moz-transform: skewX(-10deg);
-ms-transform: skewX(-10deg);
transform: skewX(-10deg);
}
.content {
padding: 50px 20px;
text-align: center;
}
.verifyLink {
display: inline-block;
color: white;
background: #613F5E;
margin-top: 20px;
padding: 10px;
text-decoration: none;
font-size: 1.5em;
border-radius: 5px;
}
</style>
</head>
<body>
<div class="container">
<div class="logo">
<img src="https://res.cloudinary.com/aoimageupload/image/upload/v1571518335/Logo.svg"
alt="WL_logo" />
</div>
<h2 class="purpose">Verify your email</h2>
<div class="content">
<h3 class="username">Hello ${username},</h3>
<p class="message">
You signed up for our little writing community and we would like to confirm your email.
</p>
<p class="message">Please, click the button below to proceed.</p>
<a class="verifyLink" style="color:#ffffff;" href="${host}/api/v1/user/verification?token=${token}" target="_blank">
Verify
</a>
</div>
</div>      
</body>
</html>
`;

export default verifyEmailMarkup;
