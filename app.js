const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: "",
    carrinhoAtivo: false,
    alertaAtivo: false,
  },
  filters: {
    formatarPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    carrinhoTotal() {
      return this.carrinho.reduce((total, item) => total + item.preco, 0);
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
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((response) => response.json())
        .then((json) => {
          this.produto = json;
        });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    fecharModal(event) {
      if (event.target === event.currentTarget) this.produto = false;
    },
    clickForaCarrinho(event) {
      if (event.target === event.currentTarget) this.carrinhoAtivo = false;
    },
    adicionarItem() {
      this.produto.estoque--;

      const { nome, id, preco } = this.produto;
      this.carrinho.push({ nome, id, preco });

      this.alerta(`${nome} adicionado ao carrinho.`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    compararEstoque() {
      const quantidadeNoCarrinho = this.carrinho.filter(
        (item) => item.id === this.produto.id
      ).length;

      this.produto.estoque -= quantidadeNoCarrinho;
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;

      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduto(hash.replace("#", ""));
      }
    },
  },
  watch: {
    produto() {
      document.title = this.produto.nome
        ? `${this.produto.nome} | Techno`
        : "Techno";

      const hash = this.produto.id || "";
      history.pushState(null, null, `#${hash}`);

      if (this.produto) {
        this.compararEstoque();
      }
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
  },
  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
    this.router();
  },
});
