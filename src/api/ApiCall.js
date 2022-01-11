export default function getAvatar(number){
	let randomNumber;
	number != undefined ?  randomNumber = Math.floor(Math.random() * 5000 ) :randomNumber=number;
	return ("https://avatars.dicebear.com/api/human/"+randomNumber+".svg");
}