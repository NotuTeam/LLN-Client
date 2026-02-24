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
      <div className="card bg-yellow-50 border-yellow-200 animate-slide-up">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="font-semibold text-yellow-800 mb-1">
              Tunjukkan QR Code Ini
            </p>
            <p className="text-sm text-yellow-700">
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
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">
          QR Code Anda
        </p>

        <div className="bg-white rounded-2xl p-6 mb-6 mx-auto max-w-[280px] shadow-md border border-gray-200">
          {qrCode ? (
            <img
              src={qrCode}
              alt="QR Code"
              className="w-48 h-48 mx-auto rounded-xl animate-scale-in"
            />
          ) : barcode ? (
            <div className="py-4">
              <div className="flex justify-center items-end gap-0.5 mb-4 h-28">
                {barcode.split("").map((char: string, i: number) => (
                  <div
                    key={i}
                    className="bg-primary-600 rounded-sm"
                    style={{
                      width: char.charCodeAt(0) % 2 === 0 ? "4px" : "2px",
                      height: `${(char.charCodeAt(0) % 80) + 40}px`,
                      marginRight: "1px",
                    }}
                  />
                ))}
              </div>
              <p className="text-primary-600 font-mono text-lg tracking-[0.3em]">
                {barcode}
              </p>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto flex items-center justify-center">
              <QrCode className="w-20 h-20 text-gray-300" />
            </div>
          )}
        </div>

        {barcode && (
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="font-mono text-sm text-gray-600">{barcode}</span>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Tunjukkan kode ini kepada petugas loket
        </p>
      </div>

      {/* Order Info */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Detail Order
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500">No. Order</span>
            <span className="font-semibold text-gray-900">
              {order.order_number}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-500">Driver</span>
            <span className="font-semibold text-gray-900">
              {order.driver_name}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-500">No. Polisi</span>
            <span className="font-semibold text-gray-900">
              {order.vehicle_plate}
            </span>
          </div>
        </div>
      </div>

      {/* Auto Refresh Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 animate-pulse">
        <RefreshCw
          className={`w-4 h-4 ${isFetching ? "animate-spin text-primary-600" : ""}`}
        />
        <span>Auto refresh setiap 5 detik</span>
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={onRefresh}
        className="btn-secondary w-full animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <RefreshCw
          className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
        />
        Cek Status
      </button>
    </div>
  );
}

// Helper function for barcode height
function fmtHeight(char: string): number {
  return (char.charCodeAt(0) % 80) + 40;
}
