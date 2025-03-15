document.getElementById('protectButton').addEventListener('click', () => {
    const file = document.getElementById('fileInput').files[0];
    const statusMessage = document.getElementById('statusMessage');
    const downloadLink = document.getElementById('downloadLink');

    if (!file) {
        statusMessage.textContent = "Por favor, selecione um arquivo .lua.";
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const luaCode = event.target.result;
        statusMessage.textContent = "Adicionando proteção...";

        // Adiciona um sistema de bloqueio após 3 tentativas erradas
        const protectedCode = `
            local tentativas = 0
            local maxTentativas = 3
            local function verificarSenha(senha)
                if senha == "minhaSenhaSegura123" then
                    print("Acesso concedido!")
                else
                    tentativas = tentativas + 1
                    print("Senha incorreta! Tentativa: " .. tentativas)
                    if tentativas >= maxTentativas then
                        print("Muitas tentativas! Bloqueado.")
                        return
                    end
                end
            end
            verificarSenha("tentativaErrada") -- Exemplo de tentativa errada
            verificarSenha("minhaSenhaSegura123") -- Exemplo de tentativa correta
            
            -- Código original protegido:
            ${luaCode}
        `;

        // Criar arquivo protegido
        const blob = new Blob([protectedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'protected.lua';
        downloadLink.style.display = 'inline-block';

        statusMessage.textContent = "Proteção aplicada com sucesso!";
    };

    reader.onerror = () => {
        statusMessage.textContent = "Erro ao ler o arquivo.";
    };

    reader.readAsText(file);
});
