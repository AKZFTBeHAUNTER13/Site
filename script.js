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

            // Simulação de obfuscação (substitua com sua lógica real)
            const obfuscatedCode = simpleObfuscate(luaCode);

            obfuscatedCodeArea.value = obfuscatedCode;
            obfuscatedCodeArea.style.display = 'block'; // Mostra a área de texto

            // Cria o link para download
            const blob = new Blob([obfuscatedCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'obfuscatedCode.lua';
            downloadLink.style.display = 'inline-block'; // Mostra o link

            obfuscateButton.textContent = 'Download Obfuscado';
            statusMessage.textContent = "Obfuscação completa!";
        };

        reader.onerror = () => {
            statusMessage.textContent = "Erro ao ler o arquivo.";
        };

        reader.readAsText(file);
    });

    function simpleObfuscate(code) {
        // Implementação MUITO simples de obfuscação (NÃO USAR EM PRODUÇÃO)
        let obfuscated = code.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        return obfuscated;
    }
});
