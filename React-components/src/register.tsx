/**
 * register.tsx — Punto de entrada del bundle.
 *
 * Importa cada componente React, lo convierte en un Custom Element
 * usando @r2wc/react-to-web-component, y lo registra en el navegador.
 *
 * Angular solo necesita cargar el .js resultante para usar los tags:
 *   <react-chatbot></react-chatbot>
 *   <react-day-night-switch></react-day-night-switch>
 */
import r2wc from '@r2wc/react-to-web-component';

// --- Componentes ---
import ChatBot from './components/Chatbot';
import DayNightSwitch from './components/DayNightSwitch';

// --- CSS (se inyectan en el <head> gracias a vite-plugin-css-injected-by-js) ---
import './components/ChatBot.css';
import './components/DayNightSwitch.css';

// --- Convertir a Web Components (sin Shadow DOM para que el CSS global funcione) ---
const ChatBotWC = r2wc(ChatBot);
const DayNightSwitchWC = r2wc(DayNightSwitch, { props: { theme: 'string' } });

// --- Registrar Custom Elements ---
if (!customElements.get('react-chatbot')) {
  customElements.define('react-chatbot', ChatBotWC);
}

if (!customElements.get('react-day-night-switch')) {
  customElements.define('react-day-night-switch', DayNightSwitchWC);
}

console.log('[React Web Components] ✅ Registrados: <react-chatbot>, <react-day-night-switch>');
