// Configuração de tema - Ajuste aqui para corresponder ao protótipo
export const theme = {
  colors: {
    primary: '#4a2a16',
    secondary: '#7a4b26',
    accent: '#d6a85b',
    background: '#fdf8f1',
    text: '#3a2a1c',
    textLight: '#6b5b4a',
    cardBackground: '#fffdf8',
    border: '#e8dfd3',
  },
  layout: {
    // 'grid' | 'list' | 'cards'
    productLayout: 'grid',
    // Número de colunas no desktop (1-4)
    columns: 3,
    // Espaçamento entre produtos
    gap: '30px',
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    headingSize: '2rem',
    productNameSize: '1.5rem',
    priceSize: '1.8rem',
  },
  buttons: {
    // 'filled' | 'outline' | 'rounded'
    style: 'filled',
    textTransform: 'uppercase' as const,
  },
  cards: {
    // 'default' | 'flat' | 'minimal'
    style: 'default',
    borderRadius: '12px',
    showShadow: true,
  },
}

