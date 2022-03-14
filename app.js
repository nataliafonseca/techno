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
