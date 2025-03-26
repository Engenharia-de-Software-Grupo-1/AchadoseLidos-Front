export const mockFavoritosData = [
    {
      sebo: {
        id: 1,
        nome: 'Sebo Letras & Histórias'
      },
      produtos: [
        {
          produto: {
            id: 101,
            nome: 'Dom Quixote - Edição Especial',
            preco: 45.90,
            fotos: [
              'https://example.com/dom-quixote.jpg'
            ],
            sebo: {
              id: 1,
              nome: 'Sebo Letras & Histórias'
            }
          }
        },
        {
          produto: {
            id: 102,
            nome: '1984 - George Orwell',
            preco: 39.99,
            fotos: [
              'https://example.com/1984.jpg'
            ],
            sebo: {
              id: 1,
              nome: 'Sebo Letras & Histórias'
            }
          }
        }
      ]
    },
    {
      sebo: {
        id: 2,
        nome: 'Sebo Mundo das Ideias'
      },
      produtos: [
        {
          produto: {
            id: 201,
            nome: 'Sapiens - Uma Breve História da Humanidade',
            preco: 59.90,
            fotos: [
              'https://example.com/sapiens.jpg'
            ],
            sebo: {
              id: 2,
              nome: 'Sebo Mundo das Ideias'
            }
          }
        },
        {
          produto: {
            id: 202,
            nome: 'O Príncipe - Maquiavel',
            preco: 34.50,
            fotos: [
              'https://example.com/principe.jpg'
            ],
            sebo: {
              id: 2,
              nome: 'Sebo Mundo das Ideias'
            }
          }
        },
        {
          produto: {
            id: 203,
            nome: 'Revolução dos Bichos - Edição Limitada',
            preco: 42.75,
            fotos: [
              'https://example.com/revolucao-bichos.jpg'
            ],
            sebo: {
              id: 2,
              nome: 'Sebo Mundo das Ideias'
            }
          }
        }
      ]
    },
    {
      sebo: {
        id: 3,
        nome: 'Sebo Cultural Express'
      },
      produtos: [
        {
          produto: {
            id: 301,
            nome: 'O Alquimista - Paulo Coelho',
            preco: 29.99,
            fotos: [
              'https://example.com/alquimista.jpg'
            ],
            sebo: {
              id: 3,
              nome: 'Sebo Cultural Express'
            }
          }
        }
      ]
    },
    {
      sebo: {
        id: 4,
        nome: 'Sebo Cultura & Arte'
      },
      produtos: [
        {
          produto: {
            id: 401,
            nome: 'A Arte da Guerra - Sun Tzu',
            preco: 49.90,
            fotos: [
              'https://example.com/arte-guerra.jpg'
            ],
            sebo: {
              id: 4,
              nome: 'Sebo Cultura & Arte'
            }
          }
        }
      ]
    }
  ];
  
  // Hook customizado para simular o contexto de favoritos
  export const useMockFavorito = () => {
    return {
      favoritos: mockFavoritosData,
      loading: false,
      deletingIds: [],
      fetchFavoritoData: () => {},
      handleRemoverFavorito: (productId: number) => {
        // eslint-disable-next-line no-console
        console.log(`Removendo produto com ID: ${productId}`);
      },
      isProdutoFavoritado: (productId: number) => true
    };
  };