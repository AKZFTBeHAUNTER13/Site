const numberOfFlakes = 100; // Número de flocos de neve

for (let i = 0; i < numberOfFlakes; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.style.left = `${Math.random() * 100}vw`; // posição horizontal aleatória
    flake.style.animationDuration = `${Math.random() * 5 + 5}s`; // duração aleatória
    flake.style.animationDelay = `${Math.random() * 5}s`; // atraso aleatório
    document.body.appendChild(flake);
}
