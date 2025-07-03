document.addEventListener('DOMContentLoaded', () => {
    // 1. DADOS DOS IMÓVEIS (com nomes de ficheiro originais)
    const IMOVEIS = [
        {
            'id': 1,
            'nome': 'OPEN NAÇÕES',
            'descricao': 'Lançamento que cabe no seu bolso',
            'imagens': ['Slide1.JPG', 'Slide2.JPG', 'Slide3.JPG', 'Slide4.JPG', 'Slide5.JPG', 'Slide6.JPG', 'Slide7.JPG', 'Slide8.JPG', 'Slide9.JPG', 'Slide10.JPG', 'Slide11.JPG', 'Slide12.JPG', 'Slide13.JPG', 'Slide14.JPG', 'Slide15.JPG', 'Slide16.JPG', 'Slide17.JPG', 'Slide18.JPG', 'Slide19.JPG', 'Slide20.JPG', 'Slide21.JPG', 'Slide22.JPG', 'Slide23.JPG', 'preco_.jpg']
        },
        {
            'id': 2,
            'nome': 'Senna Tower',
            'descricao': '3 quartos, 2 suítes, 110m²',
            'imagens': ['apto2_1.jpg', 'apto2_2.jpg', 'apto2_3.jpg']
        },
        {
            'id': 3,
            'nome': 'Skyline Tower',
            'descricao': 'Cobertura Duplex, 4 suítes, 250m²',
            'imagens': ['apto3_1.jpg', 'apto3_2.jpg', 'apto3_3.jpg']
        }
    ];

    const gridContainer = document.getElementById('imoveis-grid-container');
    const modal = document.getElementById("contactModal");
    const modalImovelNome = document.getElementById("modalImovelNome");
    const imovelIdInput = document.getElementById("imovel_id");
    const imovelNomeHiddenInput = document.getElementById("imovel_nome_hidden");
    const closeModalButton = document.querySelector(".modal .close");

    if (!gridContainer || !modal) { return; }

    function renderImoveis() {
        gridContainer.innerHTML = '';
        IMOVEIS.forEach(imovel => {
            // CAMINHO FINAL CORRIGIDO PARA 'image' (singular)
            const slidesHtml = imovel.imagens.map((imagem, index) => `
                <div class="swiper-slide">
                  <a href="./image/${imagem}" data-fancybox="gallery-${imovel.id}" data-caption="${imovel.nome} - Foto ${index + 1}">
                    <img src="./image/${imagem}" alt="Imagem de ${imovel.nome}" onerror="this.style.display='none';">
                  </a>
                </div>`).join('');
            const cardHtml = `
                <div class="imovel-card">
                  <div class="swiper imovel-swiper"><div class="swiper-wrapper">${slidesHtml}</div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div>
                  <h3>${imovel.nome}</h3>
                  <p>${imovel.descricao}</p>
                  <button class="cta-button" data-id="${imovel.id}" data-nome="${imovel.nome}">Tenho Interesse</button>
                </div>`;
            gridContainer.innerHTML += cardHtml;
        });
        initializePlugins();
    }

    function initializePlugins() {
        try {
            document.querySelectorAll(".imovel-swiper").forEach(el => new Swiper(el, { loop: true, navigation: { nextEl: el.querySelector(".swiper-button-next"), prevEl: el.querySelector(".swiper-button-prev") } }));
            Fancybox.bind("[data-fancybox]", {});
        } catch (error) { console.error("ERRO ao inicializar os plugins:", error); }
    }

    function openModal(id, nome) {
        modalImovelNome.textContent = nome;
        imovelIdInput.value = id;
        imovelNomeHiddenInput.value = nome;
        modal.classList.add('show');
    }
    function closeModal() { modal.classList.remove('show'); }
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
    gridContainer.addEventListener('click', function (event) {
        if (event.target.matches('.cta-button')) {
            openModal(event.target.dataset.id, event.target.dataset.nome);
        }
    });

    renderImoveis();
});


