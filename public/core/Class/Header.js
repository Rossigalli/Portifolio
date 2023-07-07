import { App_ } from './App.js';

export class Header_ {
    constructor(appName) {
        appName = appName.charAt(0).toUpperCase() + appName.slice(1);

        this.element = document.createElement('div');
        this.element.id = appName + '_header';
        this.element.classList.add('header');
        this.element.ondblclick = App_.resize.bind(App_, appName);


        this.title = document.createElement('div');
        this.title.innerText = appName;
        this.title.classList.add('header_title');

        this.menu = document.createElement('div');
        this.menu.classList.add('header_menu');

        // this.minimize = document.createElement('div');
        // this.minimize.classList.add('header_menu_item', 'header_menu_item_minimize');
        // this.minimize.onclick = App_.minimize.bind(App_, appName);

        this.resize = document.createElement('div');
        this.resize.classList.add('header_menu_item', 'header_menu_item_resize');
        this.resize.onclick = App_.resize.bind(App_, appName);

        this.close = document.createElement('div');
        this.close.classList.add('header_menu_item', 'header_menu_item_close');
        this.close.onclick = App_.close.bind(App_, appName);

        // this.menu.appendChild(this.minimize);
        this.menu.appendChild(this.resize);
        this.menu.appendChild(this.close);

        this.element.appendChild(this.title);
        this.element.appendChild(this.menu);
    }
}