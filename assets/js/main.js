const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const cartItemsState = new Map();
const cartListEl = document.querySelector('.cart-items');
const cartEmptyEl = document.querySelector('.cart-empty');
const cartCountEl = document.getElementById('cart-count');
const checkoutButton = document.querySelector('[data-checkout]');
const whatsappNumber = '573023313920';

function updateCartUI() {
  if (!cartListEl || !checkoutButton || !cartCountEl) {
    return;
  }

  cartListEl.innerHTML = '';
  const entries = Array.from(cartItemsState.entries());
  const hasItems = entries.length > 0;

  if (cartEmptyEl) {
    cartEmptyEl.hidden = hasItems;
  }

  checkoutButton.disabled = !hasItems;

  let totalUnits = 0;

  entries.forEach(([productName, quantity]) => {
    totalUnits += quantity;

    const itemEl = document.createElement('li');
    itemEl.className = 'cart-item';

    const nameEl = document.createElement('span');
    nameEl.className = 'cart-item-name';
    nameEl.textContent = productName;

    const controlsEl = document.createElement('span');
    controlsEl.className = 'cart-item-controls';
    controlsEl.innerHTML = `<span>${quantity} unidad${quantity > 1 ? 'es' : ''}</span>`;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'cart-remove';
    removeButton.dataset.removeProduct = productName;
    removeButton.textContent = 'Quitar';

    controlsEl.appendChild(removeButton);
    itemEl.appendChild(nameEl);
    itemEl.appendChild(controlsEl);
    cartListEl.appendChild(itemEl);
  });

  cartCountEl.textContent = String(totalUnits);
}

document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    if (!productName) {
      return;
    }

    const currentQuantity = cartItemsState.get(productName) || 0;
    cartItemsState.set(productName, currentQuantity + 1);
    updateCartUI();
  });
});

if (cartListEl) {
  cartListEl.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const removeButton = target.closest('[data-remove-product]');
    if (!removeButton) {
      return;
    }

    const productName = removeButton.dataset.removeProduct;
    if (!productName || !cartItemsState.has(productName)) {
      return;
    }

    const currentQuantity = cartItemsState.get(productName) || 0;
    if (currentQuantity <= 1) {
      cartItemsState.delete(productName);
    } else {
      cartItemsState.set(productName, currentQuantity - 1);
    }

    updateCartUI();
  });
}

if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    const entries = Array.from(cartItemsState.entries());
    if (!entries.length) {
      return;
    }

    const totalUnits = entries.reduce((acc, [, quantity]) => acc + quantity, 0);
    const orderLines = entries
      .map(([productName, quantity]) => `- ${productName} x${quantity}`)
      .join('\n');

    const message = [
      'Hola, quiero pedir Espirulina Fusion:',
      orderLines,
      `Total de unidades: ${totalUnits}`,
      'Gracias.'
    ].join('\n');

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener');
  });
}

updateCartUI();
