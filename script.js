
// backend base
const backendURL = "http://localhost:5000";

// ---------- Product Data (kept exactly as you provided) ----------
const products = [
  { id: 'apples', name: 'Apples', price: 100, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/apples.jpg', desc: 'Fresh, crisp, and sweet apples.' },
  { id: 'bananas', name: 'Bananas', price: 50, unit: 'per dozen', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/bananas.jpg', desc: 'Ripe and sweet bananas.' },
  { id: 'oranges', name: 'Oranges', price: 50, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/oranges.jpg', desc: 'Juicy and tangy oranges.' },
  { id: 'grapes', name: 'Grapes', price: 80, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/grapes.jpg', desc: 'Sweet seedless green grapes.' },
  { id: 'mangoes', name: 'Mangoes', price: 100, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/mango.jpg', desc: 'Delicious tropical mangoes.' },
  { id: 'pineapple', name: 'Pineapple', price: 60, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/pineapple.jpg', desc: 'Juicy tropical pineapple.' },
  { id: 'strawberries', name: 'Strawberries', price: 200, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/strawberries.jpg', desc: 'Fresh, sweet strawberries.' },
  { id: 'watermelon', name: 'Watermelon', price: 40, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/watermelon.jpg', desc: 'Refreshing and juicy watermelon.' },
  { id: 'papaya', name: 'Papaya', price: 50, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/papaya.jpg', desc: 'Sweet and soft papaya.' }
];
const vegetables = [
  { id: 'tomato', name: 'Tomatoes', price: 40, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/tomato.jpg', desc: 'Fresh and juicy red tomatoes.' },
  { id: 'potato', name: 'Potatoes', price: 30, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/potato.png', desc: 'Farm-fresh and starchy potatoes.' },
  { id: 'carrot', name: 'Carrots', price: 50, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/carrrot.png', desc: 'Crunchy and sweet carrots.' },
  { id: 'onion', name: 'Onions', price: 35, unit: 'per kg', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/onion.png', desc: 'Freshly harvested onions.' },
  { id: 'spinach', name: 'Spinach', price: 25, unit: 'per bunch', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/spinach.png', desc: 'Green, fresh, and rich in nutrients.' },
  { id: 'cauliflower', name: 'Cauliflower', price: 60, unit: 'per piece', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/cauliflower.png', desc: 'Crisp and fresh cauliflower.' }
];
const juices = [
  { id: 'mango-juice', name: 'Mango Juice', price: 20, unit: 'per glass', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/mango.jpg', desc: 'Fresh mango juice.' },
  { id: 'orange-juice', name: 'Orange Juice', price: 15, unit: 'per glass', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/oranges.jpg', desc: 'Fresh orange juice.' },
  { id: 'pineapple-juice', name: 'Pineapple Juice', price: 25, unit: 'per glass', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/pineapple.jpg', desc: 'Fresh pineapple juice.' },
  { id: 'watermelon-juice', name: 'Watermelon Juice', price: 20, unit: 'per glass', img: 'https://github.com/guptadeepak155/Ramji-Fruit-Veggie-Shop/raw/main/image/watermelon.jpg', desc: 'Refreshing watermelon juice.' }
];

// ---------- State ----------
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
const productCards = document.getElementById('product-cards');
const juiceCards = document.getElementById('juice-cards');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const checkoutModal = document.getElementById('checkout-modal');

// ---------- Utilities ----------
function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }
function showToast(msg){ alert(msg); }
function findProductById(id){ 
  return products.find(p=>p.id===id) 
      || juices.find(j=>j.id===id) 
      || vegetables.find(v=>v.id===id); 
}

// ---------- Renderers ----------
function renderProducts(){
  productCards.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="body"><h3>${p.name}</h3>
      <div class="price-row"><div class="price">₹${p.price.toFixed(2)}</div><input type="number" min="1" value="1" id="qty-${p.id}"></div>
      <p>${p.desc}</p>
      <div class="actions"><button class="add-btn" onclick="addToCartFromCard('${p.id}')">Add to cart</button>
      <button class="btn" onclick="viewProduct('${p.id}')">View</button></div></div>`;
    productCards.appendChild(card);
  });
}
function renderJuices(){
  juiceCards.innerHTML = '';
  juices.forEach(j=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="media"><img src="${j.img}" alt="${j.name}"></div>
      <div class="body"><h3>${j.name}</h3>
      <div class="price-row"><div class="price">₹${j.price.toFixed(2)}</div><input type="number" min="1" value="1" id="qty-${j.id}"></div>
      <p>${j.desc}</p>
      <div class="actions"><button class="add-btn" onclick="addToCartFromCard('${j.id}')">Add to cart</button>
      <button class="btn" onclick="viewProduct('${j.id}')">View</button></div></div>`;
    juiceCards.appendChild(card);
  });
}
function renderVegetables(){
  const vegCards = document.getElementById('vegetable-cards');
  vegCards.innerHTML = '';
  vegetables.forEach(v=>{
    const card = document.createElement('div'); 
    card.className='card';
    card.innerHTML = `
      <div class="media"><img src="${v.img}" alt="${v.name}"></div>
      <div class="body">
        <h3>${v.name}</h3>
        <div class="price-row">
          <div class="price">₹${v.price.toFixed(2)}</div>
          <input type="number" min="1" value="1" id="qty-${v.id}">
        </div>
        <p>${v.desc}</p>
        <div class="actions">
          <button class="add-btn" onclick="addToCartFromCard('${v.id}')">Add to cart</button>
          <button class="btn" onclick="viewProduct('${v.id}')">View</button>
        </div>
      </div>`;
    vegCards.appendChild(card);
  });
}

// ---------- Cart functions ----------
function addToCartFromCard(id){
  const qtyEl = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyEl ? qtyEl.value : 1) || 1;
  const p = findProductById(id);
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += qty; else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty});
  saveCart(); showToast(`${p.name} added to cart`);
}

function changeQty(idx,delta){ cart[idx].qty+=delta; if(cart[idx].qty<1) cart[idx].qty=1; saveCart(); }
function removeItem(idx){ if(confirm(`Remove ${cart[idx].name}?`)){ cart.splice(idx,1); saveCart(); } }
function clearCart(){ if(confirm('Clear cart?')){ cart=[]; saveCart(); showToast('Cart cleared'); } }

// ---------- Product Modal ----------
function viewProduct(id){
  const p=findProductById(id);
  document.getElementById('modal-name').textContent=p.name;
  document.getElementById('modal-desc').textContent=p.desc;
  document.getElementById('modal-price').textContent = `₹${p.price} (${p.unit})`;
  document.getElementById('modal-img').src=p.img;
  document.getElementById('modal-qty').value=1;
  productModal.classList.add('active');
}
function closeModal(){ productModal.classList.remove('active'); }
function addToCartModal() {
  const name = document.getElementById('modal-name').textContent;
  const id = products.concat(juices, vegetables).find(p => p.name === name).id;
  const qty = parseInt(document.getElementById('modal-qty').value) || 1;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += qty;
  else {
    const p = findProductById(id);
    cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty });
  }
  saveCart();
  showToast(`${qty} ${name} added to cart`);
  closeModal();
}
function quickBuy(){ addToCartModal(); openCheckout(); }

// ---------- Cart UI ----------
function toggleCart(){ document.getElementById('cart-sidebar').classList.toggle('active'); }

function updateCartSummary() {
  const summaryEl = document.querySelector('#checkout-form .cart-summary');
  summaryEl.innerHTML = '<h3>Cart Summary</h3>';
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name} x${item.qty}</span><span>₹${itemTotal.toFixed(2)}</span>`;
    summaryEl.appendChild(div);
  });
  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total';
  totalDiv.innerHTML = `<strong>Total:</strong> <span>₹${total.toFixed(2)}</span>`;
  summaryEl.appendChild(totalDiv);
}

function openCheckout(){
  if(cart.length===0){ showToast('Cart is empty'); return; }
  updateCartSummary();
  document.getElementById('checkout-modal').classList.add('active');
}
function closeCheckout(){ document.getElementById('checkout-modal').classList.remove('active'); }

function updateCartUI(){
  cartItemsEl.innerHTML = '';
  let total=0;
  cart.forEach((it,idx)=>{
    const row=document.createElement('div'); row.className='cart-row';
    row.innerHTML=`<img src="${it.img}" alt="${it.name}"><div class="cart-info"><strong>${it.name}</strong>
      <span>₹${(it.price*it.qty).toFixed(2)}</span>
      <div style="display:flex;gap:4px;margin-top:4px;">
      <button onclick="changeQty(${idx},-1)">−</button>
      <span>${it.qty}</span>
      <button onclick="changeQty(${idx},1)">+</button>
      <button onclick="removeItem(${idx})" style="color:#c62828;">Remove</button>
      </div></div>`;
    cartItemsEl.appendChild(row);
    total += it.qty*it.price;
  });
  cartTotalEl.textContent=total.toFixed(2);
  cartCountEl.textContent=`(${cart.reduce((s,i)=>s+i.qty,0)})`;
  checkoutBtn.disabled = cart.length===0;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ---------- Order submission (to backend) ----------
async function submitOrder(e) {
  e.preventDefault();

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const slot = document.getElementById('cust-slot').value.trim();
  const currentCart = JSON.parse(localStorage.getItem('cart')) || cart || [];

  if (!name || !phone || !address || !slot) {
    showToast("Please fill out all fields before placing your order.");
    return;
  }
  if (currentCart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const total = currentCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderData = { name, phone, address, slot, items: currentCart, total };

  try {
    const response = await fetch(`${backendURL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    // backend returns { success: true, orderId: ... } or { ok: true } in earlier examples
    if (response.ok && (data.success || data.ok)) {
      // Save order to local history
      const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
      history.push({
        ...orderData,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("orderHistory", JSON.stringify(history));

      // Clear cart
      cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
      updateCartUI();
      closeCheckout();

      alert("✅ Order placed successfully! Be ready to receive your order 😊");
    } else {
      showToast("⚠️ Failed to place order. Please try again.");
    }
  } catch (err) {
    console.error("❌ Error placing order:", err);
    showToast("❌ Server error. Check backend connection.");
  }
}

// ---------- Cart history (fetching from backend orders) ----------
async function openCartHistory() {
  const modal = document.getElementById("cart-history-modal");
  const container = document.getElementById("cart-history-list");

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  container.innerHTML = `<p>Loading...</p>`;

  try {
    const response = await fetch(`${backendURL}/api/orders`);
    const orders = await response.json();

    if (!orders || orders.length === 0) {
      container.innerHTML = `<p class="muted">No previous orders found.</p>`;
      return;
    }

    container.innerHTML = orders
      .map((order, i) => {
        const total =
          typeof order.totalAmount === "number"
            ? order.totalAmount.toFixed(2)
            : order.totalAmount || order.total || 0;

        const formattedDate = order.date
          ? new Date(order.date).toLocaleString()
          : "No date";

        const itemsHTML = (order.items || [])
          .map(
            (item) =>
              `<li>${item.name} (x${item.qty}) — ₹${(
                (item.price || 0) * item.qty
              ).toFixed(2)}</li>`
          )
          .join("");

        return `
          <div class="order-card">
            <h4>Order #${i + 1} — ${formattedDate}</h4>
            <ul>${itemsHTML}</ul>
            <p><strong>Total:</strong> ₹${total}</p>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    console.error("Error loading cart history:", err);
    container.innerHTML = `<p class="muted">⚠️ Failed to load cart history.</p>`;
  }
}

function closeCartHistory() {
  const modal = document.getElementById('cart-history-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// ---------- Contact form (send to backend) ----------
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !message) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const res = await fetch(`${backendURL}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    } else {
      alert("⚠️ Failed to send message.");
      console.error("Server response:", data);
    }
  } catch (err) {
    console.error("Error sending message:", err);
    alert("❌ Server error. Check backend.");
  }
});

// ---------- Search ----------
function liveSearch(event) {
  const query = event.target.value.toLowerCase();
  const allProducts = products.concat(vegetables, juices);
  document.getElementById('product-cards').innerHTML = '';
  document.getElementById('juice-cards').innerHTML = '';
  document.getElementById('vegetable-cards').innerHTML = '';

  const matchingProducts = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));

  matchingProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="body"><h3>${p.name}</h3>
      <div class="price-row"><div class="price">₹${p.price.toFixed(2)}</div><input type="number" min="1" value="1" id="qty-${p.id}"></div>
      <p>${p.desc}</p>
      <div class="actions"><button class="add-btn" onclick="addToCartFromCard('${p.id}')">Add to cart</button>
      <button class="btn" onclick="viewProduct('${p.id}')">View</button></div></div>`;
    document.getElementById('product-cards').appendChild(card);
  });

  if (query === '') {
      renderProducts(); 
      renderJuices(); 
      renderVegetables();
  }
}
function searchProduct() {
  const inputElement = document.getElementById('search');
  liveSearch({ target: inputElement });
}

// ---------- Init ----------
renderProducts(); 
renderJuices(); 
renderVegetables(); 
updateCartUI();






