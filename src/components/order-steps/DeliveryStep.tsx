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
import "dayjs/locale/id";
import PrintDeliveryNoteTemplate from "@/components/print/PrintDeliveryNoteTemplate";

// Set Indonesian locale
dayjs.locale("id");

interface DeliveryStepProps {
  deliveryNote: any;
  order: any;
}

export default function DeliveryStep({
  deliveryNote,
  order,
}: DeliveryStepProps) {
  const handlePrint = () => {
    window.print();
  };

  // Get delivery note data - prefer order data first (faster), then deliveryNote
  const noteNumber = order?.delivery_note_number || deliveryNote?.note_number || "-";
  const noteDate = order?.delivery_note_at || deliveryNote?.created_at;

  // Get products from items or single product
  const getProductsDisplay = () => {
    // First check order items
    if (order?.items && order.items.length > 0) {
      return order.items.map((item: any) => ({
        name: item.product_name || item.product?.name,
        qty: item.quantity,
        unit: item.unit || "pcs",
      }));
    }
    // Then check deliveryNote items
    if (deliveryNote?.items && deliveryNote.items.length > 0) {
      return deliveryNote.items.map((item: any) => ({
        name: item.product_name,
        qty: item.quantity,
        unit: item.unit || "pcs",
      }));
    }
    // Fallback to legacy single product
    return [
      {
        name: deliveryNote?.product_name || order?.product?.name || "-",
        qty: deliveryNote?.product_qty || order?.quantity || 0,
        unit: deliveryNote?.product_unit || order?.product?.unit || "pcs",
      },
    ];
  };

  const products = getProductsDisplay();

  return (
    <>
      {/* Print Template - Only visible when printing */}
      <PrintDeliveryNoteTemplate order={order} deliveryNote={deliveryNote} />

      {/* UI Component - Hidden when printing */}
      <div className="space-y-4 animate-fade-in no-print">
        {/* Success Banner */}
        <div className="card bg-green-50 border-green-200 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Selesai!</h3>
          <p className="text-gray-600">Barang telah selesai dimuat</p>
        </div>

        {/* Delivery Note Card */}
        <div className="card overflow-hidden" style={{ animationDelay: "0.1s" }}>
          {/* Header */}
          <div className="bg-primary-600 p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl text-white tracking-tight">
                SURAT JALAN
              </h3>
            </div>
            <p className="text-sm text-white/80">LabaLaba Nusantara</p>
          </div>

          {/* Note Number */}
          <div className="p-6 text-center bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Nomor Surat Jalan
            </p>
            <p className="text-3xl font-bold text-primary-600 tracking-tight">
              {noteNumber}
            </p>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Date */}
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Tanggal Diterbitkan</p>
                <p className="font-semibold text-gray-900">
                  {noteDate
                    ? dayjs(noteDate).format("DD MMMM YYYY, HH:mm")
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              {/* Sales */}
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors flex-1">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Sales</p>
                  <p className="font-semibold text-gray-900">
                    {deliveryNote?.sales_name || order?.sales?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {deliveryNote?.sales_phone || order?.sales?.phone}
                  </p>
                </div>
              </div>
              {/* Driver */}
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors flex-1">
                <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Driver</p>
                  <p className="font-semibold text-gray-900">
                    {deliveryNote?.driver_name || order?.driver_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {deliveryNote?.vehicle_plate || order?.vehicle_plate}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-2">
              {products.map((prod: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      {products.length > 1 ? `Produk ${idx + 1}` : "Produk"}
                    </p>
                    <p className="font-semibold text-gray-900">{prod.name}</p>
                    <p className="text-xs text-gray-400">
                      {prod.qty} {prod.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="card bg-gray-50" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <p className="font-medium text-gray-700">Tips:</p>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Simpan surat jalan sebagai bukti pengiriman</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Tunjukkan surat jalan saat sampai di tujuan</span>
            </li>
          </ul>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Cetak Surat Jalan
        </button>
      </div>
    </>
  );
}
