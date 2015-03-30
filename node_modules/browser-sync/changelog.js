"use strict";

require("conventional-changelog")({
    from: "ac75299a84d0edfe39a2c1049433dc0258cbe5a0",
    repository: "https://github.com/BrowserSync/browser-sync",
    version: require("./package.json").version
}, function (err, log) {
    require("fs").writeFileSync("./CHANGELOG.md", log);
});
