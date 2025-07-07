// Menu Data
const categories = [
    {
        id: 'pizzas',
        name: 'Pizzas',
        description: 'Nossas deliciosas pizzas com massa fresca e ingredientes selecionados',
        image: '/img/pizzas.jpeg'
    },
    {
        id: 'burgers',
        name: 'Hambúrgueres',
        description: 'Hambúrgueres artesanais com blend especial',
        image: '/img/burguers.jpeg'
    },
    {
        id: 'sides',
        name: 'Acompanhamentos',
        description: 'Porções e acompanhamentos deliciosos',
        image: '/img/acompanhamentos.jpeg'
    },
    {
        id: 'drinks',
        name: 'Bebidas',
        description: 'Refrigerantes, sucos e outras bebidas',
        image: '/img/driks.jpeg'
    },
    {
        id: 'desserts',
        name: 'Sobremesas',
        description: 'Sobremesas especiais para adoçar seu dia',
        image: '/img/sobremesa.jpeg'
    }
];

const menuItems = [
    {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela, tomate e manjericão fresco',
        price: 45.90,
        image: '/img/pizzaMargherita.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 45.90 },
            large: { name: 'Grande', pieces: 12, price: 65.90 }
        }
    },
    {
        id: 2,
        name: 'Pizza Pepperoni',
        description: 'Molho de tomate, mussarela e pepperoni',
        price: 52.90,
        image: '/img/peperonni.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 52.90 },
            large: { name: 'Grande', pieces: 12, price: 72.90 }
        }
    },
    {
        id: 3,
        name: 'Pizza Quatro Queijos',
        description: 'Molho de tomate, mussarela, provolone, parmesão e gorgonzola',
        price: 54.90,
        image: '/img/quatroqueijos.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 54.90 },
            large: { name: 'Grande', pieces: 12, price: 74.90 }
        }
    },
    {
        id: 4,
        name: 'Pizza Vegetariana',
        description: 'Molho de tomate, mussarela, pimentão, cebola, cogumelos e azeitonas',
        price: 49.90,
        image: '/img/vegetariano.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 49.90 },
            large: { name: 'Grande', pieces: 12, price: 69.90 }
        }
    },
    {
        id: 15,
        name: 'Pizza Calabresa',
        description: 'Molho de tomate, mussarela, calabresa e cebola',
        price: 48.90,
        image: '/img/calabresa.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 48.90 },
            large: { name: 'Grande', pieces: 12, price: 68.90 }
        }
    },
    {
        id: 16,
        name: 'Pizza Portuguesa',
        description: 'Molho de tomate, mussarela, presunto, ovos, cebola e azeitonas',
        price: 56.90,
        image: '/img/portuguesa.jpeg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 56.90 },
            large: { name: 'Grande', pieces: 12, price: 76.90 }
        }
    },
    {
        id: 17,
        name: 'Pizza Frango com Catupiry',
        description: 'Molho de tomate, mussarela, frango desfiado e catupiry',
        price: 53.90,
        image: '/img/pizza-de-frango.jpg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 53.90 },
            large: { name: 'Grande', pieces: 12, price: 73.90 }
        }
    },
    {
        id: 22,
        name: 'Pizza Napolitana',
        description: 'Molho de tomate, mussarela, tomate, orégano e azeitonas',
        price: 47.90,
        image: '/img/napolitana.jpg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 47.90 },
            large: { name: 'Grande', pieces: 12, price: 67.90 }
        }
    },
    {
        id: 23,
        name: 'Pizza Bacon',
        description: 'Molho de tomate, mussarela, bacon crocante e cebola',
        price: 51.90,
        image: '/img/bacon.jpg',
        category: 'pizzas',
        featured: true,
        sizes: {
            small: { name: 'Pequena', pieces: 8, price: 51.90 },
            large: { name: 'Grande', pieces: 12, price: 71.90 }
        }
    },
    {
        id: 5,
        name: 'Hambúrguer Clássico',
        description: 'Pão, blend da casa, queijo, alface, tomate e molho especial',
        price: 32.90,
        image: '/img/basico.jpeg',
        category: 'burgers',
        featured: true
    },
    {
        id: 6,
        name: 'Hambúrguer Bacon',
        description: 'Pão, blend da casa, queijo, bacon crocante, alface, tomate e molho especial',
        price: 36.90,
        image: '/img/h-bacon.jpeg',
        category: 'burgers'
    },
    {
        id: 7,
        name: 'Hambúrguer Gourmet',
        description: 'Pão brioche, blend da casa, queijo cheddar, cebola caramelizada e molho barbecue',
        price: 39.90,
        image: '/img/h-gourmet.jpg',
        category: 'burgers',
        featured: true
    },
    {
        id: 18,
        name: 'Hambúrguer Duplo',
        description: 'Pão, dois blends da casa, queijo duplo, bacon, alface e molho especial',
        price: 42.90,
        image: '/img/h-duplo.jpg',
        category: 'burgers',
        featured: true
    },
    {
        id: 8,
        name: 'Batata Frita',
        description: 'Porção de batata frita crocante',
        price: 18.90,
        image: '/img/batata-fritas.jpeg',
        category: 'sides'
    },
    {
        id: 9,
        name: 'Onion Rings',
        description: 'Anéis de cebola empanados',
        price: 19.90,
        image: '/img/onion-rings.jpg',
        category: 'sides'
    },
    {
        id: 19,
        name: 'Nuggets de Frango',
        description: 'Porção com 10 nuggets crocantes',
        price: 22.90,
        image: '/img/nuggets.jpg',
        category: 'sides',
        featured: true
    },
    {
        id: 10,
        name: 'Refrigerante Cola',
        description: 'Lata 350ml',
        price: 6.90,
        image: '/img/cocacola.jpeg',
        category: 'drinks'
    },
    {
        id: 11,
        name: 'Refrigerante Guaraná',
        description: 'Lata 350ml',
        price: 6.90,
        image: 'img/guarana.jpg',
        category: 'drinks'
    },
    {
        id: 12,
        name: 'Suco Natural de Laranja',
        description: 'Copo 300ml',
        price: 9.90,
        image: 'img/suco de laranja.jpeg',
        category: 'drinks'
    },
    {
        id: 20,
        name: 'Milkshake de Chocolate',
        description: 'Cremoso milkshake com calda de chocolate',
        price: 16.90,
        image: 'img/milkshake-morango.jpeg',
        category: 'drinks',
        featured: true
    },
    {
        id: 13,
        name: 'Sorvete de Chocolate',
        description: 'Com calda de chocolate e chantilly',
        price: 15.90,
        image: '/img/sorvete-morango.jpg',
        category: 'desserts'
    },
    {
        id: 14,
        name: 'Pudim de Leite',
        description: 'Tradicional pudim de leite condensado',
        price: 14.90,
        image: '/img/pudim.jpg',
        category: 'desserts'
    },
    {
        id: 21,
        name: 'Brownie com Sorvete',
        description: 'Brownie quente com sorvete de baunilha e calda de chocolate',
        price: 18.90,
        image: '/img/brownie.jpeg',
        category: 'desserts',
        featured: true
    }
];

// Helper functions
function getItemsByCategory(categoryId) {
    return menuItems.filter(item => item.category === categoryId);
}

function getFeaturedItems() {
    return menuItems.filter(item => item.featured);
}

function getFeaturedPizzas() {
    return menuItems.filter(item => item.category === 'pizzas' && item.featured);
}