"use client";

import {
  Package,
  User,
  Phone,
  Printer,
  Building2,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import { useSettings } from "@/hooks/useOrder";

interface InvoiceStepProps {
  order: any;
  showDownload?: boolean;
}

export default function InvoiceStep({
  order,
  showDownload = false,
}: InvoiceStepProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data;

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get items from order
  const items =
    order.items?.length > 0
      ? order.items
      : [
          {
            product: order.product,
            product_name: order.product?.name,
            quantity: order.quantity,
            unit_price: order.unit_price,
            unit: order.product?.unit,
            subtotal: order.total_price,
          },
        ];

  return (
    <div className="space-y-4 animate-fade-in print:text-black">
      {/* Company Header - Print Only */}
      <div className="hidden print:block mb-6 text-center">
        <h1 className="text-2xl font-bold text-black">LabaLaba Nusantara</h1>
        <p className="text-sm text-gray-600">Invoice</p>
      </div>

      {/* Order Header Card */}
      <div className="card group hover:shadow-card no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary tracking-tight">
                {order.order_number}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {dayjs(order.created_at).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          {showDownload && (
            <button
              onClick={handlePrint}
              className="p-3 hover:bg-dark-50 rounded-2xl transition-all duration-200 active:scale-95"
            >
              <Printer className="w-5 h-5 text-text-secondary" />
            </button>
          )}
        </div>
      </div>

      {/* Sales Info Card */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan/20 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-cyan" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary text-lg">
              {order.sales?.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="w-3.5 h-3.5 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {order.sales?.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products List Card */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-4">
          Produk Dipesan
        </p>

        <div className="space-y-4">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-4 pb-4 border-b border-dark-50 last:border-0 last:pb-0 transition-all duration-200 hover:bg-dark-50/50 -mx-2 px-2 rounded-xl"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary truncate">
                  {item.product_name || item.product?.name || "-"}
                </p>
                <p className="text-sm text-text-secondary mt-0.5">
                  {item.quantity} {item.unit || item.product?.unit || "pcs"}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-text-secondary">
                  Rp {item.unit_price?.toLocaleString()}
                </p>
                <p className="font-bold text-text-primary mt-0.5">
                  Rp {item.subtotal?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-dark-50 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text-secondary">Total</span>
            <span className="text-2xl font-bold text-accent">
              Rp {order.total_price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Driver Info */}
      {order.driver_name && (
        <div
          className="card animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
            Info Driver
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Nama</p>
              <p className="font-medium text-text-primary">
                {order.driver_name}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Telepon</p>
              <p className="font-medium text-text-primary">
                {order.driver_phone}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">No. Polisi</p>
              <p className="font-medium text-text-primary">
                {order.vehicle_plate}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Print Only */}
      <div className="hidden print:block mt-6 text-center text-sm text-gray-500">
        <p>Terima kasih atas kepercayaan Anda</p>
        <p className="mt-4">_______________________</p>
        <p>Tanda Tangan</p>
      </div>
    </div>
  );
}
