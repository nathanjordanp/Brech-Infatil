document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-roupa");
    const toggleForm = document.getElementById("toggle-form");
    const listaRoupas = document.getElementById("lista");

    carregarRoupas();

    toggleForm.addEventListener("click", function() {
    
        form.classList.toggle("visible");
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nome = form.nome.value;
        const tamanho = form.tamanho.value;
        const descricao = form.descricao.value;
        const preco = form.preco.value;
        const imagem = form.imagem.files[0];

        const leitor = new FileReader();
        leitor.onloadend = function() {
            const novaRoupa = {
                id: Date.now(), 
                nome: nome,
                tamanho: tamanho,
                descricao: descricao,
                preco: preco,
                imagem: leitor.result
            };

            adicionarRoupa(novaRoupa);
            salvarRoupa(novaRoupa);

            form.reset();
            form.classList.remove("visible");
        };

        if (imagem) {
            leitor.readAsDataURL(imagem);
        } else {
            const novaRoupa = {
                id: Date.now(),
                nome: nome,
                tamanho: tamanho,
                descricao: descricao,
                preco: preco,
                imagem: ""
            };

            adicionarRoupa(novaRoupa);
            salvarRoupa(novaRoupa);

            form.reset();
            form.classList.remove("visible");
        }
    });

    function adicionarRoupa(roupa, defaultItem = false) {
        const novaRoupaElement = document.createElement("li");
        novaRoupaElement.className = "grid-item";
        novaRoupaElement.innerHTML = `
            <img src="${roupa.imagem}" alt="${roupa.nome}">
            <div class="details">
                <strong>${roupa.nome}</strong>
                <p>Tamanho: ${roupa.tamanho}</p>
                <p>Descrição: ${roupa.descricao}</p>
                <p>Preço: R$ ${roupa.preco}</p>
            </div>
            <button class="eye-btn"><i class="fas fa-eye"></i></button>
            ${defaultItem ? '' : '<button class="delete-btn"><i class="fas fa-trash"></i></button>'}
        `;

        novaRoupaElement.querySelector(".eye-btn").addEventListener("click", function() {
            const items = Array.from(listaRoupas.children);
            const index = items.indexOf(novaRoupaElement);
            const row = Math.floor(index / 3);
            const start = row * 3;
            const end = start + 3;
            for (let i = start; i < end; i++) {
                if (items[i]) {
                    const details = items[i].querySelector(".details");
                    details.style.display = (details.style.display === "flex") ? "none" : "flex";
                }
            }
        });

        if (!defaultItem) {
            novaRoupaElement.querySelector(".delete-btn").addEventListener("click", function() {
                deletarRoupa(roupa.id);
                listaRoupas.removeChild(novaRoupaElement);
            });
        }

        listaRoupas.appendChild(novaRoupaElement);
    }

    function salvarRoupa(roupa) {
        const roupas = JSON.parse(localStorage.getItem("roupas")) || [];
        roupas.push(roupa);
        localStorage.setItem("roupas", JSON.stringify(roupas));
    }

    function carregarRoupas() {
        const roupas = JSON.parse(localStorage.getItem("roupas")) || [];
        roupas.forEach(roupa => adicionarRoupa(roupa));
    }

    function deletarRoupa(id) {
        let roupas = JSON.parse(localStorage.getItem("roupas")) || [];
        roupas = roupas.filter(roupa => roupa.id !== id);
        localStorage.setItem("roupas", JSON.stringify(roupas));
    }


    const roupasFemininas = [
        {
            nome: "Vestido Floral",
            tamanho: "P, M, G",
            descricao: "Lindo vestido floral para crianças.",
            preco: 59.99,
            imagem: "https://m.media-amazon.com/images/I/41U9GgszGwL._AC_.jpg"
        },
        {
            nome: "Conjunto Saia e Blusa",
            tamanho: "P, M, G",
            descricao: "Conjunto de saia e blusa para crianças.",
            preco: 49.99,
            imagem: "https://ae01.alicdn.com/kf/Hb20d5d71cf174a0b8fe4a20c70a065c3X.jpg_640x640Q90.jpg_.webp"
        },
        {
            nome: "Macacão Jeans",
            tamanho: "P, M, G",
            descricao: "Macacão jeans estiloso para crianças.",
            preco: 69.99,
            imagem: "https://http2.mlstatic.com/D_NQ_NP_838501-MLB52712404638_122022-O.jpg"
        },
        {
            nome: "Jaqueta de Couro",
            tamanho: "P, M, G",
            descricao: "Jaqueta de couro para crianças estilosas.",
            preco: 89.99,
            imagem: "https://cdn.awsli.com.br/600x1000/1099/1099238/produto/77440248/faf388eb49.jpg"
        },
        {
            nome: "Moletom com Capuz",
            tamanho: "P, M, G",
            descricao: "Moletom confortável com capuz.",
            preco: 39.99,
            imagem: "https://i.pinimg.com/originals/8f/68/7a/8f687afbb8badf5dae45899491635d6e.jpg"
        },
        {
            nome: "Camiseta Divertida",
            tamanho: "P, M, G",
            descricao: "Camiseta com estampa divertida.",
            preco: 29.99,
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutro46tLCuTgNyB2sGOywS3s82gcTw1ZX_w&s"
        },
        {
            nome: "Saia de Tule",
            tamanho: "P, M, G",
            descricao: "Saia de tule para um visual encantador.",
            preco: 34.99,
            imagem: "https://down-br.img.susercontent.com/file/br-11134207-7qukw-lf5h906nspuz20"
        },
        {
            nome: "Calça Jeans",
            tamanho: "P, M, G",
            descricao: "Calça jeans clássica para crianças.",
            preco: 54.99,
            imagem: "https://http2.mlstatic.com/D_NQ_NP_900208-MLB52487638213_112022-O.webp"
        },
        {
            nome: "Macacão de Algodão",
            tamanho: "P, M, G",
            descricao: "Macacão confortável de algodão.",
            preco: 44.99,
            imagem: "https://http2.mlstatic.com/D_NQ_NP_995745-MLB50971976476_082022-O.webp"
        },
    ];

    roupasFemininas.forEach(roupa => adicionarRoupa(roupa, true));
});