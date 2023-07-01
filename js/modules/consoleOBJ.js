import { windowOBJ } from "./windowOBJ.js";

export class consoleOBJ {
    constructor() {
        this.app = windowOBJ.getWindowOBJ("Console")
        this.iframe = this.app.page
        window.addEventListener("DOMContentLoaded", () => {
            this.iframe.addEventListener("load", () => {
                this.input = this.iframe.contentDocument.getElementById("Console_input")
                this.output = this.iframe.contentDocument.getElementById("Console_output")
                this.prefix = this.iframe.contentDocument.getElementById("Input_prefix")
                this.input.addEventListener("keydown", this.submit.bind(this))
            })
        });
    }

    clearInput() {
        this.input.innerHTML = '';
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.clearInput()
    }

    echo(msg, prefix = true) {
        this.output.innerHTML += prefix ? this.prefix.innerHTML + " " + msg : msg
    }

    execute(msg) {
        this.echo(msg)
        this.clearInput()
        msg = msg.split(' ', 2)
        switch (msg[0]) {
            case "cls":
                this.clearTerminal()
                break

            case "help":
                this.clearTerminal()
                let table = `
                <table>
                    <tr>
                        <td>[L]</td>
                        <td>cls<td>
                        <td>Limpa o console.</td>
                    </tr>
                    <tr>
                        <td>[H]</td>
                        <td>help<td>
                        <td>Lista todos os comandos.</td>
                    </tr>
                   <tr>
                        <td></td>
                        <td>projeto<td>
                        <td>Lista todos os projetos.</td>
                    </tr>   
                </table><br>
                `
                this.echo(table)
                break

            case "projeto":
                if (msg[1] != null) {
                    fetch(window.location.href + "pages/" + msg[1] + '.html').then(response => {
                        if (response.status == 200) {
                            if (windowOBJ.getWindowOBJ(msg[1]) instanceof Element) {
                                this.echo("<br>Projeto já aberto.<br><br>", false)
                            } else {
                                this.echo("<br>Projeto inciado<br><br>", false)
                            }
                        } else {
                            this.echo("<br>Projeto não encontrado.<br><br>", false)
                        }
                    })
                } else {
                    this.echo("<br>Escreva 'projeto [nome]' para ver o projeto<br><br>", false)
                    this.echo("teste<br>", false)
                    // this.echo("Ramais<br>", false)
                    // this.echo("Docs<br>", false)
                    // this.echo("Gamejam<br>", false)
                    // this.echo("ArenaFatec<br>", false)
                    // this.echo("Cpnc<br><br>", false)
                }
                break
            default:
                this.echo("<br>Comando não encontrado, digite 'help' para ver os comandos disponíveis.<br><br>", false)
        }
    }

    getInput() {
        return this.input.innerText
    }

    submit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.execute(this.getInput())
        } else if (event.ctrlKey && event.key === "l") {
            event.preventDefault();
            this.execute("cls")
        } else if (event.ctrlKey && event.key === "h") {
            event.preventDefault();
            this.execute("help")
        }
    }
}



//

// function submit(event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         outputOBJ.innerHTML += prefixOBJ.innerHTML + " " + inputOBJ.innerHTML;
//         execute(inputOBJ.innerText.split(' ', 2), event);
//         inputOBJ.innerHTML = "";

//     }
// }

// function execute(text = [null], event = null) {
//     if (event.ctrlKey && event.key === 'l' || text[0] == "cls") {
//         event.preventDefault();
//         clear();
//     } else if (event.ctrlKey && event.key === 'h' || text[0] == "help") {
//         event.preventDefault();
//         clear();
//         outputOBJ.innerHTML += `
// comandos disponíveis:
// <table>
//     <tr>
//         <td>[L]</td>
//         <td>cls<td>
//         <td>Limpa o console.</td>
//     </tr>
//     <tr>
//         <td>[H]</td>
//         <td>help<td>
//         <td>Lista todos os comandos.</td>
//     </tr>
//
//     <tr>
//         <td></td>
//         <td>recomendação<td>
//         <td>Lista todas as recomendações.</td>
//     </tr>
// </table><br><br>`;
//     } else if (text[0] == "projeto") {
//         if (text[1] == null) {
//             outputOBJ.innerHTML += "<br>Projetos disponíveis:<br><br>";
//         } else {
//             fetch("../pages/" + text[1] + '.html').then(
//                 response => {
//                     if (response.status == 200) {

//                     } else {
//                         outputOBJ.innerHTML += "<br>Projeto não encontrado.<br><br>";
//                     }
//                 }
//             )
//         }
//     }

//     else if (text[0] != null) {
//         outputOBJ.innerHTML += "<br>Comando não reconhecido - tente \"help\" caso esteja perdido.<br><br>";
//     }
// }


// function clear() {
//     outputOBJ.innerHTML = "";
//     inputOBJ.innerHTML = "";
// }

// inputOBJ.addEventListener("keypress", submit);
// inputOBJ.addEventListener("keydown", execute.bind(this, [null, null]));





