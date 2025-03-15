document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const obfuscateButton = document.getElementById('obfuscateButton');
    const obfuscatedCodeArea = document.getElementById('obfuscatedCode');
    const downloadLink = document.getElementById('downloadLink');
    const statusMessage = document.getElementById('statusMessage');

    obfuscateButton.addEventListener('click', () => {
        const file = fileInput.files[0];

        if (!file) {
            statusMessage.textContent = "Por favor, selecione um arquivo .lua.";
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const luaCode = event.target.result;
            statusMessage.textContent = "Obfuscando...";

            // Converter código para números
            const obfuscatedCode = numberObfuscate(luaCode);

            obfuscatedCodeArea.value = obfuscatedCode;
            obfuscatedCodeArea.style.display = 'block';

            const blob = new Blob([obfuscatedCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'obfuscated.lua';
            downloadLink.style.display = 'inline-block';

            obfuscateButton.textContent = 'Download Obfuscado';
            statusMessage.textContent = "Obfuscação completa!";
        };

        reader.onerror = () => {
            statusMessage.textContent = "Erro ao ler o arquivo.";
        };

        reader.readAsText(file);
    });

    function numberObfuscate(code) {
        let encoded = [];
        for (let i = 0; i < code.length; i++) {
            encoded.push(code.charCodeAt(i)); // Converte cada caractere para número
        }
        
        return `local x={${encoded.join(",")}}for i=1,#x do io.write(string.char(x[i]))end`;
    }
});
