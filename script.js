document.getElementById('obfuscateButton').addEventListener('click', () => {
    const file = document.getElementById('fileInput').files[0];
    const statusMessage = document.getElementById('statusMessage');
    const downloadButton = document.getElementById('downloadButton');
    const fileContentArea = document.getElementById('fileContent');

    if (!file) {
        statusMessage.textContent = "Por favor, selecione um arquivo .lua.";
        return;
    }

    statusMessage.textContent = "Obfuscando o arquivo... Isso pode levar alguns segundos.";

    const reader = new FileReader();
    reader.onload = (event) => {
        const luaCode = event.target.result;
        
        try {
            // Dividir o código em partes menores para evitar travamentos
            const chunkSize = 1000; // Define o tamanho do bloco de caracteres
            let parts = [];
            for (let i = 0; i < luaCode.length; i += chunkSize) {
                const chunk = luaCode.slice(i, i + chunkSize)
                    .split("")
                    .map(char => char.charCodeAt(0))
                    .join(",");
                parts.push(`table.concat({${chunk}}, ",")`);
            }

            const finalCode = `
                local data = {${parts.join(",")}}
                local str = ""
                for _, chunk in ipairs(data) do
                    for num in string.gmatch(chunk, "%d+") do
                        str = str .. string.char(tonumber(num))
                    end
                end
                loadstring(str)()
            `;

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
