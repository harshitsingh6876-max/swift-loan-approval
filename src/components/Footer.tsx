import { Shield, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const links = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    products: [
      { name: "Loan Against Property", href: "#" },
      { name: "Home Loan", href: "#" },
      { name: "Business Loan", href: "#" },
      { name: "Personal Loan", href: "#" },
    ],
    resources: [
      { name: "EMI Calculator", href: "#calculator" },
      { name: "Eligibility Check", href: "#" },
      { name: "Track Application", href: "#track" },
      { name: "FAQs", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Security", href: "#" },
      { name: "Grievance Redressal", href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PropertyLoan</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              India's leading digital platform for loans against property.
              Get instant approval with AI-powered processing and minimal
              documentation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4" />
                <span>1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4" />
                <span>support@propertyloan.in</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  One BKC, Tower A, 14th Floor,
                  <br />
                  Bandra Kurla Complex, Mumbai 400051
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="px-4 py-2 rounded-lg bg-background/10 text-xs font-medium">
              RBI Registered NBFC
            </div>
            <div className="px-4 py-2 rounded-lg bg-background/10 text-xs font-medium">
              ISO 27001 Certified
            </div>
            <div className="px-4 py-2 rounded-lg bg-background/10 text-xs font-medium">
              256-bit SSL Encryption
            </div>
            <div className="px-4 py-2 rounded-lg bg-background/10 text-xs font-medium">
              PCI DSS Compliant
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>
              © 2024 PropertyLoan Financial Services Pvt. Ltd. All rights
              reserved.
            </p>
            <p>
              CIN: U65100MH2020PTC123456 | NBFC Registration No: N-XX.XXXXX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
