import React, { useState } from 'react';
import { QrCode, CheckCircle2, Smartphone, Download, X } from 'lucide-react';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitalName: string;
  department: string;
  tokenCode: string;
  estimatedTime?: string;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  hospitalName,
  department,
  tokenCode,
  estimatedTime = '11:20 AM',
}) => {
  const [walletSaved, setWalletSaved] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-[#282f49]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center text-center relative border border-[#e2e8f0]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-[#707881] hover:text-[#131a33] hover:bg-[#f1f5f9] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="h-12 w-12 rounded-full bg-[#6df5e1]/40 text-[#006f64] flex items-center justify-center mb-2">
          <QrCode className="w-6 h-6 text-[#006b5f]" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b5f]">
          JanSEVA Digital Pass Issued
        </span>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#131a33] mt-1">
          {hospitalName}
        </h3>
        <p className="text-xs text-[#3f4850]">{department}</p>

        {/* Pass Box */}
        <div className="my-4 p-4 rounded-xl bg-[#f3f3ff] border border-[#ebedff] flex flex-col items-center w-full">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
            Queue Priority Number
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#006194] my-1 tracking-wider tabular-nums">
            {tokenCode}
          </span>

          {/* Clean High-Contrast QR Pattern */}
          <div className="p-2 bg-white rounded-lg shadow-xs my-2 border border-[#e2e8f0]">
            <svg className="w-28 h-28 text-[#131a33]" fill="currentColor" viewBox="0 0 100 100">
              <rect x="10" y="10" width="25" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="16" y="16" width="13" height="13" />
              <rect x="65" y="10" width="25" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="71" y="16" width="13" height="13" />
              <rect x="10" y="65" width="25" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="16" y="71" width="13" height="13" />
              <rect x="42" y="15" width="16" height="6" />
              <rect x="42" y="30" width="8" height="15" />
              <rect x="58" y="25" width="18" height="8" />
              <rect x="45" y="55" width="10" height="10" />
              <rect x="65" y="50" width="8" height="20" />
              <rect x="78" y="68" width="12" height="18" />
              <rect x="42" y="75" width="16" height="12" />
            </svg>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#3f4850] mt-1">
            <span>
              Est. Consultation: <strong>{estimatedTime}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#006b5f] font-bold">Priority Confirmed</span>
          </div>
          <span className="text-[10px] text-[#707881] mt-1">
            Present this QR at triage check-in counter or room scanner
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-[#ebedff] text-[#131a33] font-semibold text-xs hover:bg-[#dbe1ff] transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={() => setWalletSaved(true)}
            className="flex-1 py-2 rounded-lg bg-[#006194] text-white font-semibold text-xs hover:bg-[#007bb9] transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            {walletSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#6df5e1]" />
                <span>Pass Saved</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span>Save to Wallet</span>
              </>
            )}
          </button>
        </div>

        {walletSaved && (
          <p className="text-[11px] text-[#006b5f] font-medium mt-2 animate-in fade-in">
            ✓ Digital token and turn notifications dispatched to your registered SMS/Wallet.
          </p>
        )}
      </div>
    </div>
  );
};
