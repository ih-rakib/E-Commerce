import { useState } from "react";

const STORE = {
  address: "221B Baker Street, London",
  mapsUrl: "https://maps.google.com/?q=221B+Baker+Street+London",
  phone: "+880 1568 041680",
  phoneHref: "tel:+8801568041680",
  email: "support@shopgalore.com",
  hours: "Mon – Sat, 9:00 – 18:00",
  whatsapp:
    "https://wa.me/8801568041680?text=Hi%20ShopGalore!%20I%20have%20a%20question%20about%20a%20product.",
};

const infoCards = [
  {
    icon: "ri-map-pin-line",
    title: "Visit us",
    lines: [STORE.address],
    href: STORE.mapsUrl,
    external: true,
    action: "Get directions",
  },
  {
    icon: "ri-phone-line",
    title: "Call us",
    lines: [STORE.phone, STORE.hours],
    href: STORE.phoneHref,
    external: false,
    action: "Call now",
  },
  {
    icon: "ri-mail-line",
    title: "Email us",
    lines: [STORE.email, "Replies within 24 hours"],
    href: `mailto:${STORE.email}`,
    external: false,
    action: "Send email",
  },
  {
    icon: "ri-whatsapp-line",
    title: "WhatsApp",
    lines: ["01568 041680", "Fastest response"],
    href: STORE.whatsapp,
    external: true,
    action: "Chat now",
  },
];

const profiles = [
  { icon: "ri-github-line", label: "GitHub", href: "https://github.com/ih-rakib" },
  { icon: "ri-linkedin-line", label: "LinkedIn", href: "https://www.linkedin.com/in/ikramul-hasan-rakib" },
  { icon: "ri-projector-line", label: "Projects", href: "https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md" },
  { icon: "ri-code-line", label: "LeetCode", href: "https://leetcode.com/u/kuhelica/" },
  { icon: "ri-sword-line", label: "Codeforces", href: "https://codeforces.com/profile/Rakib03" },
  { icon: "ri-bank-card-line", label: "HackerRank", href: "https://www.hackerrank.com/profile/hasanrakib3590" },
  { icon: "ri-youtube-line", label: "YouTube", href: "https://www.youtube.com/@ihrakib07" },
  { icon: "ri-book-line", label: "Learning notes", href: "https://github.com/ih-rakib/Profile/tree/master/Learning" },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-10 md:py-14">
        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Contact us</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-600">
          Questions about an order, a product, or returns? Reach us through any channel below —
          we reply within 24 hours on business days.
        </p>

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-light text-primary text-xl">
                <i className={card.icon} aria-hidden="true"></i>
              </span>
              <h2 className="mt-3 font-semibold text-gray-900">{card.title}</h2>
              {card.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-gray-600">{line}</p>
              ))}
              <a
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
              >
                {card.action}
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </a>
            </div>
          ))}
        </div>

        {/* Form + profiles */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900">Send us a message</h2>
            <p className="mt-1 text-sm text-gray-600">
              Prefer email? Write to{" "}
              <a href={`mailto:${STORE.email}`} className="font-medium text-primary hover:text-primary-dark">
                {STORE.email}
              </a>
              .
            </p>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}
            {sent && (
              <p role="status" className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-700">
                Thanks — your message is ready. Your email app will open, or just write to us directly
                at {STORE.email}.
              </p>
            )}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                Subject <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Order #1234, sizing, returns…"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              <i className="ri-send-plane-line" aria-hidden="true"></i>
              Send message
            </button>
          </form>

          <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Store hours</h2>
            <p className="mt-1 text-sm text-gray-600">{STORE.hours}</p>
            <p className="mt-1 text-sm text-gray-600">{STORE.address}</p>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Developer & profiles
            </h3>
            <ul className="mt-3 divide-y divide-gray-100">
              {profiles.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 py-2.5 text-sm text-gray-700 transition hover:text-primary"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition group-hover:bg-primary-light group-hover:text-primary">
                      <i className={p.icon} aria-hidden="true"></i>
                    </span>
                    <span className="font-medium">{p.label}</span>
                    <i className="ri-external-link-line ml-auto text-gray-400 transition group-hover:text-primary" aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
