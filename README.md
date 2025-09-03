# 📦 Modern E-Commerce Storefront

A modern storefront that provides a smooth shopping experience with features like **product browsing, cart management, secure checkout, and order tracking**.  
Built with **Next.js** and integrated with **Strapi Headless CMS** for powerful content and product management.

---

## 🚀 Features

**“The project is still under development, and these features are planned for upcoming releases.”**

- 🛍️ Product listing with categories & filters
- 🔍 Search and sorting functionality
- ❤️ Favorites (wishlist) support
- 🛒 Cart management with quantity updates
- 💳 Secure checkout with Stripe
- 📦 Order history & tracking
- 🔐 User authentication (register/login)
- 📱 Responsive design for mobile & desktop

---

## 🛠️ Tech Stack

- **Frontend UI:** Next.js, TailwindCSS
- **Backend Integation** Strapi (Headless CMS)
- **Payments Integation:** Stripe

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HalimMahmoud/store
   cd store
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a .env.local file in the root with:

   ```lua
   NEXT_PUBLIC_API_URL=http://localhost:1337
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLIC_KEY=your_stripe_public
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

Open http://localhost:3000
