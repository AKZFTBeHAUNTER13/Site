document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('protectButton').addEventListener('click', () => {
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
        statusMessage.textContent = "Adicionando proteção...";

        const protectedCode = `
            local tentativas = 0
            local maxTentativas = 3
            local senhaCorreta = "minhaSenhaSegura123"

            function verificarSenha(senha)
                if senha == senhaCorreta then
                    print("Acesso concedido!")
                else
                    tentativas = tentativas + 1
                    print("Senha incorreta! Tentativa: " .. tentativas)
                    if tentativas >= maxTentativas then
                        print("Muitas tentativas! Bloqueado.")
                        os.exit()
                    end
                end
            end

            -- Código Original
            ${luaCode}
        `;

        const blob = new Blob([protectedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        downloadButton.href = url;
        downloadButton.download = "fileprotected.lua";
        downloadButton.style.display = "block";

        statusMessage.textContent = "Proteção adicionada!";
    };

    reader.readAsText(file);
});
