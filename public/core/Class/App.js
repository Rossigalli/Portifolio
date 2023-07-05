import { Project_ } from './Project.js';
import { Header_ } from './Header.js';

export class App_ {
    static #_apps = [];
    previousResize = {};
    status = null;

    constructor(appName) {
        this.content = Project_.getProject(appName);

        if (this.content !== null) {
            this.element = document.createElement('div');
            this.element.id = appName;
            this.element.classList.add('app');

            this.Header_ = new Header_(appName);

            this.element.appendChild(this.Header_.element);
            this.element.appendChild(this.content);

            this.drag(this.element);
        } else {
            this.status = 'not found';
        }

    }

    static open(appName) {
        if (!this.#_apps.includes(appName)) this.#_apps[appName] = new App_(appName);

        else if (document.body.contains(this.#_apps[appName].element)) return;

        if (this.#_apps[appName].status !== 'not found') {
            document.body.appendChild(this.#_apps[appName].element);
            this.#_apps[appName].status = 'open';
        } else {
            delete this.#_apps[appName];
        }
    }

    static resize(appName) {
        var app = this.#_apps[appName].element;
        app.classList.toggle('app_fullscreen');

        if (app.style.width == '100vw' && app.style.height == '100vh') {
            app.style.width = this.#_apps[appName].previousResize.width;
            app.style.height = this.#_apps[appName].previousResize.height;
            app.style.top = this.#_apps[appName].previousResize.top;
            app.style.left = this.#_apps[appName].previousResize.left;
        } else {
            this.#_apps[appName].previousResize = { width: app.style.width, height: app.style.height, top: app.style.top, left: app.style.left };
            app.style.width = '100vw';
            app.style.height = '100vh';
            app.style.top = '0';
            app.style.left = '0';
        }

    }

    static close(appName) {
        var app = this.#_apps[appName];
        app.element.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0)' }
        ], {
            duration: 200,
            easing: 'ease-in-out',
        });
        setTimeout(() => {
            app.element.remove();
            app.status = 'closed'
        }, 150);
    }

    drag(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var iframe = null
        this.Header_.element.onmousedown = dragMouseDown.bind(this.Header_);

        function dragMouseDown(e) {
            if (e.target !== this.element && e.target !== this.title) return;
            iframe = this.element.nextElementSibling;

            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;

            iframe.contentDocument.onmousemove = function (e) {
                e.preventDefault();
                var iframeX = this.getBoundingClientRect().left + e.clientX;
                var iframeY = this.getBoundingClientRect().top + this.getBoundingClientRect().height + e.clientY;
                elementDrag(e, { clientX: iframeX, clientY: iframeY });
            }.bind(this.element);
        }

        function elementDrag(e, clientPos) {
            e = e || window.event;
            clientPos = clientPos || e;
            e.preventDefault();
            pos1 = pos3 - clientPos.clientX;
            pos2 = pos4 - clientPos.clientY;
            pos3 = clientPos.clientX;
            pos4 = clientPos.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            iframe.contentDocument.onmousemove = null;
        }
    }
}