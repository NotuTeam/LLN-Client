"use client";

import { QrCode, AlertCircle, RefreshCw, Info } from "lucide-react";

interface BarcodeStepProps {
  order: any;
  isFetching: boolean;
  onRefresh: () => void;
}

export default function BarcodeStep({
  order,
  isFetching,
  onRefresh,
}: BarcodeStepProps) {
  const barcode = order.queue_barcode;
  const qrCode = order.queue_qrcode;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Instructions */}
      <div
        className="card bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-yellow-500/20 animate-slide-up"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">
              Tunjukkan QR Code Ini
            </p>
            <p className="text-sm text-text-secondary">
              Mohon tunjukkan QR Code berikut kepada admin untuk dipindai dan
              mendapatkan nomor antrian
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Display */}
      <div
        className="card text-center animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-6">
          QR Code Anda
        </p>

        <div className="bg-text-primary rounded-3xl p-6 mb-6 mx-auto max-w-[280px] shadow-card">
          {qrCode ? (
            <img
              src={qrCode}
              alt="QR Code"
              className="w-48 h-48 mx-auto rounded-2xl animate-scale-in"
            />
          ) : barcode ? (
            <div className="py-4">
              <div className="flex justify-center items-end gap-0.5 mb-4 h-28">
                {barcode.split("").map((char: string, i: number) => (
                  <div
                    key={i}
                    className="bg-accent rounded-sm"
                    style={{
                      width: char.charCodeAt(0) % 2 === 0 ? "4px" : "2px",
                      height: fmtHeight(char),
                      marginRight: "1px",
                    }}
                  />
                ))}
              </div>
              <p className="text-accent font-mono text-lg tracking-[0.3em]">
                {barcode}
              </p>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto flex items-center justify-center">
              <QrCode className="w-20 h-20 text-dark-300" />
            </div>
          )}
        </div>

        {barcode && (
          <div className="inline-flex items-center gap-2 bg-dark-100 px-4 py-2 rounded-full">
            <span className="font-mono text-sm text-text-secondary">
              {barcode}
            </span>
          </div>
        )}

        <p className="text-xs text-text-muted mt-4">
          Tunjukkan kode ini kepada petugas loket
        </p>
      </div>

      {/* Order Info */}
      <div
        className="card animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-cyan/20 rounded-xl flex items-center justify-center">
            <Info className="w-4 h-4 text-cyan" />
          </div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Detail Order
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-dark-50">
            <span className="text-text-secondary">No. Order</span>
            <span className="font-semibold text-text-primary">
              {order.order_number}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dark-50">
            <span className="text-text-secondary">Driver</span>
            <span className="font-semibold text-text-primary">
              {order.driver_name}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">No. Polisi</span>
            <span className="font-semibold text-text-primary">
              {order.vehicle_plate}
            </span>
          </div>
        </div>
      </div>

      {/* Auto Refresh Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-text-muted animate-pulse-soft">
        <RefreshCw
          className={`w-4 h-4 ${isFetching ? "animate-spin text-accent" : ""}`}
        />
        <span>Auto refresh setiap 5 detik</span>
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={onRefresh}
        className="btn-secondary w-full animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
        Cek Status
      </button>
    </div>
  );
}

// Helper function for barcode height
function fmtHeight(char: string): number {
  return (char.charCodeAt(0) % 80) + 40;
}
