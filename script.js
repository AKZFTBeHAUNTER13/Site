document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileContentArea = document.getElementById('fileContent');
    const statusMessage = document.getElementById('statusMessage');

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            fileContentArea.value = reader.result;
            statusMessage.textContent = "Arquivo carregado com sucesso!";
        };
        reader.onerror = () => {
            statusMessage.textContent = "Erro ao ler o arquivo.";
        };
        reader.readAsText(file);
    }
});

document.getElementById('obfuscateButton').addEventListener('click', () => {
    const file = document.getElementById('fileInput').files[0];
    const statusMessage = document.getElementById('statusMessage');
    const downloadButton = document.getElementById('downloadButton');
    const fileContentArea = document.getElementById('fileContent');

    if (!file) {
        statusMessage.textContent = "Por favor, selecione um arquivo .lua.";
        return;
    }

    statusMessage.textContent = "Obfuscando o arquivo...";

    const reader = new FileReader();
    reader.onload = (event) => {
        const luaCode = event.target.result;

        try {
            // Simples obfuscação substituindo caracteres por números
            const obfuscatedCode = luaCode
                .split("")
                .map(char => char.charCodeAt(0))
                .join(",");

            const finalCode = `local code = {${obfuscatedCode}}\nlocal str = ''\nfor i=1,#code do str = str .. string.char(code[i]) end\nloadstring(str)()`;

            const blob = new Blob([finalCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            downloadButton.href = url;
            downloadButton.download = "fileobfuscated.lua";
            downloadButton.style.display = "block";

            statusMessage.textContent = "Obfuscação completa!";
        } catch (error) {
            statusMessage.textContent = "Erro ao obfuscar o arquivo.";
        }
    };

    reader.readAsText(file);
});
