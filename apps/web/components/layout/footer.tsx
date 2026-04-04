import Link from 'next/link';
import { PawPrint, Mail, Phone, MapPin, Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Explorar',
      links: [
        { href: '/racas', label: 'Raças de Cães' },
        { href: '/quiz', label: 'Encontrar Cão Ideal' },
        { href: '/artigos', label: 'Artigos e Dicas' },
        { href: '/duvidas', label: 'Perguntas Frequentes' },
      ],
    },
    {
      title: 'Categorias',
      links: [
        { href: '/racas?categoria=Pequeno', label: 'Pequeno Porte' },
        { href: '/racas?categoria=Médio', label: 'Médio Porte' },
        { href: '/racas?categoria=Grande', label: 'Grande Porte' },
        { href: '/racas?categoria=Gigante', label: 'Raças Gigantes' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand and About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">
                TutorCanino
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              O guia mais completo para quem ama cães. Informações baseadas em evidências e orientadas para o bem-estar animal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Social">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Social">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Social">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Social">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-lg font-semibold border-b border-gray-800 pb-2 inline-block">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact and Newsletter Preview (Simplified) */}
        <div className="border-t border-gray-800 pt-12 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="flex items-center gap-3 text-gray-400">
            <Mail size={18} className="text-primary" />
            <span>contato@tutorcanino.com.br</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <MapPin size={18} className="text-primary" />
            <span>São Paulo, SP - Brasil</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Phone size={18} className="text-primary" />
            <span>(11) 9999-9999</span>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
          <div className="max-w-2xl">
            <p>
              <strong>Atenção:</strong> As informações contidas no TutorCanino têm caráter informativo e não substituem o aconselhamento de um médico veterinário qualificado. Consulte sempre um profissional para questões de saúde animal.
            </p>
          </div>
          <div>
            <p>&copy; {currentYear} TutorCanino. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
