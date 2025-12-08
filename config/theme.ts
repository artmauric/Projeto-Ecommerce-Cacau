// Configuração de tema - Ajuste aqui para corresponder ao protótipo
export const theme = {
  colors: {
    primary: '#8B4513',
    secondary: '#D2691E',
    accent: '#FF6B35',
    background: '#FFF8DC',
    text: '#333',
    textLight: '#666',
    cardBackground: '#FFFFFF',
    border: '#E0E0E0',
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

