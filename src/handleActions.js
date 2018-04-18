
module.exports = (action) => {
    switch (action) {
        case "DefaultWelcomeIntent.DefaultWelcomeIntent-yes":
            return "<br>Which one are you interested in?\
                    <p><form><input type='radio' name='category' value='category_vote' onchange='radioSelected(\"category\")'> Voting\
                    <br><input type='radio' name='category' value='category_climateChange' onchange='radioSelected(\"category\")'> Climate Change\
                    <br><input type='radio' name='category' value='category_tourism' onchange='radioSelected(\"category\")'> Tourism\
                    </form></p>";
        case "categoryClimate.categoryClimate-yes":
            // yes to reading the article
            return "<br><a href='https://www.theguardian.com/environment/2013/feb/07/polar-bears-fed-by-humans-survive?CMP=twt_gu'> Polar Bears Fed by Humans Survive</a>\
                    <p>Let us know when you're done by typing in \"I'm finished\" or \"I'm done\"</p>";
        case "categoryClimate.readingComplete":
            return "<p><form><input type='radio' name='climateQ1_ready' value='yes' onchange='radioSelected(\"climateQ1_ready\")'> Yes\
                <br><input type='radio' name='climateQ1_ready' value='no' onchange='radioSelected(\"climateQ1_ready\")'> No\
                </form></p>";
        case "climateReadDone.climateReadDone-yes":
            return "<script>sendMsg('start_climateQ1')</script>";
        case "categoryClimate.categoryClimate-no":
            return "<script>sendMsg('start_climateQ1')</script>";

        /**CLIMATE QUESTION 1**/    
        case "climateQ1":
            return "<p><form><input type='radio' name='climateQ1' value='climateQ1_yes' onchange='radioSelected(\"climateQ1\")'> Yes\
                    <br><input type='radio' name='climateQ1' value='climateQ1_no' onchange='radioSelected(\"climateQ1\")'> No\
                    </form></p>";
        case "climateQ1.climateQ1-custom":
            // follow up response
            return "<script>sendMsg('start_climateQ2')</script>";

        /**CLIMATE QUESTION 2**/    
        case "climateQ2":
            return "<p><form><input type='radio' name='climateQ2' value='yes' onchange='radioSelected(\"climateQ2\")'> Yes\
                    <br><input type='radio' name='climateQ2' value='no' onchange='radioSelected(\"climateQ2\")'> No\
                    </form></p>";
        case "climateQ2.climateQ2-yes":
            return "<p><form><input type='radio' name='climateQ2_followup' value='less_than_1cm' onchange='radioSelected(\"climateQ2_followup\")'> Less than 1 centimetre\
                    <br><input type='radio' name='climateQ2_followup' value='between_1-4cm' onchange='radioSelected(\"climateQ2_followup\")'> Between 1 and 4 centimetres\
                    <br><input type='radio' name='climateQ2_followup' value='more_than_4cm' onchange='radioSelected(\"climateQ2_followup\")'> More than 4 centimetres\
                    </form></p>";
        case "climateQ2.climateQ2-no":
            return "<script>sendMsg('start_climateQ3')</script>";
        case "climateQ2.climateQ2-yes.climateQ2-yes-custom":
            return "<script>sendMsg('start_climateQ3')</script>";
        
        /**CLIMATE QUESTION 3**/    
        case "climateQ3":
            return "<p><form><input type='radio' name='climateQ3' value='yes' onchange='radioSelected(\"climateQ3\")'> Yes\
                    <br><input type='radio' name='climateQ3' value='no' onchange='radioSelected(\"climateQ3\")'> No\
                    </form></p>";
        case "climateQ3.climateQ3-yes":
            return "<p><form><input type='radio' name='climateQ3_followup' value='climateQ3_birds' onchange='radioSelected(\"climateQ3_followup\")'> Birds\
                    <br><input type='radio' name='climateQ3_followup' value='climateQ3_fish' onchange='radioSelected(\"climateQ3_followup\")'> Fish\
                    <br><input type='radio' name='climateQ3_followup' value='climateQ3_polar_bears' onchange='radioSelected(\"climateQ3_followup\")'> Polar Bears\
                    </form></p>";
        case "climateQ3.climateQ3-no":
            return "<script>sendMsg('start_climateQ4')</script>";
        case "climateQ3.climateQ3-yes.climateQ3-yes-custom":
            return "<script>sendMsg('start_climateQ4')</script>";
        
        /**CLIMATE QUESTION 4**/    
        case "climateQ4":
            return "<p><form><input type='radio' name='climateQ4' value='less_than_0.05%' onchange='radioSelected(\"climateQ4\")'> Less than 0.05%\
                    <br><input type='radio' name='climateQ4' value='between_0.06%_and_1%' onchange='radioSelected(\"climateQ4\")'> Between 0.06% and 1%\
                    <br><input type='radio' name='climateQ4' value='more_than_1%' onchange='radioSelected(\"climateQ4\")'> More than 1%\
                    </form></p>";
        default:
            return "";
    }
}