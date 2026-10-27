import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover-scale animate-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-1 shadow-lg">
                <img 
                  src="/kshetravega-icon.svg" 
                  alt="Kshetravega Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Kshetravega digital farming platform, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Chakravega Technologies Private Limited provides a digital farming platform that connects farmers with buyers, 
                facilitates crop trading, provides farming analytics, and offers various agricultural services.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Crop listing and marketplace services</li>
                <li>Buyer-seller matching and transactions</li>
                <li>Farming analytics and insights</li>
                <li>Digital farming tools and resources</li>
                <li>Financial services and payment processing</li>
                <li>Educational content and training materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3.1 Account Creation</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>One account per person or entity</li>
                    <li>You must be at least 18 years old to register</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3.2 KYC Verification</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Complete KYC verification is mandatory for all users</li>
                    <li>Provide valid PAN card and Aadhar card details</li>
                    <li>Bank account verification required for transactions</li>
                    <li>Identity verification through government-issued documents</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Comply with all applicable laws and regulations</li>
                <li>Provide accurate and truthful information</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Respect other users' rights and privacy</li>
                <li>Report any suspicious or fraudulent activity</li>
                <li>Keep your contact information updated</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the platform's functionality</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Upload or transmit viruses, malware, or harmful code</li>
                <li>Impersonate another person or entity</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Violate any intellectual property rights</li>
                <li>Spam or send unsolicited communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Transactions and Payments</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">6.1 Payment Terms</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All transactions are processed securely through our payment gateway</li>
                    <li>Payment must be made in advance for all services</li>
                    <li>We accept various payment methods including UPI, cards, and net banking</li>
                    <li>Transaction fees may apply as per our fee structure</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">6.2 Pricing and Fees</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Service fees are clearly displayed before transaction</li>
                    <li>Prices may be subject to change with prior notice</li>
                    <li>All prices are inclusive of applicable taxes</li>
                    <li>Refund policy applies as per our cancellation terms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The platform and its original content, features, and functionality are owned by Chakravega Technologies Private Limited 
                and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">8.1 Service Availability</h3>
                  <p className="text-gray-700">
                    We strive to maintain 24/7 service availability but cannot guarantee uninterrupted access. 
                    We reserve the right to modify or discontinue the service at any time.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">8.2 Third-Party Content</h3>
                  <p className="text-gray-700">
                    We are not responsible for third-party content, services, or websites linked to our platform. 
                    Use of such content is at your own risk.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Chakravega Technologies Private Limited shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to loss of profits, 
                data, or other intangible losses resulting from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to defend, indemnify, and hold harmless Chakravega Technologies Private Limited and its officers, 
                directors, employees, and agents from and against any claims, damages, obligations, losses, 
                liabilities, costs, or debt, and expenses (including attorney's fees).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the platform immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of India. Any disputes arising from 
                these terms shall be subject to the exclusive jurisdiction of the courts in Jharkhand, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Company:</strong> Chakravega Technologies Private Limited</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> jhariawatch@chakravega.com | kamleshsamudih@gmail.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 7209213003 | +91 8969445367</p>
                <p className="text-gray-700"><strong>Address:</strong> Samudih, Patra Khurd, Jhargara, Palamau, Jharkhand | Operational: Dhanbad, BIT Sindri, Jharkhand</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
