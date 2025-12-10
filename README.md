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
├── application/      # Serviços/casos de uso (regras de aplicação)
├── domain/           # Entidades e tipos de negócio
├── infrastructure/   # Fontes de dados (mock, API, etc.)
├── components/       # Componentes de UI (camada de apresentação)
├── config/           # Configurações compartilhadas (tema)
├── app/              # Páginas e layouts (Next.js App Router)
└── public/           # Arquivos estáticos (imagens, etc.)
```

## 🛍️ Configuração dos Produtos

Os produtos podem ser editados no arquivo `infrastructure/data/products.data.ts`. Você pode ajustar:
- Nome e subtítulo (`name`, `subtitle`)
- Descrição e lista de features (`description`, `features`)
- Preço (`price`)
- Caminho da imagem (`image`)

### Onde editar textos de cada seção
- Hero: edite os textos diretamente em `components/HeroSection.tsx`.
- Seção Nossos Produtos: títulos/descritivos são gerados a partir dos dados em `infrastructure/data/products.data.ts`. Ajuste a cópia lá.
- Grade “Escolha seu Produto”: usa os mesmos dados do arquivo acima (features e preço).
- Depoimentos: edite o array em `components/Testimonials.tsx`.
- FAQ: edite o array em `components/FAQ.tsx`.
- Combo/Oferta: edite o objeto `combo` em `infrastructure/data/products.data.ts`.
- Footer: textos em `components/Footer.tsx`.

### Imagens
- Coloque as imagens em `public/images/` (ex.: `public/images/oraculo-cacau.jpg`).
- Referencie o caminho no campo `image` do produto (ex.: `/images/oraculo-cacau.jpg`).
- Para substituir uma imagem, basta trocar o arquivo na pasta ou apontar para um novo caminho.
- Para remover a imagem de um produto, remova o campo `image`; o componente mostrará um placeholder.

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
