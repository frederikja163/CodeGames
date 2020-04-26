class ImageLoader
{
    static load()
    {
        ImageLoader.RoleIcons = {
            PRESENTER : loadImage("https://i.imgur.com/mK0Ixs8.png"), 
            GUESSER : loadImage("https://i.imgur.com/0UNW76U.png"),
            SPECTATOR : loadImage("https://i.imgur.com/Yz4ZStI.png")
        }
    }
}