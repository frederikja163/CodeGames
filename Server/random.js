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

exports.randomWord = (words) =>
{
    return words[random(0, words.length - 1)];
}

exports.randomPosition = (width, height) =>
{
	var pos;
	pos.x = random(0, width - 1);
	pos.y = random(0, height - 1);
	return pos;
}