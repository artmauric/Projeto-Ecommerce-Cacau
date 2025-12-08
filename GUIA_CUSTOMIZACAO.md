# Guia de Customização - Clonagem do Protótipo

Para replicar o design do seu protótipo com máxima fidelidade, preciso das seguintes informações:

## 🎨 Informações Visuais Necessárias

### 1. **Cores**
- Cor principal (botões, destaques)
- Cor secundária
- Cor de fundo da página
- Cor dos cards/produtos
- Cor do texto principal
- Cor do texto secundário

### 2. **Layout dos Produtos**
- Como os produtos estão dispostos? (Grid 3 colunas, 2 colunas, lista vertical?)
- Espaçamento entre os produtos
- Tamanho dos cards

### 3. **Cards de Produto**
- Formato: retangular, quadrado, com bordas arredondadas?
- Tem sombra? Qual tipo?
- Como a imagem está posicionada? (topo, lado, fundo?)
- Informações exibidas: nome, descrição, preço, botão?

### 4. **Botões**
- Estilo: preenchido, outline (borda), arredondado?
- Cor do botão
- Texto do botão: "Comprar", "Comprar Agora", "Adicionar ao Carrinho"?
- Tamanho e formato

### 5. **Header/Cabeçalho**
- Tem logo? Qual?
- Título centralizado ou à esquerda?
- Cor de fundo
- Altura/tamanho

### 6. **Tipografia**
- Fonte usada (se souber)
- Tamanhos dos textos
- Peso das fontes (negrito, normal)

### 7. **Footer**
- Informações exibidas
- Estilo e cores

## 📝 Como Ajustar

### Ajuste Rápido de Cores
Edite o arquivo `config/theme.ts`:

```typescript
colors: {
  primary: '#SUA_COR_PRINCIPAL',
  secondary: '#SUA_COR_SECUNDARIA',
  background: '#SUA_COR_DE_FUNDO',
  // ...
}
```

### Ajuste de Layout
No mesmo arquivo `config/theme.ts`:

```typescript
layout: {
  productLayout: 'grid', // ou 'list'
  columns: 3, // número de colunas
  gap: '30px', // espaçamento
}
```

### Ajuste de Estilos CSS
Edite `app/globals.css` - todas as variáveis CSS estão no topo do arquivo.

## 🚀 Próximos Passos

1. **Descreva o design** do protótipo ou envie screenshots
2. **Informe as cores** exatas (códigos hexadecimais se possível)
3. **Descreva o layout** dos produtos
4. **Mencione qualquer elemento especial** (animações, efeitos, etc.)

Com essas informações, posso ajustar o projeto para ficar idêntico ao seu protótipo!

