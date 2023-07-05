var Project_ = (() => {
    var Projects = { "Console": location.href + "../app/projects/Console" };

    function createElement(appName) {
        var element = document.createElement("iframe");
        element.id = appName + "_project";
        element.classList.add("app_content");
        element.src = Projects[appName];

        return element;
    }

    return {
        getProject: (appName) => {
            if (appName in Projects) {
                return createElement(appName);
            } else {
                return null
            }
        }
    }
})()

export { Project_ };