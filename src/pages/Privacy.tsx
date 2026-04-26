import { Seo } from "@/components/Seo";
import { useLang } from "@/hooks/useLang";

export default function Privacy() {
  const lang = useLang();
  const isEs = lang === "es";

  return (
    <>
      <Seo
        title={isEs ? "Política de Privacidad | BePelican" : "Privacy Policy | BePelican"}
        description={isEs
          ? "Política de Tratamiento de Datos Personales de BE PELICAN S.A.S. B.I.C."
          : "Personal Data Treatment Policy of BE PELICAN S.A.S. B.I.C."}
        path={`/${lang}/privacidad`}
      />
      <article className="container max-w-3xl py-16 md:py-24">
        <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">
          {isEs ? "Protección de datos" : "Data protection"}
        </p>
        <h1 className="text-4xl md:text-5xl mb-4 text-balance">
          {isEs ? "Política de Manejo de Datos Personales" : "Personal Data Management Policy"}
        </h1>
        <p className="text-muted-foreground mb-12">
          BE PELICAN S.A.S. B.I.C. — {isEs ? "Aviso de Protección de Datos Personales" : "Personal Data Protection Notice"}
        </p>

        <div className="prose prose-lg max-w-none space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 1 · Aviso de Protección de Datos" : "Section 1 · Data Protection Notice"}</h2>
            <p>
              {isEs
                ? 'La presente Política de Tratamiento de Datos Personales, en adelante la "Política", tiene como objeto establecer e informar el tratamiento que da BE PELICAN S.A.S. B.I.C. a los Datos Personales de quienes los han proporcionado, tales como proveedores, clientes, asociados y empleados.'
                : 'This Personal Data Treatment Policy, hereinafter the "Policy", aims to establish and inform the treatment that BE PELICAN S.A.S. B.I.C. gives to the Personal Data of those who have provided it, such as suppliers, clients, partners and employees.'}
            </p>
            <p>
              {isEs
                ? "Esta Política define los requerimientos mínimos para asegurar un adecuado nivel de protección dentro de BE PELICAN S.A.S. B.I.C. para la recopilación, uso, revelación, transferencia, almacenamiento y demás procesos relacionados con Datos Personales."
                : "This Policy defines the minimum requirements to ensure an adequate level of protection within BE PELICAN S.A.S. B.I.C. for the collection, use, disclosure, transfer, storage and other processes related to Personal Data."}
            </p>
            <p>
              {isEs
                ? "BE PELICAN enfatiza su compromiso con la privacidad y la protección de los Datos Personales."
                : "BE PELICAN emphasizes its commitment to privacy and the protection of Personal Data."}
            </p>
            <p>
              {isEs
                ? "Esta Política se aplicará a todas las bases de datos y/o archivos que contengan Datos Personales que sean objeto de tratamiento por parte de BE PELICAN S.A.S. B.I.C. en calidad de responsable. Aplicará a todos los canales de comunicación e interacción que adelante la sociedad y en los que se recolecten Datos Personales, tales como Datos Personales Sensibles, comerciales y/o administrativos, entre otros."
                : "This Policy applies to all databases and/or files containing Personal Data treated by BE PELICAN S.A.S. B.I.C. as data controller. It applies to all communication and interaction channels operated by the company through which Personal Data is collected, including Sensitive, commercial and/or administrative Personal Data."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 2 · Identificación del Responsable" : "Section 2 · Identification of the Controller"}</h2>
            <p>
              <strong>BE PELICAN S.A.S. B.I.C.</strong><br />
              {isEs ? "Correo:" : "Email:"} comunicaciones@bepelican.com<br />
              WhatsApp: +57 313 5525944
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 3 · Definiciones" : "Section 3 · Definitions"}</h2>
            <p>
              {isEs
                ? "Para los efectos de esta Política, se entiende por Dato Personal cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables. Titular es la persona natural cuyos datos son objeto de tratamiento. Responsable y Encargado del tratamiento corresponden a las definiciones establecidas en la Ley 1581 de 2012 y sus decretos reglamentarios."
                : "For the purposes of this Policy, Personal Data means any information linked or that can be associated with one or several determined or determinable natural persons. Data Subject is the natural person whose data is being treated. Controller and Processor correspond to the definitions established in Colombian Law 1581 of 2012 and its regulatory decrees."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 4 · Generalidades" : "Section 4 · General Provisions"}</h2>
            <p>
              {isEs
                ? "El tratamiento de Datos Personales por parte de BE PELICAN se rige por los principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad consagrados en la normativa colombiana de protección de datos."
                : "The treatment of Personal Data by BE PELICAN is governed by the principles of legality, purpose, freedom, veracity, transparency, restricted access and circulation, security and confidentiality enshrined in Colombian data protection regulations."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 5 · Cookies y Tecnologías de Seguimiento" : "Section 5 · Cookies and Tracking Technologies"}</h2>
            <p>
              {isEs
                ? "Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico y personalizar contenido. El usuario puede configurar su navegador para rechazar cookies, entendiendo que algunas funcionalidades del sitio podrían verse afectadas."
                : "Our website may use cookies and similar technologies to improve the user experience, analyze traffic, and personalize content. Users can configure their browser to reject cookies, understanding that some site functionalities may be affected."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 6 · Tratamiento y Finalidad" : "Section 6 · Treatment and Purpose"}</h2>
            <p>
              {isEs
                ? "Los Datos Personales recolectados serán utilizados para: (i) gestionar reservas y solicitudes de información sobre experiencias turísticas; (ii) responder consultas y brindar soporte; (iii) enviar comunicaciones comerciales con autorización previa; (iv) cumplir obligaciones legales, contractuales y tributarias; (v) realizar análisis estadísticos para mejorar nuestros servicios."
                : "Personal Data collected will be used to: (i) manage bookings and information requests about tourism experiences; (ii) answer inquiries and provide support; (iii) send commercial communications with prior authorization; (iv) comply with legal, contractual and tax obligations; (v) perform statistical analysis to improve our services."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 7 · Derechos de los Titulares" : "Section 7 · Data Subject Rights"}</h2>
            <p>
              {isEs
                ? "El Titular podrá: conocer, actualizar y rectificar sus Datos Personales; solicitar prueba de la autorización otorgada; ser informado sobre el uso dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y/o solicitar la supresión del dato cuando proceda; y acceder en forma gratuita a sus datos."
                : "The Data Subject may: know, update and rectify their Personal Data; request proof of the authorization granted; be informed about the use given to their data; file complaints before the Colombian Superintendence of Industry and Commerce; revoke authorization and/or request deletion when applicable; and access their data free of charge."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 8 · Procedimiento para Ejercer sus Derechos" : "Section 8 · Procedure to Exercise Your Rights"}</h2>
            <p>
              {isEs
                ? "Para ejercer cualquiera de los derechos mencionados, el Titular podrá enviar su solicitud al correo comunicaciones@bepelican.com indicando nombre completo, documento de identidad, descripción clara de los hechos y solicitud, dirección de notificación y documentos que soporten su petición."
                : "To exercise any of the mentioned rights, the Data Subject may send their request to comunicaciones@bepelican.com indicating full name, identification document, clear description of facts and request, notification address, and supporting documents."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 9 · Procedimiento para Quejas y Reclamos" : "Section 9 · Complaints and Claims Procedure"}</h2>
            <p>
              {isEs
                ? "BE PELICAN dará respuesta a las consultas en un término máximo de diez (10) días hábiles y a los reclamos en un término máximo de quince (15) días hábiles, contados a partir del día siguiente a la fecha de recibo. Cuando no fuere posible atender el requerimiento dentro de dichos términos, se informará al interesado los motivos de la demora."
                : "BE PELICAN will respond to inquiries within a maximum of ten (10) business days and to claims within a maximum of fifteen (15) business days, counted from the day following the date of receipt. If it is not possible to address the request within these terms, the interested party will be informed of the reasons for the delay."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 10 · Datos Personales Sensibles" : "Section 10 · Sensitive Personal Data"}</h2>
            <p>
              {isEs
                ? "BE PELICAN solo solicitará Datos Personales Sensibles cuando exista una finalidad legítima conforme a la ley o medie autorización expresa del Titular. El Titular no está obligado a autorizar el tratamiento de datos sensibles."
                : "BE PELICAN will only request Sensitive Personal Data when there is a legitimate purpose under the law or express authorization from the Data Subject. The Data Subject is not obliged to authorize the treatment of sensitive data."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-3">{isEs ? "Sección 11 · Transferencia de Datos Personales" : "Section 11 · Transfer of Personal Data"}</h2>
            <p>
              {isEs
                ? "BE PELICAN podrá transferir o transmitir Datos Personales a terceros, incluyendo aliados operadores locales y proveedores tecnológicos, dentro o fuera del territorio colombiano, garantizando que dichos terceros cumplan con estándares adecuados de protección de datos."
                : "BE PELICAN may transfer or transmit Personal Data to third parties, including local operating partners and technology providers, within or outside Colombian territory, ensuring that such third parties comply with adequate data protection standards."}
            </p>
          </section>

          <p className="text-sm text-muted-foreground border-t border-border pt-6">
            {isEs
              ? "Esta política deberá ser revisada por lo menos cada 2 años. BE PELICAN S.A.S. B.I.C. se reserva el derecho de modificar su contenido para reflejar cambios legislativos, técnicos o de la industria."
              : "This policy shall be reviewed at least every 2 years. BE PELICAN S.A.S. B.I.C. reserves the right to modify its content to reflect legislative, technical or industry changes."}
          </p>
        </div>
      </article>
    </>
  );
}