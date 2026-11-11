/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Institutional License Payment Checkout Page
 * Supports MPESA, EFT / Ozow, Bank Transfer / Wire, and Google Pay
 * with multi-currency conversion for African and international institutions.
 */

import React, { useState } from 'react';

type PaymentMethodType = 'mpesa' | 'eft' | 'bank_transfer' | 'google_pay';
type CurrencyType = 'USD' | 'ZAR' | 'KES' | 'NGN';

interface InstitutionalPaymentPageProps {
  onNavigate: (view: string) => void;
  onPaymentSuccess?: () => void;
}

export const InstitutionalPaymentPage: React.FC<InstitutionalPaymentPageProps> = ({
  onNavigate,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('mpesa');
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [candidateScale, setCandidateScale] = useState<'1000' | '2500' | '5000'>('1000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Form details
  const [institutionName, setInstitutionName] = useState('University of Nairobi Faculty of Science');
  const [billingContact, setBillingContact] = useState('Dr. J. Mwangi');
  const [billingEmail, setBillingEmail] = useState('procurement@uonbi.ac.ke');
  const [mpesaPhone, setMpesaPhone] = useState('+254 712 345 678');
  const [bankReference, setBankReference] = useState('');

  // Currency pricing calculations
  const basePriceUsd = candidateScale === '1000' ? 3500 : candidateScale === '2500' ? 7500 : 12000;
  const currencyRates: Record<CurrencyType, { rate: number; symbol: string; prefix: string }> = {
    USD: { rate: 1, symbol: '$', prefix: 'USD' },
    ZAR: { rate: 18.5, symbol: 'R', prefix: 'ZAR' },
    KES: { rate: 130, symbol: 'KSh', prefix: 'KES' },
    NGN: { rate: 1550, symbol: '₦', prefix: 'NGN' },
  };

  const calculatedAmount = Math.round(basePriceUsd * currencyRates[currency].rate);
  const formattedPrice = `${currencyRates[currency].symbol} ${calculatedAmount.toLocaleString()}`;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 1800);
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 max-w-6xl mx-auto space-y-10 text-slate-100">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('commercial_b2b')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>← Back to Institutional Licensing</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono font-semibold">
          SECURE ENTERPRISE CHECKOUT
        </span>
      </div>

      {/* Page Title */}
      <div className="space-y-3 text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Deploy Institutional License
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Provision your university cohort or corporate talent console. Complete payment via MPESA, EFT, Bank Wire, or Google Pay with statutory tax invoicing.
        </p>
      </div>

      {paymentCompleted ? (
        <div className="bg-slate-900 rounded-3xl p-10 sm:p-14 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-teal-400/20 text-teal-300 text-3xl font-bold flex items-center justify-center mx-auto">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">License Successfully Provisioned!</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your institutional access credentials and tax invoice have been dispatched to <strong className="text-white">{billingEmail}</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl text-xs font-mono text-left text-slate-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Institution:</span>
              <span className="text-white">{institutionName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tier:</span>
              <span className="text-teal-400">{candidateScale} Candidate Assessment Pool</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="text-white font-bold">{formattedPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Channel:</span>
              <span className="uppercase text-teal-300">{selectedMethod.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="text-slate-400">VTG-TX-{Date.now().toString().slice(-8)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('institutional')}
              className="px-8 py-3.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md"
            >
              Enter Institutional Console Now →
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Payment Methods and Form */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-teal-400 font-bold block mb-1">STEP 01</span>
              <h2 className="text-lg font-bold text-white">Select Enterprise Payment Method</h2>
              <p className="text-xs text-slate-400 mt-0.5">Compliant with regional Central Bank settlement networks</p>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* MPESA */}
              <button
                type="button"
                onClick={() => setSelectedMethod('mpesa')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all ${
                  selectedMethod === 'mpesa'
                    ? 'bg-slate-900 ring-2 ring-emerald-400 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="h-6 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/M-pesa-logo_a0e3823e.png"
                    alt="M-Pesa"
                    className="h-6 w-auto object-contain rounded-sm"
                  />
                </div>
                <span className="text-xs font-bold font-mono">M-PESA</span>
                <span className="text-[10px] text-slate-500">STK Push</span>
              </button>

              {/* EFT / Ozow */}
              <button
                type="button"
                onClick={() => setSelectedMethod('eft')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all ${
                  selectedMethod === 'eft'
                    ? 'bg-teal-950/60 ring-2 ring-teal-400 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xl">⚡</span>
                <span className="text-xs font-bold font-mono">EFT / Ozow</span>
                <span className="text-[10px] text-slate-500">Instant Debit</span>
              </button>

              {/* Bank Transfer / Wire */}
              <button
                type="button"
                onClick={() => setSelectedMethod('bank_transfer')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all ${
                  selectedMethod === 'bank_transfer'
                    ? 'bg-cyan-950/60 ring-2 ring-cyan-400 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xl">🏛️</span>
                <span className="text-xs font-bold font-mono">Bank Wire</span>
                <span className="text-[10px] text-slate-500">SWIFT / ACH</span>
              </button>

              {/* Google Pay */}
              <button
                type="button"
                onClick={() => setSelectedMethod('google_pay')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all ${
                  selectedMethod === 'google_pay'
                    ? 'bg-slate-900 ring-2 ring-teal-400 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 204"
                    className="h-5 w-auto"
                    aria-label="Google Pay"
                  >
                    <title>google-pay</title>
                    <path
                      fill="#5f6368"
                      d="M362.927 55.057c14.075 0 24.952 3.839 33.27 11.517c8.317 7.677 12.155 17.914 12.155 30.71v61.42h-17.914V144.63h-.64c-7.677 11.517-18.554 17.275-31.35 17.275c-10.877 0-20.474-3.2-28.151-9.597c-7.038-6.398-11.517-15.355-11.517-24.952q0-15.356 11.517-24.953c7.677-6.398 18.554-8.957 31.35-8.957c11.516 0 20.474 1.92 27.511 6.398v-4.478c0-5.972-2.229-11.943-6.688-15.834l-.99-.801c-5.118-4.479-11.516-7.038-18.553-7.038q-16.315 0-24.953 13.436L321.34 74.89c10.236-13.436 23.672-19.834 41.587-19.834M272.715 11.55c11.48 0 22.39 3.995 31.113 11.445l1.517 1.35c8.957 7.678 13.435 19.195 13.435 31.351s-4.478 23.033-13.435 31.35s-19.834 12.796-32.63 12.796l-30.71-.64v59.502H222.81V11.55zm92.77 97.25q-11.516 0-19.193 5.758q-7.678 4.798-7.678 13.435c0 5.119 2.56 9.597 6.398 12.157c4.479 3.199 9.597 5.118 14.716 5.118c7.165 0 14.331-2.787 19.936-7.84l1.177-1.117c6.398-5.758 9.597-12.796 9.597-20.474c-5.758-4.478-14.076-7.038-24.952-7.038m-91.49-79.336h-31.99V80.65h31.99c7.037 0 14.075-2.559 18.554-7.677c10.236-9.597 10.236-25.592.64-35.19l-.64-.64c-5.119-5.118-11.517-8.317-18.555-7.677M512 58.256l-63.34 145.235h-19.194l23.672-50.544l-41.587-94.051h20.474l30.07 72.297h.64l29.431-72.297H512z"
                    />
                    <path
                      fill="#4285f4"
                      d="M165.868 86.407c0-5.758-.64-11.516-1.28-17.274H84.615v32.63h45.425c-1.919 10.236-7.677 19.833-16.634 25.592v21.113h27.511c15.995-14.715 24.952-36.469 24.952-62.06"
                    />
                    <path
                      fill="#34a853"
                      d="M84.614 168.942c23.032 0 42.226-7.678 56.302-20.474l-27.511-21.113c-7.678 5.118-17.275 8.317-28.791 8.317c-21.754 0-40.948-14.715-47.346-35.189H9.118v21.753c14.715 28.791 43.506 46.706 75.496 46.706"
                    />
                    <path
                      fill="#fbbc04"
                      d="M37.268 100.483c-3.838-10.237-3.838-21.753 0-32.63V46.1H9.118c-12.157 23.673-12.157 51.824 0 76.136z"
                    />
                    <path
                      fill="#ea4335"
                      d="M84.614 33.304c12.156 0 23.672 4.479 32.63 12.796l24.312-24.312C126.2 7.712 105.727-.605 85.253.034c-31.99 0-61.42 17.915-75.496 46.706l28.151 21.753c5.758-20.474 24.952-35.189 46.706-35.189"
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold font-mono">Google Pay</span>
                <span className="text-[10px] text-slate-500">1-Click Pay</span>
              </button>
            </div>

            {/* Method-Specific Input Fields */}
            <form onSubmit={handlePay} className="space-y-4 pt-2">
              <div className="border-t border-slate-800 pt-4">
                <span className="text-xs font-mono text-teal-400 font-bold block mb-1">STEP 02</span>
                <h3 className="text-sm font-bold text-white mb-3">Institutional & Billing Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">University / Enterprise Name</label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Procurement Billing Email</label>
                  <input
                    type="email"
                    required
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              {/* Dynamic Method Details */}
              {selectedMethod === 'mpesa' && (
                <div className="p-4 bg-slate-950/80 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/aistudio/M-pesa-logo_a0e3823e.png"
                      alt="M-Pesa"
                      className="h-6 w-auto object-contain rounded-sm"
                    />
                    <span className="text-white font-bold text-xs">M-PESA Express STK Push</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      M-Pesa Registered Mobile Number (+254 / +255 / +256 / +27)
                    </label>
                    <input
                      type="tel"
                      required
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="+254 712 345 678"
                      className="w-full bg-slate-950 text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      An STK PIN prompt for {formattedPrice} will be pushed to your mobile device immediately.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === 'eft' && (
                <div className="p-4 bg-teal-950/20 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400 font-bold text-xs">Ozow / South African Instant EFT</span>
                    <span className="text-[10px] text-slate-400">SARB Regulated</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-xl">Standard Bank</div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">First National Bank (FNB)</div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">Absa Bank</div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">Nedbank / Capitec</div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    You will authenticate directly with your institution&apos;s corporate banking portal with zero card fees.
                  </p>
                </div>
              )}

              {selectedMethod === 'bank_transfer' && (
                <div className="p-4 bg-cyan-950/20 rounded-2xl space-y-2.5 text-xs">
                  <span className="text-cyan-400 font-bold block">Institutional Wire & Electronic Funds Transfer</span>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 font-mono text-[11px] text-slate-300">
                    <div><span className="text-slate-500">Bank:</span> Standard Chartered Commercial Bank</div>
                    <div><span className="text-slate-500">Beneficiary:</span> Vantage Psychometric Systems Ltd</div>
                    <div><span className="text-slate-500">SWIFT / BIC:</span> SCBLKENX001</div>
                    <div><span className="text-slate-500">Account No (Multi-Currency):</span> 0108 5549 2001</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Purchase Order / Bank Transaction Reference
                    </label>
                    <input
                      type="text"
                      required
                      value={bankReference}
                      onChange={(e) => setBankReference(e.target.value)}
                      placeholder="PO-2026-VANTAGE-789"
                      className="w-full bg-slate-950 text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'google_pay' && (
                <div className="p-4 bg-slate-950/80 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 204"
                      className="h-6 w-auto"
                      aria-label="Google Pay"
                    >
                      <title>google-pay</title>
                      <path
                        fill="#5f6368"
                        d="M362.927 55.057c14.075 0 24.952 3.839 33.27 11.517c8.317 7.677 12.155 17.914 12.155 30.71v61.42h-17.914V144.63h-.64c-7.677 11.517-18.554 17.275-31.35 17.275c-10.877 0-20.474-3.2-28.151-9.597c-7.038-6.398-11.517-15.355-11.517-24.952q0-15.356 11.517-24.953c7.677-6.398 18.554-8.957 31.35-8.957c11.516 0 20.474 1.92 27.511 6.398v-4.478c0-5.972-2.229-11.943-6.688-15.834l-.99-.801c-5.118-4.479-11.516-7.038-18.553-7.038q-16.315 0-24.953 13.436L321.34 74.89c10.236-13.436 23.672-19.834 41.587-19.834M272.715 11.55c11.48 0 22.39 3.995 31.113 11.445l1.517 1.35c8.957 7.678 13.435 19.195 13.435 31.351s-4.478 23.033-13.435 31.35s-19.834 12.796-32.63 12.796l-30.71-.64v59.502H222.81V11.55zm92.77 97.25q-11.516 0-19.193 5.758q-7.678 4.798-7.678 13.435c0 5.119 2.56 9.597 6.398 12.157c4.479 3.199 9.597 5.118 14.716 5.118c7.165 0 14.331-2.787 19.936-7.84l1.177-1.117c6.398-5.758 9.597-12.796 9.597-20.474c-5.758-4.478-14.076-7.038-24.952-7.038m-91.49-79.336h-31.99V80.65h31.99c7.037 0 14.075-2.559 18.554-7.677c10.236-9.597 10.236-25.592.64-35.19l-.64-.64c-5.119-5.118-11.517-8.317-18.555-7.677M512 58.256l-63.34 145.235h-19.194l23.672-50.544l-41.587-94.051h20.474l30.07 72.297h.64l29.431-72.297H512z"
                      />
                      <path
                        fill="#4285f4"
                        d="M165.868 86.407c0-5.758-.64-11.516-1.28-17.274H84.615v32.63h45.425c-1.919 10.236-7.677 19.833-16.634 25.592v21.113h27.511c15.995-14.715 24.952-36.469 24.952-62.06"
                      />
                      <path
                        fill="#34a853"
                        d="M84.614 168.942c23.032 0 42.226-7.678 56.302-20.474l-27.511-21.113c-7.678 5.118-17.275 8.317-28.791 8.317c-21.754 0-40.948-14.715-47.346-35.189H9.118v21.753c14.715 28.791 43.506 46.706 75.496 46.706"
                      />
                      <path
                        fill="#fbbc04"
                        d="M37.268 100.483c-3.838-10.237-3.838-21.753 0-32.63V46.1H9.118c-12.157 23.673-12.157 51.824 0 76.136z"
                      />
                      <path
                        fill="#ea4335"
                        d="M84.614 33.304c12.156 0 23.672 4.479 32.63 12.796l24.312-24.312C126.2 7.712 105.727-.605 85.253.034c-31.99 0-61.42 17.915-75.496 46.706l28.151 21.753c5.758-20.474 24.952-35.189 46.706-35.189"
                      />
                    </svg>
                    <span className="text-white font-semibold text-xs">Instant Biometric Authorization</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    One-touch encrypted biometric payment using your Google Enterprise account or corporate card on file.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-lg active:scale-[0.99] text-center disabled:opacity-50"
              >
                {isProcessing ? 'Authorizing Payment Channel...' : `Authorize & Deploy License (${formattedPrice})`}
              </button>
            </form>
          </div>

          {/* Order Summary Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-teal-400 font-bold uppercase">License Summary</span>
                {/* Currency Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg">
                  {(['USD', 'ZAR', 'KES', 'NGN'] as CurrencyType[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded font-bold transition-colors ${
                        currency === c ? 'bg-teal-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">Campus & HR License</h3>
                    <p className="text-xs text-slate-400">Annual recurring enterprise subscription</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white font-mono">{formattedPrice}</span>
                    <span className="block text-[10px] text-slate-500">per annum</span>
                  </div>
                </div>

                {/* Candidate Scale Option */}
                <div className="pt-2">
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Candidate Pool Scale</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['1000', '2500', '5000'] as const).map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setCandidateScale(scale)}
                        className={`p-2 rounded-xl text-center text-xs font-mono transition-all ${
                          candidateScale === scale
                            ? 'bg-teal-400 text-slate-950 font-bold shadow-sm'
                            : 'bg-slate-950 text-slate-300 hover:text-white'
                        }`}
                      >
                        {scale} Seats
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Cohort Skills-Gap Analytics & Heatmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Automated Cut-Off Stens & Recruitment Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Sub-Saharan Norm Group Comparisons</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400">✓</span>
                  <span>Canvas / Moodle / Blackboard LMS Connectors</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-3xl p-6 text-xs text-slate-400 space-y-2">
              <strong className="text-white block">Payment Security & Statutory Protection</strong>
              <p className="leading-relaxed">
                All transactions are encrypted with 256-bit TLS and processed via PCI-DSS Level 1 compliant settlement gateways with automatic VAT / tax invoicing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
