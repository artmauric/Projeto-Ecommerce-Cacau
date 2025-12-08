# Projeto Ecommerce Cacau

Loja virtual simples para venda de produtos. Este projeto foi desenvolvido com Next.js e React.

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Estrutura do Projeto

```
├── app/              # Páginas e layouts (Next.js App Router)
├── components/       # Componentes React reutilizáveis
├── data/            # Dados dos produtos
├── types/           # Definições TypeScript
└── public/          # Arquivos estáticos (imagens, etc.)
```

## 🛍️ Configuração dos Produtos

Os produtos podem ser editados no arquivo `data/products.ts`. Você pode adicionar:
- Nome do produto
- Descrição
- Preço
- URL da imagem (opcional)

## 🎨 Personalização

- **Cores**: Edite as variáveis CSS em `app/globals.css`
- **Estilos**: Modifique os estilos em `app/globals.css`
- **Layout**: Ajuste os componentes em `components/ProductCard.tsx`

## 📝 Próximos Passos

Para integrar com um sistema de pagamento, você pode:
1. Adicionar integração com Mercado Pago, Stripe ou PagSeguro
2. Criar uma página de checkout
3. Adicionar carrinho de compras
4. Implementar sistema de gerenciamento de pedidos

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📄 Licença

Este projeto foi desenvolvido para o Instituto Cura.
