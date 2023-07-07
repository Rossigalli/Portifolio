import { App_ } from '../../../../../public/core/class/App.js';

var Console_ = (() => {
    var element = null;
    var input = null;
    var output = null;
    var prefix = null;
    var commandList =
        `<table>
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
    </table><br>`
    // <tr>
    //     <td></td>
    //     <td>contato<td>
    //     <td>Lista todos os contatos.</td>
    // </tr>
    // <tr>
    //     <td></td>
    //     <td>rossigalli<td>
    //     <td>Lista todas as informações sobre mim.</td>
    // </tr>

    var projectsList = `
    <br>Projetos disponíveis<br><br>
    <table>
        <tr><td>ArenaFatec</td></tr>
        <tr><td>Cpnc</td></tr>
        <tr><td>DevPrompt</td></tr>
        <tr><td>Docs</td></tr>
        <tr><td>Gamejam</td></tr>
        <tr><td>QrEleitoral</td></tr>
        <tr><td>Ramais</td></tr>
    </table>
    <br>    
    Escreva "projeto [nome]" para ver o projeto<br><br>`


    function init() {
        if (document.body.contains(element)) return;

        else document.body.appendChild(newConsoleElement());
    }

    function newConsoleElement() {
        element = document.createElement('div');
        element.id = 'Console_container';

        element.appendChild(newInputElement());
        element.appendChild(newPrefixElement());
        element.appendChild(newOutputElement());

        echo('Matheus Rossigalli &copy; 2023<br>')
        echo('Bem vindo ao meu portifólio, digite "help" para ver os comandos disponíveis.<br><br>')

        return element;
    }

    function newOutputElement() {
        if (output) return output;

        output = document.createElement('div');
        output.id = 'Console_output';
        output.onclick = () => {
            input.focus();
        }

        return output;
    }

    function newPrefixElement() {
        if (prefix) return prefix;

        prefix = document.createElement('div');
        prefix.id = 'Console_prefix';
        prefix.innerHTML = 'C:\\Portifólio: > ';

        return prefix;
    }

    function newInputElement() {
        if (input) return input;

        input = document.createElement('div');
        input.id = 'Console_input';
        input.contentEditable = true;
        input.spellcheck = false;

        input.onkeydown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                execute(input.innerText);
            } else if (event.ctrlKey && event.key === 'l') {
                event.preventDefault();
                execute('cls')
            } else if (event.ctrlKey && event.key === 'h') {
                event.preventDefault();
                execute('help')
            }
        }

        return input;
    }

    function echo(msg, hasPrefix = false) {
        output.innerHTML += hasPrefix ? prefix.innerHTML + ' ' + msg : msg
    }

    function clearConsole(canOutput = true, canInput = true) {
        if (canOutput) output.innerHTML = '';
        if (canInput) input.innerHTML = '';
    }


    function execute(command) {
        clearConsole(false, true)
        echo(command, true)
        command = command.toLowerCase().split(' ', 2)
        switch (command[0]) {
            case 'cls':
                clearConsole()
                break

            case 'help':
                echo(commandList)
                break

            case 'projeto':
                if (command[1]) {
                    var message = App_.open(command[1], parent.document)
                    echo('<br>' + message + '<br><br>')
                } else {
                    echo(projectsList)
                }
                break

            default:
                echo('<br>Comando não encontrado, digite "help" para ver os comandos disponíveis.<br><br>')
        }
    }

    return {
        init,
    }
})()

export { Console_ };