"use client";

import React, { useMemo, useState } from "react";

export default function PascoaPropositoLoveSugarLanding() {
  const WHATSAPP_NUMBER = "554721257550";

  const featuredProducts = [
    {
      id: "box-proposito",
      name: "Box Páscoa de Propósito",
      price: 229,
      badge: "Mais escolhida",
      description:
        "Uma experiência criada para transformar a Páscoa em um momento de fé, sabor e significado.",
      includes: [
        "01 Bolinho de Pão de Mel Gourmet desconstruído",
        "02 Pães de Mel Gourmet clássicos",
        "01 Toffee Caramel",
        "01 Croc-Croc Love Sugar de amendoim caramelizado com açúcar mascavo",
        "01 Brownie Funcional",
      ],
      image: "/box-pascoa.png",
      imageAlt: "Box Páscoa de Propósito Love Sugar",
    },
    {
      id: "taca",
      name: "Sobremesa Pão de Mel na Taça",
      price: 170,
      badge: "Experiência memorável",
      description:
        "Camadas de massa de pão de mel macia e aromática, doce de leite cremoso e pedacinhos de chocolate.",
      image: "/taca-sobremesa.png",
      imageAlt: "Sobremesa de pão de mel na taça Love Sugar",
    },
    {
      id: "colomba-pistache",
      name: "Colomba de Pistache",
      price: 99,
      badge: "Edição especial",
      description:
        "Macia, aromática e recheada com creme de pistache para celebrar momentos especiais.",
      image: "/colomba-pistache.png",
      imageAlt: "Colomba de Pistache Love Sugar",
    },
  ];

  const catalogProducts = [
    { name: "Box Páscoa de Propósito", price: 229, category: "Presentear", image: "/box-pascoa.png" },
    { name: "Colomba de Pistache", price: 99, category: "Clássicos de Páscoa", image: "/colomba-pistache.png" },
    { name: "Sobremesa Pão de Mel na Taça", price: 170, category: "Sobremesas", image: "/taca-sobremesa.png" },
    { name: "Croc-Croc Love Sugar", price: 29.9, category: "Novidades", image: "/croc-croc.png" },
    { name: "Lata com 2 Pães de Mel", price: 49.9, category: "Presentear", image: "/lata-paes-mel.png" },
    { name: "Brownie Funcional", price: 22.9, category: "Linha Saudável", image: "/brownie-funcional.png" },
    { name: "Bites de Pão de Mel", price: 38.9, category: "Clássicos Love Sugar", image: "/bites-pao-mel.png" },
    { name: "Toffee Caramel", price: 16.9, category: "Clássicos Love Sugar", image: "/toffee-caramel.png" },
    { name: "Bolinho de Pão de Mel Desconstruído", price: 34.9, category: "Clássicos Love Sugar", image: "/bolinho-desconstruido.png" },
    { name: "Bolo de Pão de Mel Gourmet", price: 170, category: "Sobremesas", image: "/bolo-pao-mel.png" },
  ];

  const categories = [
    "Todos",
    "Presentear",
    "Clássicos Love Sugar",
    "Linha Saudável",
    "Sobremesas",
    "Novidades",
    "Clássicos de Páscoa",
  ];

  const upsellSuggestions = [
    {
      id: "upsell-croc-croc",
      name: "Croc-Croc Love Sugar",
      price: 29.9,
      reason: "Acrescente um crocante de mascavo irresistível à sua Páscoa.",
    },
    {
      id: "upsell-colomba",
      name: "Colomba de Pistache",
      price: 99,
      reason: "Transforme o presente em uma experiência ainda mais especial.",
    },
    {
      id: "upsell-lata",
      name: "Lata com 2 Pães de Mel",
      price: 49.9,
      reason: "Leve também o clássico mais amado da Love Sugar.",
    },
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

  const formatBRL = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );
  const deliveryFee = deliveryOptions[customer.city] ?? 0;
  const total = subtotal + deliveryFee;

  const suggestedUpsells = useMemo(() => {
    const currentNames = new Set(cart.map((item) => item.name));
    return upsellSuggestions.filter((item) => !currentNames.has(item.name)).slice(0, 2);
  }, [cart]);

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
    <div className="min-h-screen bg-[#f7f4ef] text-[#231f20]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f4ef]/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-2xl font-semibold tracking-[0.15em]">LOVE SUGAR</div>
            <div className="text-xs uppercase tracking-[0.35em] text-[#8c7d72]">Páscoa de Propósito</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#destaques"
              className="hidden rounded-full border border-[#d8d0c8] bg-white px-4 py-2 text-sm font-medium transition hover:bg-[#f2ece4] sm:inline-flex"
            >
              Ver destaques
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-[#231f20] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Carrinho ({cart.reduce((acc, item) => acc + item.qty, 0)})
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(214,199,183,0.35),_transparent_35%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full border border-[#d6c9b7] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8b7768] shadow-sm">
              Edição limitada de Páscoa
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              Uma Páscoa para lembrar, sentir e viver o propósito.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#655b54]">
              Uma experiência Love Sugar mais elegante, intuitiva e pronta para converter. Escolha seu presente, personalize sua mensagem e finalize pelo WhatsApp com poucos toques.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#destaques"
                className="inline-flex items-center justify-center rounded-full bg-[#231f20] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
              >
                Quero garantir minha caixa
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d0c8] bg-white px-7 py-4 text-sm font-semibold text-[#231f20] transition hover:bg-[#f3ede6]"
              >
                Ver catálogo completo
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              <div className="rounded-[1.5rem] border border-[#ddd3ca] bg-white/80 p-5 shadow-sm">
                <div className="text-2xl font-semibold">3</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8a7b70]">Cliques</div>
              </div>
              <div className="rounded-[1.5rem] border border-[#ddd3ca] bg-white/80 p-5 shadow-sm">
                <div className="text-2xl font-semibold">WhatsApp</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8a7b70]">Checkout</div>
              </div>
              <div className="rounded-[1.5rem] border border-[#ddd3ca] bg-white/80 p-5 shadow-sm">
                <div className="text-2xl font-semibold">Premium</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[#8a7b70]">Love Sugar</div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-[2.5rem] border border-[#ddd3ca] bg-white shadow-[0_25px_80px_rgba(35,31,32,0.12)]">
              <img
                src="/box-pascoa.png"
                alt="Box Páscoa de Propósito Love Sugar"
                className="h-[330px] w-full object-cover sm:h-[500px]"
              />
              <div className="grid gap-3 border-t border-[#ece3da] bg-[#fcfaf7] p-4 sm:grid-cols-3">
                {featuredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="rounded-[1.5rem] border border-[#e4dacf] bg-white p-4 text-left transition hover:border-[#c7b7a7] hover:shadow-sm"
                  >
                    <div className="text-[11px] uppercase tracking-[0.32em] text-[#8b7b70]">{product.badge}</div>
                    <div className="mt-2 text-base font-semibold leading-tight">{product.name}</div>
                    <div className="mt-3 text-lg font-medium text-[#5f534d]">{formatBRL(product.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="destaques" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight">Versão premium, linda e pronta para vender</h2>
          <p className="mt-4 text-base leading-7 text-[#6a6058]">
            Os produtos mais importantes aparecem primeiro, com imagens reais, decisão rápida, carrinho completo e incentivo de upsell para elevar ticket médio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`overflow-hidden rounded-[2rem] border bg-white ${
                index === 0 ? "border-[#231f20] shadow-[0_20px_60px_rgba(35,31,32,0.14)]" : "border-[#e2d7cd] shadow-sm"
              }`}
            >
              <img src={product.image} alt={product.imageAlt} className="h-72 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 inline-flex rounded-full bg-[#f2ebe3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7d6d61]">
                  {product.badge}
                </div>
                <h3 className="text-2xl font-semibold leading-tight">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6d6158]">{product.description}</p>
                {product.includes && (
                  <ul className="mt-5 space-y-2 text-sm text-[#514944]">
                    {product.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-2xl font-semibold">{formatBRL(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#231f20] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="border-y border-[#eadfd5] bg-[#fcfaf7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight">Catálogo Love Sugar</h2>
            <p className="mt-4 text-base leading-7 text-[#6c6057]">
              Navegação elegante, organizada por categorias, com botão direto de compra para reduzir fricção e acelerar o fechamento.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-[#231f20] text-white"
                    : "border border-[#d8cec4] bg-white text-[#5f554e] hover:bg-[#f4eee8]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-[1.8rem] border border-[#e5dbd1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <img
                  src={product.image || "/box-pascoa.png"}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#8a7a70]">{product.category}</div>
                  <div className="mt-2 text-xl font-semibold leading-tight">{product.name}</div>
                  <div className="mt-3 text-lg font-medium text-[#5b4f49]">{formatBRL(product.price)}</div>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-full bg-[#231f20] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Comprar
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        setCartOpen(true);
                      }}
                      className="rounded-full border border-[#d8cec4] px-4 py-3 text-sm font-semibold text-[#231f20] transition hover:bg-[#f3ede6]"
                    >
                      Ver carrinho
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-xl flex-col bg-[#fcfaf7] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e7ddd3] px-5 py-4">
              <div>
                <div className="text-2xl font-semibold">Seu carrinho</div>
                <div className="text-sm text-[#7a6e66]">Revise, personalize e finalize pelo WhatsApp.</div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-[#d6ccc2] px-3 py-1 text-sm hover:bg-white"
              >
                Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {cart.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-[#d8cec4] bg-white p-8 text-center text-[#7a6e66]">
                  Seu carrinho está vazio.
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.name} className="rounded-[1.5rem] border border-[#e5dad0] bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="mt-1 text-sm text-[#7a6f67]">{formatBRL(item.price)} cada</div>
                        </div>
                        <div className="text-right font-semibold">{formatBRL(item.price * item.qty)}</div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button onClick={() => updateQty(item.name, -1)} className="h-9 w-9 rounded-full border border-[#d4c8be] text-lg">−</button>
                        <div className="min-w-8 text-center font-semibold">{item.qty}</div>
                        <button onClick={() => updateQty(item.name, 1)} className="h-9 w-9 rounded-full border border-[#d4c8be] text-lg">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {suggestedUpsells.length > 0 && (
                <div className="mt-6 rounded-[1.8rem] border border-[#e4d8cf] bg-white p-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b7b6f]">Upsell automático</div>
                  <div className="mt-3 space-y-3">
                    {suggestedUpsells.map((item) => (
                      <div key={item.id} className="rounded-[1.2rem] border border-[#eee4db] bg-[#fcfaf7] p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="mt-1 text-sm leading-6 text-[#746860]">{item.reason}</div>
                          </div>
                          <div className="text-sm font-semibold">{formatBRL(item.price)}</div>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="mt-3 rounded-full border border-[#d5cabf] bg-white px-4 py-2 text-sm font-semibold text-[#231f20] transition hover:bg-[#f1ebe4]"
                        >
                          Adicionar ao pedido
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-[1.8rem] border border-[#e4d8cf] bg-white p-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7b6f]">Personalização</div>
                <div className="mt-4 grid gap-4">
                  <input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full rounded-[1rem] border border-[#d8cec4] px-4 py-3 outline-none transition focus:border-[#231f20]"
                  />
                  <select
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full rounded-[1rem] border border-[#d8cec4] px-4 py-3 outline-none transition focus:border-[#231f20]"
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
                    className="w-full rounded-[1rem] border border-[#d8cec4] px-4 py-3 outline-none transition focus:border-[#231f20]"
                  />
                  <textarea
                    rows={4}
                    value={customer.cardMessage}
                    onChange={(e) => setCustomer({ ...customer, cardMessage: e.target.value })}
                    placeholder="Deseja incluir um cartão de bênção? Escreva sua mensagem aqui"
                    className="w-full rounded-[1rem] border border-[#d8cec4] px-4 py-3 outline-none transition focus:border-[#231f20]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#e6dcd3] bg-white px-5 py-5">
              <div className="space-y-2 text-sm text-[#544a45]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Entrega</span>
                  <span>{deliveryFee === 0 ? "Grátis" : formatBRL(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#eee4db] pt-3 text-base font-semibold text-[#231f20]">
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
                    ? "bg-[#231f20] text-white hover:opacity-90"
                    : "cursor-not-allowed bg-[#d8cec4] text-[#80746d]"
                }`}
              >
                Finalizar pelo WhatsApp
              </a>
              <div className="mt-3 text-center text-xs text-[#85786f]">
                Entrega grátis em Balneário Camboriú, +R$10 Itajaí, +R$20 Itapema, +R$25 Florianópolis e Blumenau.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
