import { App_ } from './App.js';

export class Header_ {
    constructor(appName) {
        this.element = document.createElement("div");
        this.element.id = appName + "_header";
        this.element.classList.add("header");
        this.element.ondblclick = App_.resize.bind(App_, appName);


        this.title = document.createElement("div");
        this.title.innerText = appName;
        this.title.classList.add("header_title");

        this.menu = document.createElement("div");
        this.menu.classList.add("header_menu");

        // this.minimize = document.createElement("div");
        // this.minimize.classList.add("header_menu_item", "header_menu_item_minimize");
        // this.minimize.onclick = App_.minimize.bind(App_, appName);

        this.resize = document.createElement("div");
        this.resize.classList.add("header_menu_item", "header_menu_item_resize");
        this.resize.onclick = App_.resize.bind(App_, appName);

        this.close = document.createElement("div");
        this.close.classList.add("header_menu_item", "header_menu_item_close");
        this.close.onclick = App_.close.bind(App_, appName);

        // this.menu.appendChild(this.minimize);
        this.menu.appendChild(this.resize);
        this.menu.appendChild(this.close);

        this.element.appendChild(this.title);
        this.element.appendChild(this.menu);
    }

    drag(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var iframe = null
        this.element.onmousedown = dragMouseDown.bind(this);

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
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            iframe.contentDocument.onmousemove = null;
        }
    }
}