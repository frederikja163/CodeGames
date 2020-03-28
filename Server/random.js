function random(min, max)
{
  	return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.generateID = (length) =>
{
	const validChars = "abcdefghijklmnopqrstuvxyz1234567890";
	var str = "";
	for (var i = 0; i < length; i++)
	{
		var char = validChars.charAt(random(0, validChars.length - 1));
		str += char;
	}
	return str;
}

//Tage en list af ord, retunere et tilfældigt ord.
exports.randomWord = (words) =>
{
    return words[random(0, words.length - 1)];
}