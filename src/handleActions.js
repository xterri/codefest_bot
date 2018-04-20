const botscript         = require('../Botscript/script.json');

module.exports = (action, locale) => {
    let script = botscript[action];
    let setString = "";

    if (!script) {
        return setString;
    }

    // set string to include first message
    if (script.msgs) {
        setString += script.msgs[locale];
    }

    // check if inputs exists
    if (script.inputs) {
        let type = script.inputs.type;
        let name = script.inputs.name;

        setString += "<p><form>";

        // use loop to fill in the input form
        for (valueKey in script.inputs.value[locale]) {
            setString += "<input type=" + type + " name=" + name + " value=" + valueKey + " onchange='radioSelected(\"" + name + "\")'>" + script.inputs.value[locale][valueKey] + "<br>";
        };

        // end by APPENDING >> </form></p>
        setString += "</form></p>";
    }

    return setString;
}