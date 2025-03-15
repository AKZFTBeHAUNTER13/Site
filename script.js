document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('obfuscateButton').addEventListener('click', () => {
    const file = document.getElementById('fileInput').files[0];
    const statusMessage = document.getElementById('statusMessage');
    const downloadButton = document.getElementById('downloadButton');

    if (!file) {
        statusMessage.textContent = "Por favor, selecione um arquivo .lua.";
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const luaCode = event.target.result;
        statusMessage.textContent = "Obfuscando...";

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
    };

    reader.readAsText(file);
});
