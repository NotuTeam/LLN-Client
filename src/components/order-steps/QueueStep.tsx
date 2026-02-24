"use client";

import { Clock, Users, Truck, RefreshCw, Info, Package } from "lucide-react";

interface QueueStepProps {
  order: any;
  queueData: any;
  isFetching: boolean;
  onRefresh: () => void;
}

export default function QueueStep({
  order,
  queueData,
  isFetching,
  onRefresh,
}: QueueStepProps) {
  const status = order.status;
  const ordersAhead = queueData?.orders_ahead || 0;
  const estimatedWait = queueData?.estimated_wait || "-";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Queue Number */}
      {status === "queued" && (
        <div
          className={`relative overflow-hidden rounded-2xl p-8 text-center animate-slide-up bg-gradient-to-br from-primary-600 to-primary-500`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <p className="text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
              Nomor Antrian Anda
            </p>
            <p className="text-7xl font-bold text-white tracking-tight mb-3">
              #{order.queue_number}
            </p>

            {status === "queued" && (
              <div className="flex items-center justify-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Estimasi: {estimatedWait}</span>
              </div>
            )}

            {status === "loading" && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full py-2.5 px-5 mt-3">
                <Truck className="w-5 h-5 animate-pulse" />
                <span className="font-bold text-white">SEDANG DIMUAT</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Info */}
      {status === "queued" && (
        <>
          {/* Orders Ahead */}
          <div
            className="card animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Antrian di depan Anda</p>
                <p className="text-3xl font-bold text-purple-600">
                  {ordersAhead}
                </p>
              </div>
            </div>
          </div>

          {/* Current Loading */}
          {queueData?.is_loading && (
            <div
              className="card bg-orange-50 border-orange-200 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-orange-800">
                    Sedang Diproses
                  </p>
                  <p className="text-sm text-orange-600">
                    Antrian #{queueData?.current_loading?.queue_number} sedang
                    dimuat
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Loading Status */}
      {status === "loading" && (
        <div
          className="card bg-green-50 border-green-200 text-center animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Truck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Giliran Anda!
          </h3>
          <p className="text-gray-600 mb-5">
            Silakan menuju lokasi loading untuk proses pemuatan barang
          </p>
          <div className="bg-white rounded-xl p-4 text-sm border border-gray-200">
            <p className="text-gray-800 font-medium">
              Menunggu admin menyelesaikan pemuatan...
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Halaman akan otomatis update
            </p>
          </div>
        </div>
      )}

      {/* Auto Refresh Notice */}
      <div
        className="card flex items-center justify-between animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <RefreshCw
            className={`w-4 h-4 ${
              isFetching ? "animate-spin text-primary-600" : ""
            }`}
          />
          <span>Auto refresh setiap 15 detik</span>
        </div>
        <button
          onClick={onRefresh}
          className="text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Order Info */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.4s" }}>
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
            <span className="text-gray-500">Produk</span>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary-600" />
              <span className="font-semibold text-gray-900">
                {order.items && order.items.length > 0
                  ? `${order.items.length} item`
                  : `${order.product?.name} (${order.quantity} ${order.product?.unit})`}
              </span>
            </div>
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
    </div>
  );
}
