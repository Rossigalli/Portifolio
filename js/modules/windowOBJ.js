export class windowOBJ {
    constructor(title) {
        this.title = title;
        this.window = document.createElement("div");
        this.window.id = title;

        this.header = document.createElement("div");
        this.header.id = title + "_header";
        this.header.classList.add("header");
        this.header.innerHTML = title;

        this.closeButton = document.createElement("span");
        this.closeButton.classList.add("closeButton");
        this.closeButton.onclick = () => { this.close() };

        this.header.appendChild(this.closeButton);

        this.page = document.createElement("iframe");
        this.page.id = title + "_iframe";
        this.page.src = window.location.href + "pages/" + title + ".html";

        this.window.appendChild(this.header);
        this.window.appendChild(this.page);
        this.window.classList.add("window");

        document.body.appendChild(this.window);

        this.dragElement(this.window);
    }

    static getWindowOBJ(title) {
        if (!document.getElementById(title)) {
            return new windowOBJ(title);
        }
        else {
            return document.getElementById(title);
        }
    }

    close() {
        if (this.title != "Console") {
            this.window.remove();
            delete this
        }
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "_header")) {
            document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
