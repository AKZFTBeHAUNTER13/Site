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

        // 1. Codificação Base64 (para tornar irreconhecível)
        const base64Code = btoa(code);

        // 2. Adicionar lixo e complexidade
        let garbage = "";
        for (let i = 0; i < 50; i++) {
          garbage += String.fromCharCode(Math.floor(Math.random() * 255)); // Caracteres aleatórios
        }

        // 3. Criar um "decodificador" Lua (simples)
        const decoder = `
          local function decode(s)
            local b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
            s = string.gsub(s, "[^" .. b .. "=]", "")
            local t = ""
            local i = 1
            while i <= #s do
              local c1 = string.find(b, string.sub(s, i, i), 1, true) - 1
              i = i + 1
              local c2 = string.find(b, string.sub(s, i, i), 1, true) - 1
              i = i + 1
              local c3 = string.find(b, string.sub(s, i, i), 1, true) - 1
              i = i + 1
              local c4 = string.find(b, string.sub(s, i, i), 1, true) - 1
              i = i + 1
              local b1 = c1 << 2
              local b2 = (c2 & 0x3f) >> 4
              local b3 = (c2 & 0x0f) << 4
              local b4 = (c3 & 0x3f) >> 2
              local b5 = (c3 & 0x03) << 6
              local b6 = c4
              if c3 < 0 then
                b6 = nil
              end
              if c4 < 0 then
                b6 = nil
                b5 = nil
              end
              t = t .. string.char(b1 + b2)
              if b3 then
                t = t .. string.char(b3 + b4)
              end
              if b5 then
                t = t .. string.char(b5 + b6)
              end
            end
            return t
          end
        `;

        // 4. Montar o código final
        obfuscated = `
          ${garbage}
          ${decoder}
          local encoded = "${base64Code}"
          local original = decode(encoded)
          loadstring(original)()
        `;

        return obfuscated;
    }
});
