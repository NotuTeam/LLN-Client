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
import "dayjs/locale/id";
import { useSettings } from "@/hooks/useOrder";
import PrintInvoiceTemplate from "@/components/print/PrintInvoiceTemplate";

// Set Indonesian locale
dayjs.locale("id");

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
    <>
      {/* Print Template - Only visible when printing */}
      <PrintInvoiceTemplate order={order} settings={settings} />

      {/* UI Component - Hidden when printing */}
      <div className="space-y-4 animate-fade-in no-print">
        {/* Order Header Card */}
        <div className="card group hover:shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 tracking-tight">
                  {order.order_number}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {dayjs(order.created_at).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
            {showDownload && (
              <button
                onClick={handlePrint}
                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Printer className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Sales Info Card */}
        <div
          className="card animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">
                {order.sales?.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {order.sales?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products List Card */}
        <div
          className="card animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
            Produk Dipesan
          </p>

          <div className="space-y-4">
            {items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 transition-all duration-200 hover:bg-gray-50 -mx-2 px-2 rounded-xl"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {item.product_name || item.product?.name || "-"}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    x {item.quantity} {item.unit || item.product?.unit || "pcs"}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    Rp {item.unit_price?.toLocaleString()}
                  </p>
                  <p className="font-bold text-gray-900 mt-0.5">
                    Rp {item.subtotal?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-bold text-primary-600">
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
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Info Driver
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nama</p>
                <p className="font-medium text-gray-900">{order.driver_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Telepon</p>
                <p className="font-medium text-gray-900">
                  {order.driver_phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">No. Polisi</p>
                <p className="font-medium text-gray-900">
                  {order.vehicle_plate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
