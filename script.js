document.addEventListener('DOMContentLoaded', () => {
    // 1. DADOS DOS IMÓVEIS (com nomes de ficheiro originais)
    const IMOVEIS = [
        {
            'id': 1,
            'nome': 'OPEN NAÇÕES',
            'descricao': 'Lançamento que cabe no seu bolso',
            'imagens': ['capa.jpg', 'Slide1.jpg', 'Slide2.jpg', 'Slide3.jpg',
                'Slide4.jpg', 'Slide5.jpg', 'Slide6.jpg', 'Slide7.jpg',
                'Slide8.jpg', 'Slide9.jpg', 'Slide10.jpg', 'Slide11.jpg',
                'Slide12.jpg', 'Slide13.jpg', 'Slide14.jpg', 'Slide15.jpg',
                'Slide16.jpg', 'Slide17.jpg', 'Slide18.jpg', 'Slide19.jpg',
                'Slide20.jpg', 'Slide21.jpg', 'Slide22.jpg', 'Slide23.jpg',
                'preco_.jpg']
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


