import { useState } from "react";
import { Link } from "react-router-dom";

const STORE = {
  name: "ShopGalore",
  address: "221B Baker Street, London",
  mapsUrl: "https://maps.google.com/?q=221B+Baker+Street+London",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-0.1700%2C51.5130%2C-0.1430%2C51.5270&layer=mapnik&marker=51.5200%2C-0.1568",
  phone: "+880 1568 041680",
  phoneHref: "tel:+8801568041680",
  email: "support@shopgalore.com",
  hours: [
    { days: "Monday – Saturday", time: "9:00 – 18:00" },
    { days: "Sunday", time: "Closed" },
  ],
  whatsapp:
    "https://wa.me/8801568041680?text=Hi%20ShopGalore!%20I%20have%20a%20question%20about%20a%20product.",
};

const channels = [
  {
    icon: "ri-mail-send-line",
    title: "Email support",
    text: "For orders, returns and product questions.",
    value: STORE.email,
    href: `mailto:${STORE.email}`,
    action: "Write to us",
    external: false,
  },
  {
    icon: "ri-whatsapp-line",
    title: "WhatsApp chat",
    text: "Fastest reply during store hours.",
    value: "01568 041680",
    href: STORE.whatsapp,
    action: "Start chat",
    external: true,
  },
  {
    icon: "ri-phone-line",
    title: "Call the store",
    text: "Mon – Sat, 9:00 – 18:00.",
    value: STORE.phone,
    href: STORE.phoneHref,
    action: "Call now",
    external: false,
  },
];

const topics = ["Order status", "Shipping & delivery", "Returns & refunds", "Product question", "Payment issue", "Other"];

const faqs = [
  {
    q: "How do I track my order?",
    a: "Sign in and open Dashboard → Orders to see live status and tracking for every purchase. Anything unclear — send us the order number through the form below.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 1–2 business days. Standard delivery takes 3–5 business days depending on your area. You'll get tracking as soon as your parcel ships.",
  },
  {
    q: "What is your return policy?",
    a: "Changed your mind or received the wrong item? Contact us within 7 days of delivery with your order number and we'll arrange a return or exchange.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept all major debit and credit cards through our secure Stripe checkout. Your card details never touch our servers.",
  },
];

const socials = [
  { icon: "ri-facebook-fill", label: "Facebook", href: "https://facebook.com" },
  { icon: "ri-instagram-line", label: "Instagram", href: "https://instagram.com" },
  { icon: "ri-twitter-x-line", label: "X (Twitter)", href: "https://x.com" },
  { icon: "ri-youtube-fill", label: "YouTube", href: "https://youtube.com" },
];

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", order: "", topic: topics[0], message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    const subject = `[${form.topic}] ${form.order.trim() ? `Order ${form.order.trim()} — ` : ""}${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`;
    window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", order: "", topic: topics[0], message: "" });
    }, 600);
  };

  return (
    <div className="bg-extra-light">
      {/* Page hero */}
      <div
        className="border-b border-primary-soft"
        style={{ background: "linear-gradient(120deg, var(--primary-color-light) 0%, #fdf2f5 55%, #ffffff 100%)" }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 py-10 md:py-14 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center justify-center gap-2 text-xs font-medium text-text-light">
            <Link to="/" className="transition hover:text-primary">Home</Link>
            <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
            <span aria-current="page" className="text-text-dark">Contact</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-dark">How can we help?</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-text-light">
            Real humans, real answers. Reach us on any channel — we reply within 24 hours on business days.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
            Typically replies in under 24h
          </p>
        </div>
      </div>

      <div className="section__container !py-10 md:!py-14">
        {/* Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-light text-2xl text-primary transition group-hover:bg-primary group-hover:text-white">
                <i className={c.icon} aria-hidden="true"></i>
              </span>
              <h2 className="mt-4 font-bold text-text-dark">{c.title}</h2>
              <p className="mt-1 text-sm text-text-light">{c.text}</p>
              <p className="mt-2 text-sm font-semibold text-text-dark">{c.value}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {c.action}
                <i className="ri-arrow-right-line transition group-hover:translate-x-1" aria-hidden="true"></i>
              </span>
            </a>
          ))}
        </div>

        {/* Form + store */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-text-dark">Send us a message</h2>
            <p className="mt-1 text-sm text-text-light">
              Fill this in and your email app opens with everything addressed — or write to us directly at{" "}
              <a href={`mailto:${STORE.email}`} className="font-semibold text-primary hover:text-primary-dark">
                {STORE.email}
              </a>
              .
            </p>

            {error && (
              <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <i className="ri-error-warning-line mt-0.5" aria-hidden="true"></i>
                {error}
              </p>
            )}
            {sent && (
              <p role="status" className="mt-4 flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                <i className="ri-checkbox-circle-line mt-0.5" aria-hidden="true"></i>
                Message handed off to your email app. We&apos;ll get back to you within 24 hours.
              </p>
            )}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Full name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Email address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-order" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Order number <span className="font-normal text-gray-400">(if any)</span>
                </label>
                <input
                  id="contact-order"
                  name="order"
                  type="text"
                  placeholder="e.g. 6712ab…"
                  value={form.order}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className={`${fieldClass} cursor-pointer`}
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text-dark">
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell us what's going on — the more detail, the faster we can help."
                value={form.message}
                onChange={handleChange}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button type="submit" disabled={sending} className="btn mt-5 w-full sm:w-auto">
              {sending ? (
                <>
                  <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
                  Opening email…
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line" aria-hidden="true"></i>
                  Send message
                </>
              )}
            </button>
          </form>

          {/* Store card */}
          <aside className="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              title={`Map — ${STORE.name} store location`}
              src={STORE.mapEmbed}
              loading="lazy"
              className="h-52 w-full border-0"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-text-dark">Visit the store</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <i className="ri-map-pin-line mt-0.5 text-lg text-primary" aria-hidden="true"></i>
                  <span>
                    <span className="block font-medium text-text-dark">{STORE.address}</span>
                    <a href={STORE.mapsUrl} target="_blank" rel="noreferrer" className="font-medium text-primary hover:text-primary-dark">
                      Get directions
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="ri-time-line mt-0.5 text-lg text-primary" aria-hidden="true"></i>
                  <span>
                    {STORE.hours.map((h) => (
                      <span key={h.days} className="flex justify-between gap-6 text-text-light">
                        <span>{h.days}</span>
                        <span className="font-medium text-text-dark">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="ri-phone-line mt-0.5 text-lg text-primary" aria-hidden="true"></i>
                  <a href={STORE.phoneHref} className="font-medium text-text-dark hover:text-primary">
                    {STORE.phone}
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow ${STORE.name} on ${s.label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-primary hover:text-white"
                  >
                    <i className={s.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="section__header">Frequently asked questions</h2>
          <p className="section__subheader">Quick answers before you write — most queries are covered here.</p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={i > 0 ? "border-t border-gray-100" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`text-sm md:text-base font-semibold ${open ? "text-primary" : "text-text-dark"}`}>
                      {f.q}
                    </span>
                    <i
                      className={`ri-arrow-down-s-line text-xl text-text-light transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-text-light">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
