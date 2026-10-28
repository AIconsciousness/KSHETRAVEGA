import React from 'react';

const LegalCompliance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover-scale animate-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-1 shadow-lg">
                <img 
                  src="/kshetravega-logo.png" 
                  alt="Kshetravega Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal and Compliance</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Company Information</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Details</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Company Name:</strong> Chakravega Technologies Private Limited</li>
                      <li><strong>Founder:</strong> Kamlesh Kumar Sharma</li>
                      <li><strong>Legal Status:</strong> Private Limited Company</li>
                      <li><strong>Registration:</strong> Under Companies Act, 2013</li>
                      <li><strong>Business Type:</strong> Digital Agriculture Technology</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Email:</strong> jhariawatch@chakravega.com | kamleshsamudih@gmail.com</li>
                      <li><strong>Phone:</strong> +91 7209213003 | +91 8969445367</li>
                      <li><strong>Registered Address:</strong> Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand</li>
                      <li><strong>Operational Address:</strong> Dhanbad, BIT Sindri, Jharkhand</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Regulatory Compliance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Agricultural Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Compliance with Agricultural Produce Market Committee (APMC) Act</li>
                    <li>Adherence to Food Safety and Standards Authority of India (FSSAI) guidelines</li>
                    <li>Registration under Essential Commodities Act, 1955</li>
                    <li>Compliance with Agricultural Marketing Infrastructure guidelines</li>
                    <li>Following National Agricultural Policy 2000</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Digital Platform Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Information Technology Act, 2000 compliance</li>
                    <li>Digital Personal Data Protection Act, 2023</li>
                    <li>Intermediary Guidelines and Digital Media Ethics Code</li>
                    <li>Cyber Security Framework compliance</li>
                    <li>E-commerce Rules, 2020 adherence</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Financial Compliance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Tax Compliance</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Goods and Services Tax (GST) registration and compliance</li>
                    <li>Income Tax Act, 1961 compliance</li>
                    <li>Tax Deducted at Source (TDS) provisions</li>
                    <li>Professional Tax registration (where applicable)</li>
                    <li>Annual tax returns filing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Financial Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Reserve Bank of India (RBI) guidelines for payment systems</li>
                    <li>Prevention of Money Laundering Act (PMLA) compliance</li>
                    <li>Know Your Customer (KYC) and Anti-Money Laundering (AML) policies</li>
                    <li>Foreign Exchange Management Act (FEMA) compliance</li>
                    <li>Securities and Exchange Board of India (SEBI) regulations (if applicable)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Protection and Privacy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Data Protection Framework</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Digital Personal Data Protection Act, 2023 compliance</li>
                    <li>Data localization requirements</li>
                    <li>Consent management system</li>
                    <li>Data breach notification procedures</li>
                    <li>Right to be forgotten implementation</li>
                    <li>Data portability provisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Privacy by Design</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Privacy impact assessments</li>
                    <li>Data minimization principles</li>
                    <li>Purpose limitation compliance</li>
                    <li>Storage limitation policies</li>
                    <li>Transparency in data processing</li>
                    <li>User consent mechanisms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 IP Protection</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Trademark registration for company name and logo</li>
                    <li>Copyright protection for software and content</li>
                    <li>Patent applications for innovative technologies</li>
                    <li>Trade secret protection protocols</li>
                    <li>IP licensing agreements</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Third-Party IP Respect</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Open source license compliance</li>
                    <li>Third-party software licensing</li>
                    <li>Content licensing agreements</li>
                    <li>IP infringement monitoring</li>
                    <li>DMCA takedown procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Labor and Employment Compliance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Employment Laws</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Industrial Disputes Act, 1947 compliance</li>
                    <li>Employees' State Insurance (ESI) registration</li>
                    <li>Employees' Provident Fund (EPF) compliance</li>
                    <li>Minimum Wages Act adherence</li>
                    <li>Equal Remuneration Act compliance</li>
                    <li>Sexual Harassment Prevention policies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Workplace Safety</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Occupational Safety and Health standards</li>
                    <li>Workplace safety protocols</li>
                    <li>Emergency response procedures</li>
                    <li>Health and safety training programs</li>
                    <li>Accident reporting mechanisms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Environmental Compliance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Environmental Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Environmental Impact Assessment (EIA) compliance</li>
                    <li>Air and Water Pollution Control Act adherence</li>
                    <li>Hazardous Waste Management Rules compliance</li>
                    <li>E-waste Management Rules adherence</li>
                    <li>Carbon footprint monitoring</li>
                    <li>Sustainable business practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Green Technology</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Renewable energy usage</li>
                    <li>Energy-efficient infrastructure</li>
                    <li>Waste reduction initiatives</li>
                    <li>Paperless operations</li>
                    <li>Carbon offset programs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Industry-Specific Compliance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 Agricultural Technology</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Agricultural Technology Management Agency (ATMA) guidelines</li>
                    <li>National Mission on Agricultural Extension and Technology (NMAET)</li>
                    <li>Digital India initiatives compliance</li>
                    <li>Startup India scheme benefits</li>
                    <li>Make in India program participation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 E-commerce Regulations</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Consumer Protection (E-commerce) Rules, 2020</li>
                    <li>Liability of intermediaries</li>
                    <li>Grievance redressal mechanisms</li>
                    <li>Return and refund policies</li>
                    <li>Product liability compliance</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Compliance Monitoring</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Internal Controls</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Regular compliance audits</li>
                    <li>Internal control systems</li>
                    <li>Risk assessment procedures</li>
                    <li>Compliance training programs</li>
                    <li>Whistleblower protection policies</li>
                    <li>Ethics and code of conduct</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 External Oversight</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Statutory audit requirements</li>
                    <li>Regulatory reporting obligations</li>
                    <li>Government inspection compliance</li>
                    <li>Third-party certification</li>
                    <li>Industry association membership</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Dispute Resolution</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Grievance Redressal</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Multi-level grievance redressal system</li>
                    <li>Ombudsman appointment</li>
                    <li>Alternative dispute resolution (ADR)</li>
                    <li>Arbitration and mediation services</li>
                    <li>Consumer forum access</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">10.2 Legal Framework</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Jurisdiction: Courts in Jharkhand, India</li>
                    <li>Governing law: Indian laws</li>
                    <li>Arbitration Act, 2015 compliance</li>
                    <li>Consumer Protection Act, 2019</li>
                    <li>Commercial Courts Act, 2015</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact for Compliance</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance Officer</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Company:</strong> Chakravega Technologies Private Limited</p>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> jhariawatch@chakravega.com | kamleshsamudih@gmail.com</p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 7209213003 | +91 8969445367</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Registered Address:</strong> Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand</p>
                    <p className="text-gray-700 mb-2"><strong>Operational Address:</strong> Dhanbad, BIT Sindri, Jharkhand</p>
                    <p className="text-gray-700"><strong>Response Time:</strong> 24-48 hours</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                This Legal and Compliance document is reviewed annually and updated as per regulatory changes. 
                Any significant changes will be communicated to all stakeholders through appropriate channels.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> This document is for informational purposes only and does not constitute legal advice. 
                  For specific legal matters, please consult with qualified legal professionals.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCompliance;
