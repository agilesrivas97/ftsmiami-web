"use client"

import { useState, useEffect } from "react"
import { Shield, FileText, Lock, AlertTriangle, Eye, RefreshCw, Scale, Globe } from 'lucide-react'
import React from "react"

type Language = 'es' | 'en'

const content = {
  es: {
    title: "Términos y Condiciones",
    subtitle: "Aplicación de Reportes de Seguridad",
    sections: [
      {
        title: "1. Propósito de la Aplicación",
        content: "Esta aplicación está diseñada para el registro y gestión de reportes de incidentes de seguridad. Al utilizarla, usted se compromete a proporcionar información precisa y oportuna sobre incidentes relevantes."
      },
      {
        title: "2. Uso de la Información",
        content: "Los reportes enviados a través de esta aplicación serán utilizados para mejorar la seguridad y responder a incidentes. La información puede ser compartida con las autoridades pertinentes cuando sea necesario."
      },
      {
        title: "3. Privacidad y Confidencialidad",
        content: "Nos comprometemos a proteger su privacidad. La información personal se mantendrá confidencial y solo se utilizará para fines relacionados con la seguridad y la gestión de incidentes."
      },
      {
        title: "4. Responsabilidad del Usuario",
        content: "Usted es responsable de la precisión de los reportes que envía. El uso indebido de la aplicación o el envío de informes falsos puede resultar en la suspensión de su cuenta y posibles acciones legales."
      },
      {
        title: "5. Monitoreo y Auditoría",
        content: "La actividad en la aplicación puede ser monitoreada y auditada para garantizar su uso adecuado y la integridad de los reportes de seguridad."
      },
      {
        title: "6. Actualizaciones",
        content: "Estos términos pueden ser actualizados periódicamente. Se le notificará de cambios significativos y el uso continuado de la aplicación implica la aceptación de los términos actualizados."
      },
      {
        title: "7. Ley Aplicable",
        content: "Estos términos se rigen por las leyes de [Tu País/Estado]. Cualquier disputa relacionada con esta aplicación estará sujeta a la jurisdicción exclusiva de los tribunales de [Tu Ciudad/Estado]."
      }
    ],
    acceptButton: "Aceptar y Continuar"
  },
  en: {
    title: "Terms and Conditions",
    subtitle: "Security Incident Reporting Application",
    sections: [
      {
        title: "1. Purpose of the Application",
        content: "This application is designed for recording and managing security incident reports. By using it, you agree to provide accurate and timely information about relevant incidents."
      },
      {
        title: "2. Use of Information",
        content: "Reports submitted through this application will be used to improve security and respond to incidents. Information may be shared with relevant authorities when necessary."
      },
      {
        title: "3. Privacy and Confidentiality",
        content: "We are committed to protecting your privacy. Personal information will be kept confidential and will only be used for purposes related to security and incident management."
      },
      {
        title: "4. User Responsibility",
        content: "You are responsible for the accuracy of the reports you submit. Misuse of the application or submission of false reports may result in suspension of your account and possible legal action."
      },
      {
        title: "5. Monitoring and Auditing",
        content: "Activity in the application may be monitored and audited to ensure its proper use and the integrity of security reports."
      },
      {
        title: "6. Updates",
        content: "These terms may be updated periodically. You will be notified of significant changes, and continued use of the application implies acceptance of the updated terms."
      },
      {
        title: "7. Applicable Law",
        content: "These terms are governed by the laws of [Your Country/State]. Any dispute related to this application will be subject to the exclusive jurisdiction of the courts of [Your City/State]."
      }
    ],
    acceptButton: "Accept and Continue"
  }
}

const icons = [Shield, FileText, Lock, AlertTriangle, Eye, RefreshCw, Scale]

export default function TermsAndConditionsBilingual() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    setLanguage(browserLang === 'es' ? 'es' : 'en')
  }, [])

  const handleContinue = () => {
    // Add logic to continue to the next screen
    console.log("User accepted terms and conditions")
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  const currentContent = content[language]

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="p-4 bg-black text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{currentContent.title}</h1>
          <p className="text-sm mt-1">{currentContent.subtitle}</p>
        </div>
        <button 
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-black hover:bg-blue-800 transition-colors"
          aria-label="Toggle language"
        >
          <Globe className="h-5 w-5" />
        </button>
      </header>
      
      <main className="flex-grow px-4 py-6 overflow-auto">
        <div className="space-y-6 max-w-3xl mx-auto">
          {currentContent.sections.map((section, index) => (
            <section key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow">
              {React.createElement(icons[index], { className: "w-6 h-6 mt-1 flex-shrink-0 text-blue-600" })}
              <div>
                <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
                <p className="text-sm">{section.content}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

    </div>
  )
}
