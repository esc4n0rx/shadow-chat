export function generateRandomName(): string {
    const adjectives = ['Sombrio', 'Misterioso', 'Oculto', 'Noturno', 'Anônimo'];
    const nouns = ['Sombra', 'Viajante', 'Espectro', 'Fantasma', 'Observador'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective} ${noun}`;
  }
  