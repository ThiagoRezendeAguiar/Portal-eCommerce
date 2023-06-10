// Obter o parâmetro "id" da URL
const urlParametro = new URLSearchParams(window.location.search);
const productId = urlParametro.get('id');

// Obter os detalhes do produto usando o ID
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        const detailsContainer = document.getElementById('details');
        const homeBack = document.getElementById('home-back')

        //Formatando o home-back
        homeBack.innerHTML += ` <a href="../index.html"><i class="fa-solid fa-house"></i></a>
  <i class="fa-solid fa-greater-than"></i>
  <h4>${product.title}</h4>`

        //Colocar as estrelas de avalições 
        let rating = product.rating.rate;
        let ratingInt = Math.trunc(rating);
        let strRate = '';
        for (let x = 0; x < ratingInt; x++) {
            strRate += '<i class="fa-solid fa-star" style="color: #ffcb0c;"></i>';
        }
        if (rating - ratingInt >= 0.5) {
            strRate += '<i class="fa-solid fa-star-half" style="color: #ffcb0c;"></i>';
        }

        // Formatando os details do produto
        const strDetails = `
    <div class="cardImg">
    <img src="${product.image}" alt="...">
    </div>
    <div class="card">
      <h4>${product.title}</h4>
      <p class="price">U$${product.price}</p>
      <div class="rating">${product.rating.rate}<div class"star">${strRate}</div> Avaliações: ${product.rating.count}</div>
      <p>${product.description}</p>
    </div>`;

        detailsContainer.innerHTML = strDetails;
    });



