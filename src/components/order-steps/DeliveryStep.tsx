"use client";

import {
  FileText,
  User,
  Car,
  Package,
  Printer,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import dayjs from "dayjs";

interface DeliveryStepProps {
  deliveryNote: any;
  order: any;
}

export default function DeliveryStep({ deliveryNote, order }: DeliveryStepProps) {
  const handlePrint = () => {
    window.print();
  };

  // Get products from items or single product
  const getProductsDisplay = () => {
    if (order?.items && order.items.length > 0) {
      return order.items.map((item: any) => ({
        name: item.product_name || item.product?.name,
        qty: item.quantity,
        unit: item.unit || "pcs",
      }));
    }
    return [{
      name: deliveryNote?.product_name || order?.product?.name || "-",
      qty: deliveryNote?.product_qty || order?.quantity || 0,
      unit: deliveryNote?.product_unit || order?.product?.unit || "pcs",
    }];
  };

  const products = getProductsDisplay();

  return (
    <div className="space-y-4 animate-fade-in print:p-4 print:bg-white print:text-black">
      {/* Success Banner */}
      <div className="card bg-gradient-to-br from-accent/10 to-cyan/5 border-accent/20 text-center no-print animate-slide-up">
        <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-5 animate-bounce-soft">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Order Selesai!
        </h3>
        <p className="text-text-secondary">Barang telah selesai dimuat</p>
      </div>

      {/* Delivery Note Card */}
      <div
        className="card overflow-hidden animate-slide-up print:border-gray-400"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-cyan p-6 text-center print:bg-gray-800">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-dark-400" />
            </div>
            <h3 className="font-bold text-xl text-dark-400 tracking-tight">
              SURAT JALAN
            </h3>
          </div>
          <p className="text-sm text-dark-400/70">LabaLaba Nusantara</p>
        </div>

        {/* Note Number */}
        <div className="p-6 text-center bg-dark-200/30 border-b border-dark-50">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            Nomor Surat Jalan
          </p>
          <p className="text-3xl font-bold text-accent tracking-tight">
            {deliveryNote?.note_number || "-"}
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Date */}
          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-dark-50/50 transition-colors">
            <div className="w-11 h-11 bg-accent/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Tanggal</p>
              <p className="font-semibold text-text-primary">
                {dayjs(deliveryNote?.created_at).format("DD MMMM YYYY, HH:mm")}
              </p>
            </div>
          </div>

          {/* Sales */}
          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-dark-50/50 transition-colors">
            <div className="w-11 h-11 bg-cyan/10 rounded-2xl flex items-center justify-center">
              <User className="w-5 h-5 text-cyan" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-secondary">Sales</p>
              <p className="font-semibold text-text-primary">
                {deliveryNote?.sales_name || order?.sales?.name}
              </p>
              <p className="text-xs text-text-muted">
                {deliveryNote?.sales_phone || order?.sales?.phone}
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-2">
            {products.map((prod: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-dark-50/50 transition-colors"
              >
                <div className="w-11 h-11 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">
                    {products.length > 1 ? `Produk ${idx + 1}` : "Produk"}
                  </p>
                  <p className="font-semibold text-text-primary">{prod.name}</p>
                  <p className="text-xs text-text-muted">
                    {prod.qty} {prod.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Driver */}
          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-dark-50/50 transition-colors">
            <div className="w-11 h-11 bg-orange-500/10 rounded-2xl flex items-center justify-center">
              <Car className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-secondary">Driver</p>
              <p className="font-semibold text-text-primary">
                {deliveryNote?.driver_name || order?.driver_name}
              </p>
              <p className="text-xs text-text-muted">
                {deliveryNote?.vehicle_plate || order?.vehicle_plate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div
        className="card bg-dark-200/30 animate-slide-up no-print"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="font-medium text-text-secondary">Tips:</p>
        </div>
        <ul className="text-sm text-text-muted space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Simpan surat jalan sebagai bukti pengiriman</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Tunjukkan surat jalan saat sampai di tujuan</span>
          </li>
        </ul>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="btn-secondary w-full no-print animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Printer className="w-5 h-5" />
        Cetak Surat Jalan
      </button>
    </div>
  );
}
