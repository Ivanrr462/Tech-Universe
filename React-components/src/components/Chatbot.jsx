// Archivo: ChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const PREDEFINED_ANSWERS = [
    {
        keywords: ["productos", "venden", "vendemos", "catalogo", "comprar"],
        answer: "Vendemos una amplia variedad de productos, incluyendo artículos tecnológicos, electrónicos y accesorios. ¿Buscas algo en específico?"
    },
    {
        keywords: ["domicilio", "envio", "enviar", "delivery", "casa"],
        answer: "¡Sí! Hacemos pedidos a domicilio. El tiempo de entrega estimado es de 24 a 48 horas dependiendo de tu ubicación."
    },
    {
        keywords: ["horario", "hora", "abren", "cierran", "abierto"],
        answer: "Nuestro horario de atención es de Lunes a Viernes de 9:00 AM a 6:00 PM, y Sábados de 10:00 AM a 2:00 PM."
    },
    {
        keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos"],
        answer: "¡Hola! Qué gusto saludarte. ¿En qué te puedo ayudar hoy?"
    },
    {
        keywords: ["gracias", "muy amable", "perfecto", "ok", "vale"],
        answer: "¡De nada! Estamos para servirte. ¿Hay algo más en lo que pueda ayudarte?"
    }
];

function getBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // Buscar coincidencia de palabras clave
    for (const item of PREDEFINED_ANSWERS) {
        if (item.keywords.some(kw => lowerMsg.includes(kw))) {
            return item.answer;
        }
    }

    // Respuesta por defecto si no entiende
    return "Lo siento, no tengo una respuesta para eso. Puedes preguntarme sobre nuestros productos, envíos a domicilio u horarios de atención.";
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Estado para el historial de mensajes
    const [messages, setMessages] = useState([
        { text: '¡Hola! Soy tu asistente virtual. Puedes preguntarme sobre nuestros productos, envíos o horarios. ¿En qué puedo ayudarte?', isUser: false, isError: false }
    ]);

    const messagesEndRef = useRef(null);

    // Auto-scroll al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Cerrar con la tecla ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const sendMessage = () => {
        const trimmedMessage = inputValue.trim();
        if (!trimmedMessage) return;

        // 1. Agregar el mensaje del usuario al estado
        setMessages((prev) => [
            ...prev,
            { text: trimmedMessage, isUser: true, isError: false }
        ]);

        // 2. Limpiar input y activar estado de carga (simulado)
        setInputValue('');
        setIsLoading(true);

        // Simulamos un pequeño retraso para que parezca natural
        setTimeout(() => {
            const botResponse = getBotResponse(trimmedMessage);

            setMessages((prev) => [
                ...prev,
                { text: botResponse, isUser: false, isError: false }
            ]);

            setIsLoading(false);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-widget">
            {/* Botón flotante para abrir el chat */}
            <button
                className="chat-button"
                onClick={() => setIsOpen(true)}
                title="Abrir chat"
            >
                💬
            </button>

            {/* Contenedor principal del Chat */}
            <div className={`chat-container ${isOpen ? 'active' : ''}`}>
                <div className="chat-header">
                    <h1>💬 Chat</h1>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.isError ? 'error-message' : `message ${msg.isUser ? 'user' : 'assistant'}`}>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="typing-indicator active">
                            <span></span><span></span><span></span>
                        </div>
                    )}

                    {/* Elemento invisible para forzar el scroll hasta aquí */}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button
                        id="sendButton"
                        onClick={sendMessage}
                        disabled={isLoading || !inputValue.trim()}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}