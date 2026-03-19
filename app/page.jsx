"use client";

import { useState } from "react";

export default function PascoaPropositoLoveSugarLanding() {
  const WHATSAPP_NUMBER = "554721257550"; //  WhatsApp

  const featuredProducts = [
    {
      id: "box-proposito",
      name: "Box Páscoa de Propósito",
      price: 229,
      badge: "Mais escolhida",
      description:
        "Uma experiência pensada para transformar a Páscoa em um momento de significado, fé e sabor.",
      includes: [
        "01 Bolinho de Pão de Mel Gourmet desconstruído",
        "02 Pães de Mel Gourmet clássicos",
        "01 Toffee Caramel",
        "01 Croc-Croc Love Sugar de amendoim caramelizado com açúcar mascavo",
        "01 Brownie Funcional",
      ],
      image:
        "https://emporio.lovesugar.com.br/img_produtos/box-pascoa.png",
    },
    {
      id: "sobremesa",
      name: "Sobremesa Pão de Mel na Taça",
      price: 170,
      badge: "Experiência memorável",
      description:
        "Camadas de massa de pão de mel macia e aromática,camadas de doce de leite cremoso e com pedacinhos de chocolate ",
      image:
        "https://emporio.lovesugar.com.br/img_produtos/sobremesa.png",
    },
    {
      id: "colomba-pistache",
      name: "Colomba de Pistache",
      price: 99,
      badge: "Edição especial",
      description:
        "Macia, aromática e recheada com creme de pistache para celebrar momentos especiais.",
      image:
        "https://emporio.lovesugar.com.br/img_produtos/colomba-pistache.png",
    },
  ];

  const catalogProducts = [
    { name: "Colomba Strogonoff de Nozes", price: 99, category: "Clássicos de Páscoa" },
    { name: "Croc-Croc Love Sugar", price: 29.9, category: "Novidades", image: "https://emporio.lovesugar.com.br/img_produtos/croc-croc.png"},
    { name: "Bocadito de Doce de Leite", price: 11.9, category: "Clássicos Love Sugar" },
    { name: "Caixa com 9 Bocaditos", price: 99, category: "Clássicos Love Sugar" },
    { name: "Taça de Pão de Mel", price: 170, category: "Sobremesas" },
    { name: "Bolo de Pão de Mel Gourmet", price: 170, category: "Sobremesas" },
    { name: "Toffee Caramel", price: 16.9, category: "Clássicos Love Sugar" },
    { name: "Bolinho de Pão de Mel Desconstruído", price: 34.9, category: "Clássicos Love Sugar" },
    { name: "Bites de Pão de Mel", price: 38.9, category: "Clássicos Love Sugar" },
    { name: "Macadâmia Chocolate Branco", price: 48.9, category: "Empório" },
    { name: "Petit Four Baunilha", price: 38.9, category: "Empório" },
    { name: "Crocante de Avelã", price: 38.9, category: "Empório" },
    { name: "Casadinho de Goiaba", price: 38.9, category: "Empório" },
    { name: "Mini Pão de Mel Gourmet", price: 13.9, category: "Clássicos Love Sugar" },
    { name: "Pão de Mel Gourmet Clássico", price: 18.9, category: "Clássicos Love Sugar" },
    { name: "Lata com 2 Pães de Mel", price: 49.9, category: "Presentear" },
    { name: "Caixa com 3 Pães de Mel Gourmet", price: 63.9, category: "Presentear" },
    { name: "Caixa com 4 Mini Pães de Mel", price: 59.9, category: "Presentear" },
    { name: "Caixa com 4 Pães de Mel Gourmet", price: 79.9, category: "Presentear" },
    { name: "Caixa com 5 Mini Pães de Mel", price: 74.9, category: "Presentear" },
    { name: "Caixa com 6 Pães de Mel Gourmet", price: 117.9, category: "Presentear" },
    { name: "Caixa com 8 Mini Pães de Mel", price: 114.9, category: "Presentear" },
    { name: "Brownie Funcional", price: 22.9, category: "Linha Saudável" },
    { name: "Chocolate Vegano Branco ao Leite de Côco", price: 50.9, category: "Linha Saudável" },
    { name: "Chocolate Vegano 70% Cacau", price: 48.9, category: "Linha Saudável" },
    { name: "Chocolate 45% Cacau", price: 48.9, category: "Linha Saudável" },
    { name: "Drágea Vegana de Cranberry 70% Cacau", price: 50.9, category: "Linha Saudável" },
    { name: "Trufa Vegana", price: 13.9, category: "Linha Saudável" },
    { name: "Mini Palmier", price: 36.9, category: "Empório" },
  ];

  const categories = [
    "Todos",
    "Presentear",
    "Clássicos Love Sugar",
    "Linha Saudável",
    "Sobremesas",
    "Empório",
    "Novidades",
    "Clássicos de Páscoa",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
const [cart, setCart] = useState([]);
const [cartOpen, setCartOpen] = useState(false);
const [customer, setCustomer] = useState({
    name: "",
    city: "Balneário Camboriú",
    date: "",
    cardMessage: "",
  });

  const deliveryOptions = {
    "Balneário Camboriú": 0,
    Itajaí: 10,
    Itapema: 20,
    Florianópolis: 25,
    Blumenau: 25,
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (name, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = deliveryOptions[customer.city] ?? 0;
  const total = subtotal + deliveryFee;

  const formatBRL = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const createWhatsAppMessage = () => {
    const items = cart
      .map((item) => `- ${item.qty}x ${item.name} — ${formatBRL(item.price * item.qty)}`)
      .join("%0A");

    const text = `Olá! Quero fazer meu pedido da Páscoa de Propósito Love Sugar.%0A%0A🛒 Pedido:%0A${items}%0A%0A👤 Nome: ${encodeURIComponent(
      customer.name || "Não informado"
    )}%0A📍 Cidade: ${encodeURIComponent(customer.city)}%0A📅 Data desejada: ${encodeURIComponent(
      customer.date || "A combinar"
    )}%0A💌 Mensagem para o cartão: ${encodeURIComponent(
      customer.cardMessage || "Sem mensagem"
    )}%0A%0A💰 Subtotal: ${encodeURIComponent(
      formatBRL(subtotal)
    )}%0A🚚 Entrega: ${encodeURIComponent(
      deliveryFee === 0 ? "Grátis" : formatBRL(deliveryFee)
    )}%0A✨ Total: ${encodeURIComponent(formatBRL(total))}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-2xl font-semibold tracking-wide">LOVE SUGAR</div>
            <div className="text-xs uppercase tracking-[0.3em] text-stone-500">Páscoa de Propósito</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#catalogo"
              className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-100 sm:inline-flex"
            >
              Ver catálogo
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Carrinho ({cart.reduce((acc, item) => acc + item.qty, 0)})
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-white to-stone-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-stone-600 shadow-sm">
              Edição limitada de Páscoa
            </div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Uma Páscoa para lembrar, sentir e viver o propósito.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              Um catálogo transformado em uma experiência de compra rápida, linda e sem fricção. Escolha seu presente, personalize a mensagem e finalize pelo WhatsApp em poucos toques.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#destaques"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-300 transition hover:-translate-y-0.5"
              >
                Comprar agora
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
              >
                Como funciona
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="text-xl font-semibold">3</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">Cliques</div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="text-xl font-semibold">WhatsApp</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">Checkout</div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="text-xl font-semibold">Mobile</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">First</div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-stone-200 blur-3xl opacity-50" />
            <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?auto=format&fit=crop&w=1400&q=80"
                alt="Páscoa de Propósito Love Sugar"
                className="h-[360px] w-full object-cover sm:h-[460px]"
              />
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {featuredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="rounded-2xl border border-stone-200 bg-stone-50 p-3 text-left transition hover:border-stone-400 hover:bg-white"
                  >
                    <div className="text-xs uppercase tracking-[0.2em] text-stone-500">{product.badge}</div>
                    <div className="mt-2 text-sm font-semibold leading-tight">{product.name}</div>
                    <div className="mt-2 text-sm text-stone-600">{formatBRL(product.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Compra fluida, bonita e rápida</h2>
          <p className="mt-3 text-stone-600">
            A jornada foi pensada para reduzir fricção: primeiro os campeões de venda, depois o catálogo completo, carrinho simples, cálculo de entrega e finalização automática no WhatsApp.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["1. Escolha rápido", "A Box de Propósito aparece primeiro, com 2 alternativas para facilitar a decisão."],
            ["2. Adicione ao carrinho", "Um clique por produto, sem cadastro e sem páginas desnecessárias."],
            ["3. Personalize", "Mensagem para cartão, cidade e data desejada antes do checkout."],
            ["4. Finalize no WhatsApp", "Pedido estruturado e pronto para conversão com atendimento humano Love Sugar."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">{title}</div>
              <p className="mt-3 text-sm leading-6 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="destaques" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Escolha rápida</h2>
              <p className="mt-3 max-w-2xl text-stone-600">
                Comece pelos produtos com maior poder de conversão. Menos opções no topo, mais decisão no clique.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`overflow-hidden rounded-[2rem] border ${
                  index === 0 ? "border-stone-900 shadow-2xl" : "border-stone-200 shadow-sm"
                } bg-stone-50`}
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className="h-72 w-full object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 shadow">
                    {product.badge}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold leading-tight">{product.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-stone-600">{product.description}</p>
                    </div>
                    <div className="rounded-2xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
                      {formatBRL(product.price)}
                    </div>
                  </div>
                  {product.includes && (
                    <ul className="mt-5 space-y-2 text-sm text-stone-700">
                      {product.includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Comprar agora
                    </button>
                    <a
                      href="#catalogo"
                      className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
                    >
                      Ver mais
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Catálogo completo</h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            Para quem quer explorar mais opções depois do destaque principal. Navegação simples por categoria, preços claros e ação imediata.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-stone-900 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.name} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-xs uppercase tracking-[0.25em] text-stone-500">{product.category}</div>
              <div className="mt-2 text-xl font-semibold leading-tight">{product.name}</div>
              <div className="mt-3 text-lg font-medium text-stone-700">{formatBRL(product.price)}</div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    setCartOpen(true);
                  }}
                  className="rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-white/70">Entrega</div>
            <div className="mt-3 text-2xl font-semibold">Transparente antes do checkout</div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Balneário Camboriú grátis, Itajaí +R$10, Itapema +R$20, Florianópolis e Blumenau +R$25.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-white/70">Personalização</div>
            <div className="mt-3 text-2xl font-semibold">Mensagem com propósito</div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              O cliente escreve a mensagem do cartão antes de finalizar, aumentando valor percebido e intenção de compra.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-white/70">Conversão</div>
            <div className="mt-3 text-2xl font-semibold">Fechamento humano no WhatsApp</div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              O pedido chega pronto para ser confirmado, pago e entregue com atendimento Love Sugar impecável.
            </p>
          </div>
        </div>
      </section>

      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <div className="text-xl font-semibold">Seu carrinho</div>
                <div className="text-sm text-stone-500">Revise, personalize e finalize.</div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-stone-300 px-3 py-1 text-sm hover:bg-stone-100"
              >
                Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
                  Seu carrinho está vazio.
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.name} className="rounded-3xl border border-stone-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="mt-1 text-sm text-stone-500">{formatBRL(item.price)} cada</div>
                        </div>
                        <div className="text-right font-semibold">{formatBRL(item.price * item.qty)}</div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button onClick={() => updateQty(item.name, -1)} className="h-9 w-9 rounded-full border border-stone-300 text-lg">−</button>
                        <div className="min-w-8 text-center font-semibold">{item.qty}</div>
                        <button onClick={() => updateQty(item.name, 1)} className="h-9 w-9 rounded-full border border-stone-300 text-lg">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 rounded-3xl border border-stone-200 p-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Personalização</div>
                <div className="mt-4 grid gap-4">
                  <input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0 transition focus:border-stone-900"
                  />
                  <select
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                  >
                    {Object.keys(deliveryOptions).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <input
                    value={customer.date}
                    onChange={(e) => setCustomer({ ...customer, date: e.target.value })}
                    placeholder="Data desejada para entrega"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0 transition focus:border-stone-900"
                  />
                  <textarea
                    rows={4}
                    value={customer.cardMessage}
                    onChange={(e) => setCustomer({ ...customer, cardMessage: e.target.value })}
                    placeholder="Deseja incluir um cartão de bênção? Escreva sua mensagem aqui"
                    className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0 transition focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 bg-stone-50 px-5 py-5">
              <div className="space-y-2 text-sm text-stone-700">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Entrega</span>
                  <span>{deliveryFee === 0 ? "Grátis" : formatBRL(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>
              </div>
              <a
                href={cart.length > 0 ? createWhatsAppMessage() : undefined}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold transition ${
                  cart.length > 0
                    ? "bg-stone-900 text-white hover:opacity-90"
                    : "cursor-not-allowed bg-stone-300 text-stone-500"
                }`}
              >
                Finalizar pelo WhatsApp
              </a>
              <div className="mt-3 text-center text-xs text-stone-500">
                Checkout humanizado e rápido, com confirmação direta pela equipe Love Sugar.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
