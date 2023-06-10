//Menu Responsivo
const menuBtn = document.querySelector('.menu-icon');
const menuBtnIcon = document.querySelector('.menu-icon i');
const dropDownMenu = document.querySelector('.dropdown-menu');

menuBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  menuBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}


/*-----------------------------------------------------------------------------*/


//Função colocar estrelas de avaliação
function colocarEstrelas(rating) {
  let ratingInt = Math.trunc(rating);
  let strRate = '';
  for (let x = 0; x < ratingInt; x++) {
    strRate += '<i class="fa-solid fa-star" style="color: #ffcb0c;"></i>';
  }
  if (rating - ratingInt >= 0.5) {
    strRate += '<i class="fa-solid fa-star-half" style="color: #ffcb0c;"></i>';
  }
  return strRate;
}


/*-----------------------------------------------------------------------------*/


//Função para exibir os produtos
function exibirProdutos(produtos) {
  let str = '';
  produtos.forEach(product => {
    // Colocar as estrelas de avaliações 
    let strRate = colocarEstrelas(product.rating.rate);

    // Formatar o card
    str += `
    <div class="card" id="card">
      <div class="card-container">
        <img src="${product.image}" alt="...">
        <h4>${product.title}</h4>
        <p class="price">U$${product.price}</p>
        <div class="rating">${product.rating.rate}<div class"star">${strRate}</div>Avaliações: ${product.rating.count}</div>
      </div> 
      <a class="maisDetalhes" href="./detalhes/detalhes.html?id=${product.id}">More Details</a>
    </div>`;

  });

  document.getElementById('cards').innerHTML = str;
}


/*-----------------------------------------------------------------------------*/


// Função para pesquisar produtos
function pesquisarProdutos() {
  const itemPesquisado = document.getElementById('search_input').value.trim().toLowerCase();
  const itemPesquisadoMobile = document.getElementById('search_input_mobile').value.trim().toLowerCase();

  if (itemPesquisado !== '' || itemPesquisadoMobile !== '') {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const resultados = data.filter(product => {
          if (itemPesquisado !== '') {
            return product.title.toLowerCase().includes(itemPesquisado);
          } else {
            return product.title.toLowerCase().includes(itemPesquisadoMobile);
          }
        });
        if (resultados == '') {
          document.getElementById('cards').innerHTML = "<div class='erro_text'><p>We're sorry, but we couldn't find the product you searched for. Please make sure you have correctly entered the name of the product and try again.  :(</p></div>"
        } else {
          exibirProdutos(resultados);
        }
      });
  } else {
    // Caso a barra de pesquisa esteja vazia, exibir todos os produtos
    filtrarProduto('all');
  }

  //Limpar inputs
  document.getElementById('search_input').value = '';
  document.getElementById('search_input_mobile').value = '';
}

// Adicionar evento de clique ao botão de pesquisa
document.getElementById('search_btn').addEventListener('click', pesquisarProdutos);
document.getElementById('search_btn_mobile').addEventListener('click', pesquisarProdutos);

/*-----------------------------------------------------------------------------*/


//Filtro de Categoria

//Iniciar como All
window.onload = () => {
  filtrarProduto('all');
};

function filtrarProduto(categoria) {
  //Selecionar os botões
  const buttons = document.querySelectorAll("#filtro button");
  buttons.forEach((button) => {
    //Verificar se a categoria é igual ao innerText
    if (categoria.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  });

  // Se for a categoria All
  if (categoria == 'all') {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => exibirProdutos(data))
  }

  //Caso seja outra categoria
  else {
    //Ajustando o nome da categoria de acordo com a API
    if (categoria == "menswear") { categoria = "men's clothing" }
    if (categoria == "womenswear") { categoria = "women's clothing" }
    fetch(`https://fakestoreapi.com/products/category/${categoria}`)
      .then(res => res.json())
      .then(data => exibirProdutos(data))
  }
};
