

var inputOBJ = document.getElementById("Console_input");
var prefixOBJ = document.getElementById("Console_prefix");
var outputOBJ = document.getElementById("Console_output");

function submit(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        outputOBJ.innerHTML += prefixOBJ.innerHTML + " " + inputOBJ.innerHTML;
        execute(inputOBJ.innerText.split(' ', 2), event);
        inputOBJ.innerHTML = "";

    }
}

function execute(text = [null], event = null) {
    if (event.ctrlKey && event.key === 'l' || text[0] == "cls") {
        event.preventDefault();
        clear();
    } else if (event.ctrlKey && event.key === 'h' || text[0] == "help") {
        event.preventDefault();
        clear();
        outputOBJ.innerHTML += `
comandos disponíveis:
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
    <tr>
        <td></td>
        <td>recomendação<td>
        <td>Lista todas as recomendações.</td>
    </tr>
</table><br><br>`;
    } else if (text[0] == "projeto") {
        if (text[1] == null) {
            outputOBJ.innerHTML += "<br>Projetos disponíveis:<br><br>";
        } else {
            fetch("../pages/" + text[1] + '.html').then(
                response => {
                    if (response.status == 200) {

                    } else {
                        outputOBJ.innerHTML += "<br>Projeto não encontrado.<br><br>";
                    }
                }
            )
        }
    }

    else if (text[0] != null) {
        outputOBJ.innerHTML += "<br>Comando não reconhecido - tente \"help\" caso esteja perdido.<br><br>";
    }
}


function clear() {
    outputOBJ.innerHTML = "";
    inputOBJ.innerHTML = "";
}

inputOBJ.addEventListener("keypress", submit);
inputOBJ.addEventListener("keydown", execute.bind(this, [null, null]));





