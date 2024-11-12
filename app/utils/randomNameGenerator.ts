export function generateRandomName(): string {
  const adjectives = [
    'Sombrio', 'Misterioso', 'Oculto', 'Noturno', 'Anônimo', 'Escondido', 'Invisível',
    'Enigmático', 'Sorrateiro', 'Sigiloso', 'Furtivo', 'Astuto', 'Incógnito', 'Críptico',
    'Espectral', 'Lendário', 'Fantástico', 'Zombeteiro', 'Risonho', 'Brincalhão',
    'Curioso', 'Aventureiro', 'Excêntrico', 'Malicioso', 'Desajeitado', 'Feliz',
    'Sortudo', 'Desastrado', 'Corajoso', 'Medroso', 'Atrevido', 'Divertido', 'Engraçado',
    'Louco', 'Zeloso', 'Aloprado', 'Trapaceiro', 'Desconhecido', 'Alegre',
    'Brilhante', 'Estranho', 'Esquisito', 'Fantasmagórico', 'Ilusório', 'Meticuloso',
    'Perigoso', 'Rápido', 'Lento', 'Gracioso', 'Desengonçado', 'Ardiloso', 'Rebelde',
    'Sonolento', 'Faminto', 'Genial', 'Criativo', 'Energético', 'Veloz', 'Rabugento',
    'Saltitante', 'Vigoroso', 'Zangado', 'Relaxado', 'Zen', 'Hipster', 'Radiante',
    'Empolgado', 'Festivo', 'Maluco', 'Cafajeste', 'Sábio', 'Hilariante', 'Fofo',
  ];

  const nouns = [
    'Sombra', 'Viajante', 'Espectro', 'Fantasma', 'Observador', 'Andarilho', 'Peregrino',
    'Nômade', 'Explorador', 'Detetive', 'Agente', 'Mago', 'Ninja', 'Pirata', 'Corsário',
    'Malandro', 'Samurai', 'Ronin', 'Cavaleiro', 'Dragão', 'Lobisomem', 'Vampiro',
    'Alienígena', 'Robô', 'Ciborgue', 'Jedi', 'Sith', 'Palhaço', 'Bruxo',
    'Feiticeiro', 'Alquimista', 'Artista', 'Ilusionista', 'Trapaceiro', 'Herói', 'Vilão',
    'Guerreiro', 'Mochileiro', 'Viajante do Tempo', 'Sábio', 'Mestre', 'Aprendiz', 'Desconhecido',
    'Jogador', 'Estranho', 'Esquisito', 'Camaleão', 'Mímico', 'Criatura',
    'Mutante', 'Camundongo', 'Elefante', 'Polvo', 'Gato', 'Cachorro', 'Lobo', 'Urso',
    'Coelho', 'Esquilo', 'Tartaruga', 'Panda', 'Pinguim', 'Gambá', 'Ouriço', 'Falcão',
    'Águia', 'Coruja', 'Peixe', 'Tubarão', 'Golfinho', 'Sereia', 'Unicórnio', 'Fênix',
    'Dinossauro', 'Hamster', 'Dragão de Komodo', 'Macaco', 'Sapo', 'Raposa', 'Hipopótamo',
    'Canguru', 'Lagarto', 'Zumbi', 'Esqueleto', 'Abacate', 'Banana', 'Chocolate',
    'Pizza', 'Biscoito', 'Cupcake', 'Sorvete', 'Hambúrguer', 'Batata Frita', 'Taco',
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}
