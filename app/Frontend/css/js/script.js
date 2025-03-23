

fetch('http://localhost:8080/carrosel')
    .then((resp) => resp.json())
    .then((data) => {
        console.log('Dados recebidos:', data); // Verifique os dados recebidos
        renderizarCarrosselCards(data);
    })
    .catch((error) => {
        console.error('Erro durante a requisição:', error);
    });

    function renderizarCarrosselCards(data) {
      const containerCarrosselCards = $('#carrosselCards'); 
      data.forEach((item) => {
          const card = document.createElement('div');
          card.className = 'card';
  
          const img = document.createElement('img');
          img.src = `http://localhost:8080/carrosel/${item.filename}`; 
          img.alt = item.filename;
          img.className = 'iconeCarrosel';
  
          const titulo = document.createElement('h5');
          titulo.textContent = item.metadata.titulo;
          titulo.className = 'titulo-min';
  
          const descricao = document.createElement('p');
          descricao.textContent = item.metadata.conteudo;
          descricao.className = 'conteudo';
  
          const link = document.createElement('a');
          link.href = item.metadata.link;
          link.textContent = 'Saiba mais';
          link.className = 'link-min';
  
          card.appendChild(img);
          card.appendChild(titulo);
          card.appendChild(descricao);
          card.appendChild(link);
  
          containerCarrosselCards.append(card);
      });
  
      containerCarrosselCards.slick({
          infinite: true,
          slidesToShow: 3,
          prevArrow: '#slick-prev',
          nextArrow: '#slick-next',
          responsive: [
              { breakpoint: 2600, settings: { slidesToShow: 5.5 } },
              { breakpoint: 1600, settings: { slidesToShow: 4.5 } },
              { breakpoint: 1200, settings: { slidesToShow: 2.8 } },
              { breakpoint: 800, settings: { slidesToShow: 2.1 } },
              { breakpoint: 600, settings: { slidesToShow: 1.5 } },
              { breakpoint: 400, settings: { slidesToShow: 0.8 } }
          ]
      });
  }
  