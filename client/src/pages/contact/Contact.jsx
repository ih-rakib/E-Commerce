import { useEffect } from "react";
import { Link } from "react-router-dom";

const PORTFOLIO_CONTACT = "https://rakib-orion.vercel.app/contact";

const Contact = () => {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.replace(PORTFOLIO_CONTACT);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-extra-light">
      <div className="max-w-screen-2xl mx-auto px-4 pt-8 pb-12 text-center">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-text-light">
          <Link to="/" className="transition hover:text-primary">Home</Link>
          <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
          <span aria-current="page" className="text-text-dark">Contact</span>
        </nav>

        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary-light text-2xl text-primary">
            <i className="ri-send-plane-line" aria-hidden="true"></i>
          </span>
          <h1 className="mt-4 text-xl font-bold text-text-dark">Taking you to our contact page…</h1>
          <p className="mt-2 text-sm text-text-light">
            You&apos;re being redirected to{" "}
            <span className="font-medium text-text-dark">rakib-orion.vercel.app/contact</span>.
          </p>
          <div className="mt-4 flex justify-center" aria-hidden="true">
            <i className="ri-loader-4-line animate-spin text-2xl text-primary"></i>
          </div>
          <a
            href={PORTFOLIO_CONTACT}
            className="btn mt-5 w-full"
          >
            Continue to contact
            <i className="ri-external-link-line" aria-hidden="true"></i>
          </a>
          <p className="mt-3 text-xs text-text-light">
            Not redirected? Click the button above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
