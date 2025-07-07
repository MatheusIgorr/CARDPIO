// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentCarouselIndex = 0;
let selectedSizes = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load initial content
    updateCartDisplay();
    renderFeaturedItems();
    renderMenuItems();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup scroll handler for header
    setupScrollHandler();
});

// Event Listeners Setup
function setupEventListeners() {
    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // ZIP code auto-fill
    const zipCodeInput = document.getElementById('zip-code');
    if (zipCodeInput) {
        zipCodeInput.addEventListener('input', handleZipCodeChange);
    }
    
    // Form validation
    const formInputs = document.querySelectorAll('#checkout-form input[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Scroll Handler for Header
function setupScrollHandler() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation Functions
function scrollToMenu() {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
        const headerOffset = 80;
        const elementPosition = menuElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function selectCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide featured section
    const featuredSection = document.getElementById('featured-section');
    if (categoryId === 'all') {
        featuredSection.style.display = 'block';
    } else {
        featuredSection.style.display = 'none';
        scrollToMenu();
    }
    
    // Render menu items
    renderMenuItems();
    
    // Close mobile menu
    closeMobileMenu();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    
    mobileMenu.classList.toggle('open');
    
    if (mobileMenu.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    
    mobileMenu.classList.remove('open');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

// Featured Items Carousel
function renderFeaturedItems() {
    const featuredPizzas = getFeaturedPizzas().slice(0, 9);
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Clear existing content
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Render carousel items
    featuredPizzas.forEach((item, index) => {
        const itemElement = createFeaturedItemElement(item, index);
        carousel.appendChild(itemElement);
    });
    
    // Create dots (3 dots for 3 rotations)
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    // Initialize carousel
    updateCarousel();
}

function createFeaturedItemElement(item, index) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'carousel-item';
    
    const selectedSize = selectedSizes[item.id] || 'small';
    const currentPrice = item.sizes[selectedSize].price;
    
    itemDiv.innerHTML = `
        <div class="featured-card">
            <div class="featured-card-image">
                <img src="${item.image}" alt="${item.name}">
                <div class="featured-badge">🍕 Pizza Destaque</div>
            </div>
            <div class="featured-card-content">
                <h3 class="featured-card-title">${item.name}</h3>
                <p class="featured-card-description">${item.description}</p>
                
                <div class="size-selection">
                    <label class="size-selection-label">Escolha o tamanho:</label>
                    <div class="size-buttons">
                        <button class="size-btn ${selectedSize === 'small' ? 'active' : ''}" 
                                onclick="handleSizeChange(${item.id}, 'small')">
                            <span class="size-btn-name">${item.sizes.small.name}</span>
                            <span class="size-btn-pieces">${item.sizes.small.pieces} pedaços</span>
                            <span class="size-btn-price">R$ ${item.sizes.small.price.toFixed(2)}</span>
                        </button>
                        <button class="size-btn ${selectedSize === 'large' ? 'active' : ''}" 
                                onclick="handleSizeChange(${item.id}, 'large')">
                            <span class="size-btn-name">${item.sizes.large.name}</span>
                            <span class="size-btn-pieces">${item.sizes.large.pieces} pedaços</span>
                            <span class="size-btn-price">R$ ${item.sizes.large.price.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
                
                <div class="featured-card-footer">
                    <span class="featured-card-price">R$ ${currentPrice.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id}, true)">
                        <i data-lucide="plus-circle"></i>
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return itemDiv;
}

function handleSizeChange(itemId, size) {
    selectedSizes[itemId] = size;
    renderFeaturedItems();
    renderMenuItems();
    lucide.createIcons();
}

function nextSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % 3;
    updateCarousel();
}

function prevSlide() {
    currentCarouselIndex = (currentCarouselIndex - 1 + 3) % 3;
    updateCarousel();
}

function goToSlide(index) {
    currentCarouselIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const counter = document.getElementById('carousel-counter');
    
    // Update carousel position
    const translateX = -currentCarouselIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
    
    // Update counter
    counter.textContent = `${currentCarouselIndex + 1} de 3`;
}

// Menu Items Rendering
function renderMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';
    
    if (currentCategory === 'all') {
        // Show all categories
        categories.forEach(category => {
            const categoryItems = getItemsByCategory(category.id);
            if (categoryItems.length > 0) {
                const categorySection = createCategorySection(category, categoryItems);
                menuItemsContainer.appendChild(categorySection);
            }
        });
    } else {
        // Show specific category
        const category = categories.find(cat => cat.id === currentCategory);
        const categoryItems = getItemsByCategory(currentCategory);
        
        if (category && categoryItems.length > 0) {
            const categorySection = createCategorySection(category, categoryItems);
            menuItemsContainer.appendChild(categorySection);
        }
    }
    
    lucide.createIcons();
}

function createCategorySection(category, items) {
    const section = document.createElement('div');
    section.className = 'menu-category';
    
    section.innerHTML = `
        <div class="menu-category-header">
            <h2 class="menu-category-title">${category.name}</h2>
            <div class="menu-category-line"></div>
        </div>
        <div class="menu-grid">
            ${items.map(item => createMenuItemElement(item)).join('')}
        </div>
    `;
    
    return section;
}

function createMenuItemElement(item) {
    const selectedSize = selectedSizes[item.id] || 'small';
    const currentPrice = item.sizes ? item.sizes[selectedSize].price : item.price;
    
    return `
        <div class="menu-item">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                ${item.featured ? `
                    <div class="menu-item-badge">
                        <i data-lucide="star"></i>
                        Destaque
                    </div>
                ` : ''}
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                
                ${item.sizes ? `
                    <div class="size-selection">
                        <label class="size-selection-label">Escolha o tamanho:</label>
                        <div class="size-buttons">
                            <button class="size-btn ${selectedSize === 'small' ? 'active' : ''}" 
                                    onclick="handleSizeChange(${item.id}, 'small')">
                                <span class="size-btn-name">${item.sizes.small.name}</span>
                                <span class="size-btn-pieces">${item.sizes.small.pieces} pedaços</span>
                                <span class="size-btn-price">R$ ${item.sizes.small.price.toFixed(2)}</span>
                            </button>
                            <button class="size-btn ${selectedSize === 'large' ? 'active' : ''}" 
                                    onclick="handleSizeChange(${item.id}, 'large')">
                                <span class="size-btn-name">${item.sizes.large.name}</span>
                                <span class="size-btn-pieces">${item.sizes.large.pieces} pedaços</span>
                                <span class="size-btn-price">R$ ${item.sizes.large.price.toFixed(2)}</span>
                            </button>
                        </div>
                    </div>
                ` : ''}
                
                <div class="menu-item-footer">
                    <span class="menu-item-price">R$ ${currentPrice.toFixed(2)}</span>
                    <button class="menu-item-add-btn" onclick="addToCart(${item.id})">
                        <i data-lucide="plus-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Cart Functions
function addToCart(itemId, isFeatured = false) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    let finalItem = { ...item };
    let finalPrice = item.price;
    let sizeName = '';
    let cartItemId = itemId;
    
    // Handle pizza sizes
    if (item.sizes) {
        const selectedSize = selectedSizes[item.id] || 'small';
        const sizeInfo = item.sizes[selectedSize];
        finalPrice = sizeInfo.price;
        sizeName = ` - ${sizeInfo.name} (${sizeInfo.pieces} pedaços)`;
        finalItem.name = `${item.name}${sizeName}`;
        cartItemId = item.id * 1000 + (selectedSize === 'large' ? 1 : 0);
    }
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cartItemId,
            name: finalItem.name,
            price: finalPrice,
            quantity: 1,
            image: item.image,
            category: item.category
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    
    // Show toast
    showToast(`${finalItem.name} adicionado ao carrinho!`, 'success');
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartItems();
}

function updateQuantity(cartItemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(cartItemId);
        return;
    }
    
    const item = cart.find(cartItem => cartItem.id === cartItemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        renderCartItems();
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartItems();
}

function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = getTotalItems();
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

// Cart Sidebar Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('open');
    renderCartItems();
    
    // Close checkout if open
    closeCheckout();
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmpty.style.display = 'flex';
    } else {
        cartItemsContainer.style.display = 'block';
        cartFooter.style.display = 'block';
        cartEmpty.style.display = 'none';
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i data-lucide="plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">R$ ${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        cartTotalPrice.textContent = `R$ ${getTotalPrice().toFixed(2)}`;
    }
    
    lucide.createIcons();
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!', 'error');
        return;
    }
    
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    
    checkoutModal.classList.add('open');
    checkoutTotalPrice.textContent = `R$ ${getTotalPrice().toFixed(2)}`;
    
    closeCart();
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('open');
}

// Address Service Functions
async function fetchAddressByZipCode(zipCode) {
    try {
        const cleanZipCode = zipCode.replace(/\D/g, '');
        
        if (cleanZipCode.length !== 8) {
            throw new Error('CEP inválido');
        }
        
        const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
}

function formatZipCode(zipCode) {
    const cleanZipCode = zipCode.replace(/\D/g, '');
    if (cleanZipCode.length !== 8) return zipCode;
    
    return `${cleanZipCode.slice(0, 5)}-${cleanZipCode.slice(5)}`;
}

async function handleZipCodeChange(e) {
    const zipCode = e.target.value.replace(/\D/g, '');
    const loadingSpinner = document.getElementById('zip-loading');
    
    // Format the zip code as it's typed
    const formattedZipCode = formatZipCode(zipCode);
    e.target.value = formattedZipCode;
    
    // Auto-fill address when zip code is complete
    if (zipCode.length === 8) {
        loadingSpinner.classList.remove('hidden');
        
        const addressData = await fetchAddressByZipCode(zipCode);
        
        loadingSpinner.classList.add('hidden');
        
        if (addressData) {
            document.getElementById('street').value = addressData.logradouro || '';
            document.getElementById('neighborhood').value = addressData.bairro || '';
            document.getElementById('city').value = addressData.localidade || '';
            document.getElementById('state').value = addressData.uf || '';
        }
    }
}

// Form Validation Functions
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const name = field.name;
    let isValid = true;
    let errorMessage = '';
    
    if (!value && field.required) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (name === 'zipCode' && value.replace(/\D/g, '').length !== 8) {
        isValid = false;
        errorMessage = 'CEP inválido';
    }
    
    const errorElement = document.getElementById(`${name}-error`);
    if (errorElement) {
        if (isValid) {
            field.classList.remove('error');
            errorElement.textContent = '';
        } else {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const name = field.name;
    const errorElement = document.getElementById(`${name}-error`);
    
    if (errorElement && field.value.trim()) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function validateForm() {
    const form = document.getElementById('checkout-form');
    const requiredFields = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// WhatsApp Integration
function formatWhatsAppMessage(customerInfo) {
    const orderDetails = cart.map(item => 
        `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const paymentMethodText = {
        credit: 'Cartão de Crédito',
        debit: 'Cartão de Débito',
        cash: 'Dinheiro'
    };

    const address = `${customerInfo.street}, ${customerInfo.number}${customerInfo.complement ? `, ${customerInfo.complement}` : ''}, ${customerInfo.neighborhood}, ${customerInfo.city} - ${customerInfo.state}, CEP: ${customerInfo.zipCode}`;

    return `🍕 *NOVO PEDIDO - SEUDELIVERY* 🍕

👤 *Cliente:* ${customerInfo.name}

📍 *Endereço de Entrega:*
${address}

🛒 *Itens do Pedido:*
${orderDetails}

💰 *Total:* R$ ${getTotalPrice().toFixed(2)}

💳 *Forma de Pagamento:* ${paymentMethodText[customerInfo.paymentMethod]}

---
Pedido realizado através do site SeuDelivery`;
}

function sendToWhatsApp(customerInfo) {
    const message = formatWhatsAppMessage(customerInfo);
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp da empresa (substitua pelo número real)
    const whatsappNumber = '5511999999999'; // Formato: código do país + DDD + número
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho e fechar modal
    clearCart();
    closeCheckout();
    
    // Reset form
    document.getElementById('checkout-form').reset();
    
    showToast('Pedido enviado para o WhatsApp!', 'success');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(e.target);
    const customerInfo = {
        name: formData.get('name'),
        zipCode: formData.get('zipCode'),
        street: formData.get('street'),
        number: formData.get('number'),
        complement: formData.get('complement'),
        neighborhood: formData.get('neighborhood'),
        city: formData.get('city'),
        state: formData.get('state'),
        paymentMethod: formData.get('paymentMethod')
    };
    
    // Send to WhatsApp
    sendToWhatsApp(customerInfo);
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}