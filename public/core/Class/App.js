// import { Window_ } from './Window.js';
import { Header_ } from './Header.js';

export class App_ {
    static #_apps = [];
    previousResize = {};

    constructor(appName) {

        this.element = document.createElement("div");
        this.element.id = appName;
        this.element.classList.add("app");

        this.Header_ = new Header_(appName);
        this.Header_.drag(this.element);

        this.content = document.createElement("iframe");
        // this.content.src = "http://localhost";
        this.content.classList.add("app_content");

        this.element.appendChild(this.Header_.element);
        this.element.appendChild(this.content);
        document.body.appendChild(this.element);
    }

    static open(appName) {
        this.#_apps[appName] = new App_(appName);
    }

    static resize(appName) {
        var app = this.#_apps[appName].element;
        app.classList.toggle("app_fullscreen");

        if (app.style.width == "100vw" && app.style.height == "100vh") {
            app.style.width = this.#_apps[appName].previousResize.width;
            app.style.height = this.#_apps[appName].previousResize.height;
            app.style.top = this.#_apps[appName].previousResize.top;
            app.style.left = this.#_apps[appName].previousResize.left;
        } else {
            this.#_apps[appName].previousResize = { width: app.style.width, height: app.style.height, top: app.style.top, left: app.style.left };
            app.style.width = "100vw";
            app.style.height = "100vh";
            app.style.top = "0";
            app.style.left = "0";
        }

    }


    static close(appName) {
        var app = this.#_apps[appName].element;
        app.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0)' }
        ], {
            duration: 200,
            easing: 'ease',
        });
        setTimeout(() => {
            app.remove();
            delete this.#_apps[appName];
        }, 190);

    }
}