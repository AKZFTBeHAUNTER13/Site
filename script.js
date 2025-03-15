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

            // Obfuscação EXTREMA
            const obfuscatedCode = extremeObfuscate(luaCode);

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

    function extremeObfuscate(code) {
        let obfuscated = "";

        // Codificação Base64
        const base64Code = btoa(unescape(encodeURIComponent(code)));

        // Lixo e complexidade
        let garbage = "";
        for (let i = 0; i < 50; i++) {
            garbage += String.fromCharCode(Math.floor(Math.random() * 255));
        }

        // Decodificador Lua corrigido
        const decoder = `
            local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
            local function decode(data)
                data = data:gsub('[^'..b..'=]', '')
                local t, i, a = {}, 1, 1
                while i <= #data do
                    local c1, c2, c3, c4 =
                        b:find(data:sub(i, i), 1, true) - 1,
                        b:find(data:sub(i+1, i+1), 1, true) - 1,
                        b:find(data:sub(i+2, i+2), 1, true) - 1 or 0,
                        b:find(data:sub(i+3, i+3), 1, true) - 1 or 0
                    i = i + 4
                    local n = (c1 << 18) + (c2 << 12) + (c3 << 6) + c4
                    t[a], t[a+1], t[a+2] = string.char((n >> 16) & 255), c3 > 0 and string.char((n >> 8) & 255) or nil, c4 > 0 and string.char(n & 255) or nil
                    a = a + 3
                end
                return table.concat(t)
            end
        `;

        // Código final obfuscado
        obfuscated = `
            ${garbage}
            ${decoder}
            local encoded = "${base64Code}"
            local original = decode(encoded)
            load(original)()
        `;

        return obfuscated;
    }
});
