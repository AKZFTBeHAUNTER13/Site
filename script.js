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

            // Obfuscação MUITO avançada (para dificultar a leitura)
            const obfuscatedCode = advancedObfuscate(luaCode);

            obfuscatedCodeArea.value = obfuscatedCode;
            obfuscatedCodeArea.style.display = 'block';

            const blob = new Blob([obfuscatedCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'obfuscatedCode.lua';
            downloadLink.style.display = 'inline-block';

            obfuscateButton.textContent = 'Download Obfuscado';
            statusMessage.textContent = "Obfuscação completa!";
        };

        reader.onerror = () => {
            statusMessage.textContent = "Erro ao ler o arquivo.";
        };

        reader.readAsText(file);
    });

    function advancedObfuscate(code) {
        let obfuscated = code;

        // 1. Caracteres Unicode confusos
        const unicodeReplacements = {
            'a': '\u0430', // Cyrillic 'а'
            'b': '\u03b2', // Greek 'β'
            'e': '\u0435', // Cyrillic 'е'
            'o': '\u03bf', // Greek 'ο'
            'p': '\u0440', // Cyrillic 'р'
            'A': '\u0410', // Cyrillic 'А'
            'B': '\u0392', // Greek 'Β'
            'E': '\u0415', // Cyrillic 'Е'
            'O': '\u039f', // Greek 'Ο'
            'P': '\u0420'  // Cyrillic 'Р'
        };

        for (const char in unicodeReplacements) {
            const regex = new RegExp(char, 'g');
            obfuscated = obfuscated.replace(regex, unicodeReplacements[char]);
        }

        // 2. Mistura de maiúsculas e minúsculas aleatórias
        obfuscated = obfuscated.replace(/[a-zA-Z]/g, (char) => {
            return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
        });

        // 3. Números "empilhados" (Combining Diacritical Marks)
        const combiningMarks = ["\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305", "\u0306", "\u0307", "\u0308", "\u0309"]; // Exemplos
        obfuscated = obfuscated.replace(/[0-9]/g, (digit) => {
            let result = digit;
            const numMarks = Math.floor(Math.random() * 3); // Até 2 marcas
            for (let i = 0; i < numMarks; i++) {
                result += combiningMarks[Math.floor(Math.random() * combiningMarks.length)];
            }
            return result;
        });

        // 4. Caracteres de controle (RTL/LTR overrides)
        const rtl = '\u202B'; // Right-to-Left Override
        const ltr = '\u202A'; // Left-to-Right Override
        if (Math.random() < 0.3) {  // Adiciona em 30% das vezes
            obfuscated = rtl + obfuscated + ltr;
        }

        // 5. Escape de strings complexo (exemplo)
        obfuscated = obfuscated.replace(/(".*?")/g, (match) => {
            let escaped = "";
            for (let i = 0; i < match.length; i++) {
                if (Math.random() < 0.5) {
                    escaped += "\\x" + match.charCodeAt(i).toString(16); // Hexadecimal
                } else {
                    escaped += "\\u" + match.charCodeAt(i).toString(16).padStart(4, '0'); // Unicode
                }
            }
            return escaped;
        });

        return obfuscated;
    }
});
