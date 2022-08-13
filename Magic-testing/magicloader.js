/* BLE debug info */
Puck.debug = 0;
/* Are we only putting a single app on a device? If so
apps should all be saved as .bootcde and we write info
about the current app into app.info */
Const.SINGLE_APP_ONLY = false;
/* Assume - until we know more - that we have no command
to show messages. */
Const.HAS_E_SHOWMESSAGE = false;
APP_SOURCECODE_DEV ="Magic-testing";

(function() {
  let username = "enaon";
  let githubMatch = window.location.href.match(/\/(\w+)\.github\.io/);
  if (githubMatch) username = githubMatch[1];
  Const.APP_SOURCECODE_URL = `https://github.com/${username}/eucWatch/tree/main/Magic-testing`;
})();

document.getElementById("apploaderlinks").innerHTML =  'This is not the <a href="https://espruino.com/apps/">official Espruino App Loader</a>.';
