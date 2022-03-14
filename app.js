const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    notebook: {},
    smartphone: {},
    smartwatch: {},
    speaker: {},
    tablet: {},
  },
  filters: {
    formatarPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then((response) => response.json())
        .then((json) => {
          this.produtos = json;
        });
    },
  },
  created() {
    this.fetchProdutos();
  },
});
