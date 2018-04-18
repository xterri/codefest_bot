module.exports = (action) => {
    switch (action) {
        case "DefaultWelcomeIntent.DefaultWelcomeIntent-yes":
            return "<br>Which one are you interested in?\
                    <p><form action='/' method='post'><input type='radio' name='category' value='vote'> Voting\
                    <br><input type='radio' name='category' value='climateChange'> Climate Change\
                    <br><input type='radio' name='category' value='tourism'> Tourism\
                    </form></p>";
        default:
            return "";
    }
}