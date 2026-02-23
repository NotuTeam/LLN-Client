"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Loader2,
  AlertCircle,
  Building2,
  Copy,
  Check,
  X,
  Wallet,
  Sparkles,
} from "lucide-react";
import { useSettings } from "@/hooks/useOrder";

interface PaymentStepProps {
  order: any;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

export default function PaymentStep({
  order,
  onSubmit,
  isPending,
}: PaymentStepProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: settingsData } = useSettings();
  const settings = settingsData?.data;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File terlalu besar. Maksimal 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("proof", selectedFile);
    onSubmit(formData);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Order Summary */}
      <div className="card bg-gradient-to-br from-accent/10 to-cyan/5 border-accent/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-accent" />
          </div>
          <p className="text-sm text-text-secondary">Total Pembayaran</p>
        </div>
        <p className="text-4xl font-bold text-accent tracking-tight">
          Rp {order.total_price?.toLocaleString()}
        </p>
      </div>

      {/* Payment Instructions */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-cyan/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-cyan" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary mb-4">
              Instruksi Pembayaran
            </p>

            <ol className="text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-semibold">1.</span>
                <span>Transfer ke salah satu rekening berikut:</span>
              </li>
            </ol>

            {/* Bank Accounts */}
            <div className="mt-4 space-y-3">
              {settings?.bank_name && settings?.bank_account && (
                <div className="bg-dark-200/50 rounded-2xl p-4 border border-dark-50 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-text-secondary" />
                    <span className="font-medium text-text-primary">
                      {settings.bank_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl text-text-primary tracking-wide">
                        {settings.bank_account}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        a.n. {settings.bank_holder}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(settings.bank_account, "account1")
                      }
                      className="p-3 hover:bg-dark-100 rounded-xl transition-all duration-200 active:scale-95"
                    >
                      {copied === "account1" ? (
                        <Check className="w-5 h-5 text-accent" />
                      ) : (
                        <Copy className="w-5 h-5 text-text-secondary" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {settings?.bank_name_2 && settings?.bank_account_2 && (
                <div className="bg-dark-200/50 rounded-2xl p-4 border border-dark-50 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-text-secondary" />
                    <span className="font-medium text-text-primary">
                      {settings.bank_name_2}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl text-text-primary tracking-wide">
                        {settings.bank_account_2}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        a.n. {settings.bank_holder_2}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(settings.bank_account_2, "account2")
                      }
                      className="p-3 hover:bg-dark-100 rounded-xl transition-all duration-200 active:scale-95"
                    >
                      {copied === "account2" ? (
                        <Check className="w-5 h-5 text-accent" />
                      ) : (
                        <Copy className="w-5 h-5 text-text-secondary" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!settings?.bank_name && (
                <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
                  <p className="text-sm text-yellow-400">
                    Info rekening belum diatur oleh admin. Silakan hubungi admin.
                  </p>
                </div>
              )}
            </div>

            <ol className="text-sm text-text-secondary space-y-2 mt-4" start={2}>
              <li className="flex items-start gap-2">
                <span className="text-accent font-semibold">2.</span>
                <span>
                  Transfer <strong className="text-text-primary">sesuai nominal</strong>{" "}
                  di atas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-semibold">3.</span>
                <span>Upload bukti transfer di bawah ini</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-semibold">4.</span>
                <span>Tunggu verifikasi dari admin</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <p className="font-semibold text-text-primary mb-4">
          Upload Bukti Pembayaran
        </p>

        {preview ? (
          <div className="relative group animate-scale-in">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-2xl object-cover max-h-64 border border-dark-50"
            />
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
              }}
              className="absolute top-3 right-3 bg-red-500 text-white p-2.5 rounded-xl 
                         opacity-0 group-hover:opacity-100 transition-all duration-200
                         hover:bg-red-400 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-52 border-2 border-dashed border-dark-50 rounded-3xl 
                       flex flex-col items-center justify-center gap-3
                       text-text-secondary hover:border-accent/50 hover:text-accent
                       transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-dark-100 rounded-2xl flex items-center justify-center
                            group-hover:bg-accent/20 transition-colors">
              <Camera className="w-8 h-8 transition-transform group-hover:scale-110" />
            </div>
            <div className="text-center">
              <p className="font-medium">Ambil foto atau pilih gambar</p>
              <p className="text-xs text-text-muted mt-1">Maksimal 5MB</p>
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Tips */}
      <div className="card bg-dark-200/30 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="font-medium text-text-secondary">Tips:</p>
        </div>
        <ul className="text-sm text-text-muted space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Pastikan bukti transfer terlihat jelas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Pastikan nominal transfer terlihat</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Format: JPG, PNG (maks 5MB)</span>
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isPending}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed
                   animate-slide-up sticky bottom-4"
        style={{ animationDelay: "0.4s" }}
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengupload...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload Bukti Pembayaran
          </>
        )}
      </button>
    </div>
  );
}
