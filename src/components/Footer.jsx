import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { site } from '../config/site';
import { hasHelp } from '../data/help';
import { categories } from '../lib/catalog';
import { waLink } from '../lib/whatsapp';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div className="foot-brand">
          <Logo size="lg" />
          <p>{site.intro}</p>
          <div className="socials">
            {site.instagram && (
              <a href={`https://www.instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" title="Visit Qalb Studio on Instagram" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
            )}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" title="Chat with Qalb Studio on WhatsApp" aria-label="WhatsApp">
              <WhatsAppIcon size={20} />
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} title="Email Qalb Studio support" aria-label="Email">
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Shop">
          <h4>Shop</h4>
          <Link to="/shop">All products</Link>
          {categories.slice(0, 5).map((c) => (
            <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`}>{c}</Link>
          ))}
        </nav>

        <nav aria-label="Company">
          <h4>Qalb Studio</h4>
          <Link to="/about">Our story</Link>
          <Link to="/wholesale">Wholesale</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/cart">Your bag</Link>
          {hasHelp ? <Link to="/help">Help &amp; policies</Link> : null}
        </nav>

        <div>
          <h4>Get in touch</h4>
          <a className="f-line" href={waLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={16} /> Chat on WhatsApp
          </a>
          {site.email && (
            <a className="f-line" href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>
          )}
          {site.phone && (
            <a className="f-line" href={`tel:${site.phone}`}><Phone size={16} /> {site.phone}</a>
          )}
          {site.address && <p className="f-line"><MapPin size={16} /> {site.address}</p>}
        </div>
      </div>

      <div className="container foot-bottom">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="serif">{site.short} ({site.arabic}) means heart.</p>
      </div>
    </footer>
  );
}
