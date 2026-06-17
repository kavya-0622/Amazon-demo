import { useState, useEffect } from "react";

const PRODUCTS = [
  // Electronics
  { id: 1, name: "Samsung Galaxy S24 Ultra 5G (256GB, Titanium Black)", price: 129999, mrp: 134999, rating: 4.5, reviews: 12043, category: "Electronics", subcategory: "Smartphones", badge: "Best Seller", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80", description: "Snapdragon 8 Gen 3 | 200MP Camera | 5000mAh Battery | S Pen Included", brand: "Samsung", inStock: true },
  { id: 2, name: "Apple iPhone 15 (128GB, Black)", price: 79900, mrp: 79900, rating: 4.6, reviews: 23541, category: "Electronics", subcategory: "Smartphones", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80", description: "A16 Bionic chip | 48MP Main Camera | Dynamic Island | USB-C", brand: "Apple", inStock: true },
  { id: 3, name: "OnePlus 12R 5G (256GB, Iron Gray)", price: 39999, mrp: 44999, rating: 4.4, reviews: 8921, category: "Electronics", subcategory: "Smartphones", badge: "Deal", image: "https://image01-in.oneplus.net/media/202407/02/46f7a671b96efc920304eaadabf30ad6.png", description: "Snapdragon 8 Gen 2 | 50MP Triple Camera | 100W SUPERVOOC", brand: "OnePlus", inStock: true },
  { id: 4, name: "boAt Airdopes 141 Bluetooth Truly Wireless Earbuds", price: 1299, mrp: 4490, rating: 4.1, reviews: 45231, category: "Electronics", subcategory: "Audio", badge: "Best Seller", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", description: "42H Playback | BEAST Mode | IWS | ENx Tech | IPX4", brand: "boAt", inStock: true },
  { id: 5, name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price: 24990, mrp: 34990, rating: 4.7, reviews: 9832, category: "Electronics", subcategory: "Audio", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", description: "Industry-leading ANC | 30Hr Battery | Multipoint Connection | Hi-Res Audio", brand: "Sony", inStock: true },
  { id: 6, name: "LG 139 cm (55 inches) 4K Ultra HD Smart OLED TV", price: 119990, mrp: 159990, rating: 4.5, reviews: 3241, category: "Electronics", subcategory: "Televisions", badge: "Deal", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80", description: "OLED evo | α9 AI Processor 4K | Dolby Vision IQ | HDMI 2.1", brand: "LG", inStock: true },

  // Fashion
  { id: 7, name: "Levi's Men's Slim Fit Jeans (Blue, 32W x 32L)", price: 2099, mrp: 3999, rating: 4.3, reviews: 18230, category: "Fashion", subcategory: "Men's Clothing", badge: "Best Seller", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", description: "Slim fit | 5 pocket styling | Stretch fabric | Machine Washable", brand: "Levi's", inStock: true },
  { id: 8, name: "Puma Men's Running Shoes (Black, Size 8)", price: 2997, mrp: 5999, rating: 4.2, reviews: 9821, category: "Fashion", subcategory: "Footwear", badge: "Deal", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", description: "Lightweight | Breathable mesh | EVA midsole | Anti-slip outsole", brand: "Puma", inStock: true },
  { id: 9, name: "W Women's A-Line Saree (Green, M)", price: 699, mrp: 1699, rating: 4.0, reviews: 5431, category: "Fashion", subcategory: "Women's Clothing", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80", description: "Cotton blend | Regular fit | Machine wash | Ethnic wear", brand: "W", inStock: true },
  { id: 10, name: "Fastrack Analog Black Dial Men's Watch", price: 1695, mrp: 2995, rating: 4.1, reviews: 14320, category: "Fashion", subcategory: "Watches", badge: "Best Seller", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", description: "Stainless steel case | Mineral glass | Water resistant 30m | Quartz movement", brand: "Fastrack", inStock: true },

  // Home & Kitchen
  { id: 11, name: "Prestige Iris 750W Mixer Grinder (3 Jars)", price: 2695, mrp: 4395, rating: 4.4, reviews: 22341, category: "Home & Kitchen", subcategory: "Kitchen Appliances", badge: "Best Seller", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80", description: "750W motor | 3 stainless steel jars | 5 year motor warranty | ISI marked", brand: "Prestige", inStock: true },
  { id: 12, name: "Amazon Basics Microfiber Bed Sheet Set (King, Grey)", price: 799, mrp: 1999, rating: 4.2, reviews: 8921, category: "Home & Kitchen", subcategory: "Bedding", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", description: "300 thread count | Microfiber | Easy care | Fade resistant", brand: "Amazon Basics", inStock: true },
  { id: 13, name: "Milton Thermosteel Flip Lid Flask 500ml (Silver)", price: 499, mrp: 895, rating: 4.5, reviews: 31240, category: "Home & Kitchen", subcategory: "Kitchen", badge: "Best Seller", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", description: "Keeps hot 18hrs | Keeps cold 24hrs | Food grade stainless steel | Leak-proof", brand: "Milton", inStock: true },
  { id: 14, name: "Butterfly Smart 3 Burner Gas Stove (Stainless Steel)", price: 3999, mrp: 6500, rating: 4.3, reviews: 7654, category: "Home & Kitchen", subcategory: "Kitchen Appliances", badge: "Deal", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", description: "Brass burners | Toughened glass top | Auto ignition | ISI certified", brand: "Butterfly", inStock: true },
  { id: 15, name: "Godrej Interio Slimline Steel Almirah (Grey, 3 Door)", price: 15990, mrp: 22000, rating: 4.1, reviews: 2341, category: "Home & Kitchen", subcategory: "Furniture", badge: "", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", description: "Cold rolled steel | 3 door design | Enamel paint finish | Central locking", brand: "Godrej", inStock: true },

  // Books
  { id: 16, name: "Atomic Habits by James Clear (English, Paperback)", price: 349, mrp: 499, rating: 4.7, reviews: 54231, category: "Books", subcategory: "Self Help", badge: "Best Seller", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", description: "Proven framework for building good habits | International bestseller | 320 pages", brand: "Penguin", inStock: true },
  { id: 17, name: "The Psychology of Money by Morgan Housel (Paperback)", price: 299, mrp: 450, rating: 4.6, reviews: 32451, category: "Books", subcategory: "Finance", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80", description: "Timeless lessons on wealth and greed | 252 pages | International bestseller", brand: "Jaico", inStock: true },

  // Grocery
  { id: 18, name: "Tata Salt Iodised (1kg)", price: 28, mrp: 30, rating: 4.5, reviews: 98432, category: "Grocery", subcategory: "Salt & Sugar", badge: "Best Seller", image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&q=80", description: "Iodised vacuum evaporated salt | Vacuum dried | Free-flowing", brand: "Tata", inStock: true },
  { id: 19, name: "Aashirvaad Superior MP Atta (10kg)", price: 449, mrp: 499, rating: 4.5, reviews: 43212, category: "Grocery", subcategory: "Atta & Flours", badge: "Best Seller", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", description: "100% MP wheat | Roti that stays soft | Rich in fiber", brand: "Aashirvaad", inStock: true },
  { id: 20, name: "Nescafe Classic Instant Coffee (200g)", price: 389, mrp: 450, rating: 4.4, reviews: 29841, category: "Grocery", subcategory: "Beverages", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80", description: "Rich coffee blend | Dark roasted | 100% coffee | Glass jar", brand: "Nescafe", inStock: true },

  // Beauty & Personal Care
  { id: 21, name: "Curology Face Wash with Charcoalcd  (100ml)", price: 249, mrp: 349, rating: 4.3, reviews: 23541, category: "Beauty", subcategory: "Face Care", badge: "Best Seller", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80", description: "Toxin free | With saffron | Brightening | Suitable for all skin types", brand: "Mamaearth", inStock: true },
  { id: 22, name: "Hair Mask Beauty Product (3x100g)", price: 159, mrp: 225, rating: 4.5, reviews: 54230, category: "Beauty", subcategory: "Bath & Body", badge: "Best Seller", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", description: "1/4 moisturising cream | Gentle on skin | Dermatologist tested", brand: "Dove", inStock: true },
  { id: 23, name: "Lakme Eyeconic Kajal (Black, 0.35g)", price: 199, mrp: 275, rating: 4.3, reviews: 34521, category: "Beauty", subcategory: "Makeup", badge: "Amazon's Choice", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTOvxief1G2_pwiNp-sESq8z_2PfvpDVqs6rOI2SuPaoC3AEkn_jrbp7lTP5FVazRIFoCr4P2Xlgu2nfFLijDOoDG2K1CktNJz6MBvmxnSGujTLfdHbLX2NwQ6kHEbb6HBvVzoa1qg&usqp=CAc", description: "12Hr stay | Smudge-proof | Waterproof | Dermatologically tested", brand: "Lakme", inStock: true },

  // Sports & Fitness
  { id: 24, name: "Boldfit Dumbbell Set 20kg Adjustable (2 x 10kg)", price: 1899, mrp: 3999, rating: 4.3, reviews: 8921, category: "Sports", subcategory: "Strength Training", badge: "Deal", image: "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?w=400&q=80", description: "Cast iron | Vinyl coated | Adjustable | Home gym essentials", brand: "Boldfit", inStock: true },
  { id: 25, name: "Nivia Pro Mesh Football (Size 5, Yellow)", price: 699, mrp: 1299, rating: 4.2, reviews: 5431, category: "Sports", subcategory: "Football", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&q=80", description: "FIFA approved | TPU material | Hand stitched | Machine inflatable", brand: "Nivia", inStock: true },
  { id: 26, name: "Lifelong LLHC25 Hydraulic Home Gym (Multi-Colour)", price: 5999, mrp: 12999, rating: 4.1, reviews: 3212, category: "Sports", subcategory: "Home Gym", badge: "Deal", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", description: "150 exercises | 80kg weight stack | Adjustable seat | 1 year warranty", brand: "Lifelong", inStock: true },

  // Toys & Baby
  { id: 27, name: "LEGO Classic Creative Brick Box (484 pieces)", price: 2999, mrp: 3999, rating: 4.7, reviews: 12431, category: "Toys", subcategory: "Building Blocks", badge: "Best Seller", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80", description: "Age 4+ | 33 colour palette | Includes ideas booklet | Classic LEGO bricks", brand: "LEGO", inStock: true },
  { id: 28, name: "Pampers Active Baby Diaper Pants Large (54 Count)", price: 899, mrp: 1249, rating: 4.5, reviews: 23421, category: "Toys", subcategory: "Baby Care", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", description: "Upto 12 hrs dryness | Soft breathable | Pull-up style | 9-14 kg", brand: "Pampers", inStock: true },

  // Computers & Accessories
  { id: 29, name: "HP 15s Core i5 12th Gen Laptop (8GB/512GB SSD/Win11)", price: 57990, mrp: 67990, rating: 4.4, reviews: 6721, category: "Computers", subcategory: "Laptops", badge: "Deal", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", description: "Intel Core i5-1235U | 15.6\" FHD | Intel Iris Xe | Backlit KB", brand: "HP", inStock: true },
  { id: 30, name: "Logitech MK215 Wireless Keyboard and Mouse Combo", price: 1595, mrp: 2295, rating: 4.3, reviews: 18240, category: "Computers", subcategory: "Peripherals", badge: "Amazon's Choice", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", description: "2.4GHz wireless | 10m range | 12 function keys | Optical mouse", brand: "Logitech", inStock: true },
  { id: 31, name: "Seagate Expansion 2TB USB 3.0 External Hard Drive", price: 4299, mrp: 6999, rating: 4.4, reviews: 9231, category: "Computers", subcategory: "Storage", badge: "Best Seller", image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&q=80", description: "USB 3.0 | Plug and play | Compatible PC & Mac | 3 year warranty", brand: "Seagate", inStock: true },

  // Automotive
  { id: 32, name: "Amsoil Signature Series 5W-30 Synthetic Motor Oil (1Qt)", price: 1299, mrp: 1799, rating: 4.5, reviews: 3421, category: "Automotive", subcategory: "Car Care", badge: "", image: "https://lubrycant.in/cdn/shop/files/AMSOILSignatureSeries5W-30SyntheticMotorOil_3.78L.png?v=1740585792", description: "Full synthetic | 25,000 mile drain interval | Superior protection", brand: "Amsoil", inStock: true },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Home & Kitchen", "Books", "Grocery", "Beauty", "Sports", "Toys", "Computers", "Automotive"];

const BANNERS = [
  { bg: "#FF9900", text: "Great Indian Festival — Up to 80% off on Electronics!", sub: "Limited time deals" },
  { bg: "#232F3E", text: "Prime members get Early Access — Shop Now", sub: "Exclusive deals for Prime" },
  { bg: "#B12704", text: "Fashion Sale — Min 60% Off on Top Brands", sub: "Today only" },
];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#FF9900", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#555", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function formatPrice(p) {
  return "₹" + p.toLocaleString("en-IN");
}

function discount(price, mrp) {
  if (mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

export default function AmazonIndia() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, qty: quantity }];
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const banner = BANNERS[bannerIdx];

  // === CART VIEW ===
  if (showCart) return (
    <div style={{ fontFamily: "'Arial', sans-serif", minHeight: "100vh", background: "#EAEDED" }}>
      <Header cart={cart} cartCount={cartCount} onCartClick={() => setShowCart(false)} onLogoClick={() => { setShowCart(false); setSelectedProduct(null); }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px", display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: 300, background: "#fff", borderRadius: 4, padding: 20 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 28, fontWeight: 400, borderBottom: "1px solid #DDD", paddingBottom: 12 }}>Shopping Cart</h2>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#555" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <p style={{ fontSize: 18 }}>Your cart is empty</p>
              <button onClick={() => setShowCart(false)} style={{ marginTop: 16, background: "#FF9900", border: "none", borderRadius: 3, padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Continue Shopping</button>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #EEE", alignItems: "flex-start" }}>
              <img src={item.image} alt={item.name} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4, cursor: "pointer" }} onClick={() => { setSelectedProduct(item); setShowCart(false); }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px", fontSize: 14, color: "#007185", cursor: "pointer" }} onClick={() => { setSelectedProduct(item); setShowCart(false); }}>{item.name}</p>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "#565959" }}>Brand: {item.brand}</p>
                <p style={{ margin: "0 0 8px", color: "#B12704", fontSize: 12 }}>In Stock</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #888", borderRadius: 3 }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ background: "#F0F2F2", border: "none", padding: "4px 10px", cursor: "pointer", fontSize: 16 }}>−</button>
                    <span style={{ padding: "4px 12px", fontSize: 14 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ background: "#F0F2F2", border: "none", padding: "4px 10px", cursor: "pointer", fontSize: 16 }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#007185", cursor: "pointer", fontSize: 13 }}>Delete</button>
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: 80 }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</p>
                {item.qty > 1 && <p style={{ margin: 0, fontSize: 12, color: "#555" }}>{formatPrice(item.price)} each</p>}
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <div style={{ textAlign: "right", paddingTop: 16, fontSize: 18 }}>
              Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""}): <strong>{formatPrice(cartTotal)}</strong>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ background: "#fff", borderRadius: 4, padding: 20, border: "1px solid #DDD" }}>
              <p style={{ margin: "0 0 4px", color: "#007600", fontSize: 14 }}>✓ Your order qualifies for FREE Delivery.</p>
              <p style={{ margin: "0 0 16px", fontSize: 18 }}>Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""}): <strong>{formatPrice(cartTotal)}</strong></p>
              <button style={{ width: "100%", background: "#FFD814", border: "1px solid #FCD200", borderRadius: 20, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Proceed to Buy</button>
              <button onClick={() => setShowCart(false)} style={{ width: "100%", background: "#fff", border: "1px solid #888", borderRadius: 20, padding: "10px 0", cursor: "pointer", fontSize: 14 }}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // === PRODUCT DETAIL VIEW ===
  if (selectedProduct) {
    const p = selectedProduct;
    const disc = discount(p.price, p.mrp);
    const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    return (
      <div style={{ fontFamily: "'Arial', sans-serif", minHeight: "100vh", background: "#EAEDED" }}>
        <Header cart={cart} cartCount={cartCount} onCartClick={() => { setShowCart(true); setSelectedProduct(null); }} onLogoClick={() => setSelectedProduct(null)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px" }}>
            <span style={{ color: "#007185", cursor: "pointer" }} onClick={() => setSelectedProduct(null)}>Home</span>
            {" › "}
            <span style={{ color: "#007185", cursor: "pointer" }} onClick={() => { setActiveCategory(p.category); setSelectedProduct(null); }}>{p.category}</span>
            {" › "}{p.name.slice(0, 40)}...
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", background: "#fff", borderRadius: 4, padding: 24 }}>
            {/* Image */}
            <div style={{ flex: "0 0 340px", textAlign: "center" }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", maxWidth: 340, height: 340, objectFit: "contain", borderRadius: 4 }} />
            </div>
            {/* Details */}
            <div style={{ flex: 2, minWidth: 240 }}>
              {p.badge && <span style={{ background: "#CC0C39", color: "#fff", fontSize: 11, padding: "2px 8px", borderRadius: 2, marginBottom: 8, display: "inline-block" }}>{p.badge}</span>}
              <h1 style={{ fontSize: 22, fontWeight: 400, margin: "8px 0 8px", lineHeight: 1.4 }}>{p.name}</h1>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#555" }}>Brand: <span style={{ color: "#007185" }}>{p.brand}</span></p>
              <StarRating rating={p.rating} />
              <span style={{ fontSize: 13, color: "#007185", marginLeft: 8 }}>{p.reviews.toLocaleString("en-IN")} ratings</span>
              <div style={{ borderTop: "1px solid #EEE", margin: "12px 0", paddingTop: 12 }}>
                {disc && <p style={{ margin: "0 0 2px", color: "#CC0C39", fontSize: 14 }}>-{disc}% <span style={{ background: "#CC0C39", color: "#fff", padding: "1px 6px", borderRadius: 2 }}>Limited time deal</span></p>}
                <p style={{ margin: "0 0 4px" }}>
                  <span style={{ fontSize: 13, verticalAlign: "top", marginTop: 4 }}>₹</span>
                  <span style={{ fontSize: 36, fontWeight: 400 }}>{p.price.toLocaleString("en-IN")}</span>
                </p>
                {disc && <p style={{ margin: 0, fontSize: 13, color: "#565959" }}>M.R.P.: <s>{formatPrice(p.mrp)}</s></p>}
                <p style={{ margin: "4px 0", fontSize: 13, color: "#007600" }}>✓ FREE Delivery by <strong>Tomorrow</strong> with Prime</p>
                <p style={{ margin: "4px 0", fontSize: 13, color: "#007600" }}>✓ In Stock</p>
              </div>
              <p style={{ fontSize: 14, color: "#333", margin: "0 0 12px", lineHeight: 1.6 }}>{p.description}</p>
            </div>
            {/* Buy Box */}
            <div style={{ flex: "0 0 220px", minWidth: 200 }}>
              <div style={{ border: "1px solid #DDD", borderRadius: 8, padding: 16 }}>
                <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 400 }}>{formatPrice(p.price)}</p>
                {disc && <p style={{ margin: "0 0 8px", fontSize: 12, color: "#565959" }}>M.R.P.: <s>{formatPrice(p.mrp)}</s> ({disc}% off)</p>}
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#007600" }}>✓ FREE Delivery</p>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#007600" }}>✓ In Stock</p>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: "#333" }}>Qty: </label>
                  <select value={qty} onChange={e => setQty(Number(e.target.value))} style={{ border: "1px solid #888", borderRadius: 3, padding: "3px 6px", fontSize: 13 }}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <button
                  onClick={() => { addToCart(p, qty); }}
                  style={{ width: "100%", background: addedToCart === p.id ? "#4CAF50" : "#FFD814", border: "1px solid #FCD200", borderRadius: 20, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 8, transition: "background 0.3s" }}
                >
                  {addedToCart === p.id ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
                <button onClick={() => { addToCart(p, qty); setShowCart(true); setSelectedProduct(null); }} style={{ width: "100%", background: "#FF9900", border: "1px solid #FF8C00", borderRadius: 20, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                  Buy Now
                </button>
                <p style={{ margin: "12px 0 0", fontSize: 12, color: "#555", textAlign: "center" }}>Secure transaction</p>
              </div>
            </div>
          </div>
          {/* Related */}
          {related.length > 0 && (
            <div style={{ background: "#fff", marginTop: 16, borderRadius: 4, padding: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Customers also bought</h2>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {related.map(rp => (
                  <div key={rp.id} onClick={() => { setSelectedProduct(rp); setQty(1); }} style={{ flex: "0 0 180px", cursor: "pointer", textAlign: "center" }}>
                    <img src={rp.image} alt={rp.name} style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 4 }} />
                    <p style={{ fontSize: 13, color: "#007185", margin: "6px 0 2px", lineHeight: 1.3 }}>{rp.name.slice(0, 50)}</p>
                    <StarRating rating={rp.rating} />
                    <p style={{ margin: "4px 0 0", fontWeight: 700 }}>{formatPrice(rp.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === MAIN HOME PAGE ===
  return (
    <div style={{ fontFamily: "'Arial', sans-serif", minHeight: "100vh", background: "#EAEDED" }}>
      <Header cart={cart} cartCount={cartCount} onCartClick={() => setShowCart(true)} onLogoClick={() => { setActiveCategory("All"); setSearchQuery(""); }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Banner */}
      <div style={{ background: banner.bg, color: "#fff", textAlign: "center", padding: "20px 16px", transition: "background 0.5s" }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{banner.text}</p>
        <p style={{ margin: "4px 0 0", fontSize: 14, opacity: 0.9 }}>{banner.sub}</p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 0", scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                whiteSpace: "nowrap", background: activeCategory === cat ? "#232F3E" : "#fff",
                color: activeCategory === cat ? "#FF9900" : "#333",
                border: "1px solid #DDD", borderRadius: 20, padding: "6px 16px",
                cursor: "pointer", fontSize: 13, fontWeight: activeCategory === cat ? 700 : 400,
                flexShrink: 0
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Deal of the Day Banner */}
        {activeCategory === "All" && (
          <div style={{ background: "#fff", borderRadius: 4, padding: 16, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ background: "#CC0C39", color: "#fff", fontSize: 13, padding: "4px 12px", borderRadius: 2, fontWeight: 700 }}>Deal of the Day</span>
            <span style={{ fontSize: 14, color: "#333" }}>Save up to 71% on boAt Earbuds, Prestige Mixers & more</span>
            <button onClick={() => setActiveCategory("Electronics")} style={{ marginLeft: "auto", color: "#007185", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>See all deals →</button>
          </div>
        )}

        {/* Product Grid */}
        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            {activeCategory === "All" ? "Featured Products" : activeCategory}
            <span style={{ fontSize: 14, color: "#555", fontWeight: 400, marginLeft: 8 }}>({filtered.length} results)</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {filtered.map(product => {
            const disc = discount(product.price, product.mrp);
            const isAdded = addedToCart === product.id;
            return (
              <div key={product.id} style={{ background: "#fff", borderRadius: 4, overflow: "hidden", border: "1px solid #DDD", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ position: "relative", cursor: "pointer" }} onClick={() => { setSelectedProduct(product); setQty(1); }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  {product.badge && (
                    <span style={{ position: "absolute", top: 8, left: 8, background: product.badge === "Deal" ? "#CC0C39" : product.badge === "Best Seller" ? "#FF9900" : "#007185", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 2, fontWeight: 700 }}>
                      {product.badge}
                    </span>
                  )}
                  {disc && <span style={{ position: "absolute", top: 8, right: 8, background: "#CC0C39", color: "#fff", fontSize: 10, padding: "2px 6px", borderRadius: 2 }}>-{disc}%</span>}
                </div>
                <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: "#007185", cursor: "pointer", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    onClick={() => { setSelectedProduct(product); setQty(1); }}>
                    {product.name}
                  </p>
                  <p style={{ margin: "0 0 4px", fontSize: 11, color: "#888" }}>{product.brand}</p>
                  <StarRating rating={product.rating} />
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#888" }}>{product.reviews.toLocaleString("en-IN")} ratings</p>
                  <div style={{ marginTop: 6 }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{formatPrice(product.price)}</span>
                    {disc && <span style={{ fontSize: 12, color: "#888", marginLeft: 6 }}><s>{formatPrice(product.mrp)}</s></span>}
                  </div>
                  <p style={{ margin: "2px 0 8px", fontSize: 11, color: "#007600" }}>FREE Delivery</p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      marginTop: "auto", width: "100%",
                      background: isAdded ? "#4CAF50" : "#FFD814",
                      border: isAdded ? "1px solid #4CAF50" : "1px solid #FCD200",
                      borderRadius: 20, padding: "7px 0", cursor: "pointer", fontSize: 13, fontWeight: 600,
                      transition: "background 0.3s"
                    }}
                  >
                    {isAdded ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#555" }}>
            <p style={{ fontSize: 20 }}>No results found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery("")} style={{ marginTop: 12, background: "#FFD814", border: "1px solid #FCD200", borderRadius: 3, padding: "10px 20px", cursor: "pointer" }}>Clear Search</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#232F3E", color: "#fff", padding: "32px 16px", marginTop: 32 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
          {[
            { title: "Get to Know Us", links: ["Careers", "Blog", "About Amazon", "Investor Relations"] },
            { title: "Connect with Us", links: ["Facebook", "Twitter", "Instagram"] },
            { title: "Make Money with Us", links: ["Sell on Amazon", "Advertise", "Amazon Pay"] },
            { title: "Let Us Help You", links: ["Your Account", "Returns Centre", "Help"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14 }}>{col.title}</p>
              {col.links.map(l => <p key={l} style={{ margin: "0 0 4px", fontSize: 13, color: "#DDD", cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #3A4A5A", marginTop: 24, paddingTop: 16, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#DDD" }}>© 2025 Amazon.in — Demo clone for educational purposes</p>
        </div>
      </div>
    </div>
  );
}

function Header({ cart, cartCount, onCartClick, onLogoClick, searchQuery, setSearchQuery }) {
  return (
    <div style={{ background: "#232F3E", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        {/* Logo */}
        <div onClick={onLogoClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 2, flexShrink: 0, border: "2px solid transparent", padding: "4px 6px", borderRadius: 2 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <span style={{ color: "#FF9900", fontSize: 22, fontWeight: 900, letterSpacing: -1 }}>amazon</span>
          <span style={{ color: "#FF9900", fontSize: 22, fontWeight: 900 }}>.in</span>
        </div>
        {/* Deliver to */}
        <div style={{ color: "#ccc", fontSize: 11, flexShrink: 0, display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span>Deliver to</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>India</span>
        </div>
        {/* Search */}
        <div style={{ flex: 1, display: "flex", borderRadius: 4, overflow: "hidden" }}>
          <select style={{ background: "#F3F3F3", border: "none", padding: "0 8px", fontSize: 12, color: "#333", cursor: "pointer" }}>
            <option>All</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in"
            style={{ flex: 1, border: "none", padding: "8px 12px", fontSize: 15, outline: "none" }}
          />
          <button style={{ background: "#FF9900", border: "none", padding: "0 14px", cursor: "pointer", fontSize: 18 }}>🔍</button>
        </div>
        {/* Account */}
        <div style={{ color: "#fff", fontSize: 13, cursor: "pointer", flexShrink: 0, padding: "4px 6px", border: "2px solid transparent", borderRadius: 2 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <div style={{ fontSize: 11, color: "#ccc" }}>Hello, sign in</div>
          <div style={{ fontWeight: 700 }}>Account & Lists ▾</div>
        </div>
        {/* Orders */}
        <div style={{ color: "#fff", fontSize: 13, cursor: "pointer", flexShrink: 0, padding: "4px 6px", border: "2px solid transparent", borderRadius: 2 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <div style={{ fontSize: 11, color: "#ccc" }}>Returns</div>
          <div style={{ fontWeight: 700 }}>&amp; Orders</div>
        </div>
        {/* Cart */}
        <div onClick={onCartClick} style={{ display: "flex", alignItems: "flex-end", gap: 4, cursor: "pointer", color: "#fff", padding: "4px 6px", border: "2px solid transparent", borderRadius: 2, position: "relative" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
          <span style={{ fontSize: 36 }}>🛒</span>
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: 2, left: 18, background: "#FF9900", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
          <span style={{ fontWeight: 700, fontSize: 14 }}>Cart</span>
        </div>
      </div>
      {/* Sub Nav */}
      <div style={{ background: "#37475A", padding: "6px 16px", display: "flex", gap: 20, overflowX: "auto", scrollbarWidth: "none" }}>
        {["Today's Deals", "Customer Service", "Prime", "Gift Cards", "New Arrivals", "Best Sellers", "Mobiles", "Appliances", "Electronics"].map(nav => (
          <span key={nav} style={{ color: "#fff", fontSize: 13, whiteSpace: "nowrap", cursor: "pointer", padding: "2px 0", borderBottom: "2px solid transparent" }}
            onMouseEnter={e => e.currentTarget.style.borderBottomColor = "#fff"}
            onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
            {nav}
          </span>
        ))}
      </div>
    </div>
  );
} 