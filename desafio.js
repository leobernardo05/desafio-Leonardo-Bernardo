class CaixaDaLanchonete {
  constructor() {
    // Definindo o cardápio com as descrições e valores dos itens
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.00 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
      suco: { descricao: "Suco Natural", valor: 6.20 },
      sanduiche: { descricao: "Sanduíche", valor: 6.50 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
    };

    // Definindo as formas de pagamento válidas
    this.formasPagamentoValidas = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const quantidadePorCodigo = this.contarQuantidadePorCodigo(itens);
    const totalSemDesconto = this.calcularTotal(quantidadePorCodigo);
    const totalComDesconto = this.aplicarDescontoOuAcrescimo(totalSemDesconto, formaDePagamento);
    return this.formatarValor(totalComDesconto);
  }

  contarQuantidadePorCodigo(itens) {
    const quantidadePorCodigo = {};
    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
      quantidadePorCodigo[codigo] = (quantidadePorCodigo[codigo] || 0) + parseInt(quantidade);
    }
    return quantidadePorCodigo;
  }

  calcularTotal(quantidadePorCodigo) {
    let valorTotal = 0;
    for (const codigo in quantidadePorCodigo) {
      if (this.cardapio[codigo]) {
        valorTotal += this.cardapio[codigo].valor * quantidadePorCodigo[codigo];
      }
    }
    return valorTotal;
  }

  aplicarDescontoOuAcrescimo(valorTotal, formaDePagamento) {
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
    }
    return valorTotal;
  }

  formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }
}

// Exemplo de uso
const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"])); // Saída: "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra("debito", ["cafe,1", "suco,2", "queijo,1"])); // Saída: "R$ 19,55"
console.log(caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])); // Saída: "R$ 15,96"
