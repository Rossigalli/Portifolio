var Project_ = (() => {
    var Projects = { 'console': parent.location.href + '../app/projects/Console' };

    function getProject(appName) {
        appName = appName.toLowerCase();
        if (appName in Projects) {
            return createElement(appName);
        } else {
            return null
        }
    }

    function createElement(appName) {
        var element = document.createElement('iframe');
        element.id = appName + '_project';
        element.classList.add('app_content');
        element.src = Projects[appName];

        return element;
    }

    return {
        getProject
    }
})()

export { Project_ };