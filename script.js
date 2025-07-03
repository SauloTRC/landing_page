// Aguarda o conteúdo da página ser totalmente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {
    console.log("O script.js foi carregado e iniciado.");

    // 1. DADOS DOS IMÓVEIS (com nomes de imagem padronizados para minúsculas)
    const IMOVEIS = [
        {
            'id': 1,
            'nome': 'OPEN NAÇÕES',
            'descricao': 'Lançamento que cabe no seu bolso',
            'imagens': ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg', 'slide5.jpg', 'slide6.jpg', 'slide7.jpg', 'slide8.jpg', 'slide9.jpg', 'slide10.jpg', 'slide11.jpg', 'slide12.jpg', 'slide13.jpg', 'slide14.jpg', 'slide15.jpg', 'slide16.jpg', 'slide17.jpg', 'slide18.jpg', 'slide19.jpg', 'slide20.jpg', 'slide21.jpg', 'slide22.jpg', 'slide23.jpg', 'preco_.jpg']
        },
        {
            'id': 2,
            'nome': 'Senna Tower',
            'descricao': '3 quartos, 2 suítes, 110m²',
            'imagens': ['']
        },
        {
            'id': 3,
            'nome': 'Skyline Tower',
            'descricao': 'Cobertura Duplex, 4 suítes, 250m²',
            'imagens': ['']
        }
    ];

    // 2. ELEMENTOS DO DOM
    const gridContainer = document.getElementById('imoveis-grid-container');
    const modal = document.getElementById("contactModal");
    const modalImovelNome = document.getElementById("modalImovelNome");
    const imovelIdInput = document.getElementById("imovel_id");
    const imovelNomeHiddenInput = document.getElementById("imovel_nome_hidden");
    const closeModalButton = document.querySelector(".modal .close");

    if (!gridContainer || !modal) {
        console.error("ERRO: Elementos essenciais (grid ou modal) não foram encontrados.");
        return;
    }

    // 3. FUNÇÃO PARA RENDERIZAR OS CARDS DOS IMÓVEIS
    function renderImoveis() {
        gridContainer.innerHTML = '';
        IMOVEIS.forEach(imovel => {
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

    // 4. FUNÇÃO PARA INICIALIZAR PLUGINS
    function initializePlugins() {
        try {
            document.querySelectorAll(".imovel-swiper").forEach(el => new Swiper(el, { loop: true, navigation: { nextEl: el.querySelector(".swiper-button-next"), prevEl: el.querySelector(".swiper-button-prev") } }));
            Fancybox.bind("[data-fancybox]", {});
        } catch (error) {
            console.error("ERRO ao inicializar os plugins:", error);
        }
    }

    // 5. LÓGICA DO MODAL (Simplificada para FormSubmit)
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

    // INICIALIZAÇÃO
    renderImoveis();
});


