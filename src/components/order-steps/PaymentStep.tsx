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
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-sm text-gray-600">Total Pembayaran</p>
        </div>
        <p className="text-4xl font-bold text-primary-600 tracking-tight">
          Rp {order.total_price?.toLocaleString()}
        </p>
      </div>

      {/* Payment Instructions */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 mb-4">
              Instruksi Pembayaran
            </p>

            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-semibold">1.</span>
                <span>Transfer ke salah satu rekening berikut:</span>
              </li>
            </ol>

            {/* Bank Accounts */}
            <div className="mt-4 space-y-3">
              {settings?.bank_name && settings?.bank_account && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      {settings.bank_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl text-gray-900 tracking-wide">
                        {settings.bank_account}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        a.n. {settings.bank_holder}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(settings.bank_account, "account1")
                      }
                      className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
                    >
                      {copied === "account1" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {settings?.bank_name_2 && settings?.bank_account_2 && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      {settings.bank_name_2}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl text-gray-900 tracking-wide">
                        {settings.bank_account_2}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        a.n. {settings.bank_holder_2}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(settings.bank_account_2, "account2")
                      }
                      className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
                    >
                      {copied === "account2" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!settings?.bank_name && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    Info rekening belum diatur oleh admin. Silakan hubungi admin.
                  </p>
                </div>
              )}
            </div>

            <ol className="text-sm text-gray-600 space-y-2 mt-4" start={2}>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-semibold">2.</span>
                <span>
                  Transfer{" "}
                  <strong className="text-gray-900">sesuai nominal</strong> di
                  atas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-semibold">3.</span>
                <span>Upload bukti transfer di bawah ini</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-semibold">4.</span>
                <span>Tunggu verifikasi dari admin</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <p className="font-semibold text-gray-900 mb-4">
          Upload Bukti Pembayaran
        </p>

        {preview ? (
          <div className="relative group animate-scale-in">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-xl object-cover max-h-64 border border-gray-200"
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
            className="w-full h-52 border-2 border-dashed border-gray-300 rounded-xl 
                       flex flex-col items-center justify-center gap-3
                       text-gray-500 hover:border-primary-400 hover:text-primary-600
                       transition-all duration-300 group"
          >
            <div
              className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center
                            group-hover:bg-primary-100 transition-colors"
            >
              <Camera className="w-8 h-8 transition-transform group-hover:scale-110" />
            </div>
            <div className="text-center">
              <p className="font-medium">Ambil foto atau pilih gambar</p>
              <p className="text-xs text-gray-400 mt-1">Maksimal 5MB</p>
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
      <div
        className="card bg-gray-50 animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <p className="font-medium text-gray-700">Tips:</p>
        </div>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary-600">•</span>
            <span>Pastikan bukti transfer terlihat jelas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">•</span>
            <span>Pastikan nominal transfer terlihat</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">•</span>
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
