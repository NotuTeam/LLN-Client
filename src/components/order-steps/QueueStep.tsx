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
      <div
        className={`relative overflow-hidden rounded-3xl p-8 text-center animate-slide-up ${
          status === "loading"
            ? "bg-gradient-to-br from-orange-500 to-red-500"
            : "bg-gradient-to-br from-accent to-cyan"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-dark-400/70 mb-2 uppercase tracking-wider">
            Nomor Antrian Anda
          </p>
          <p className="text-7xl font-bold text-dark-400 tracking-tight mb-3">
            #{order.queue_number}
          </p>

          {status === "queued" && (
            <div className="flex items-center justify-center gap-2 text-dark-400/80">
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

      {/* Status Info */}
      {status === "queued" && (
        <>
          {/* Orders Ahead */}
          <div
            className="card animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Antrian di depan Anda</p>
                <p className="text-3xl font-bold text-purple-400">
                  {ordersAhead}
                </p>
              </div>
            </div>
          </div>

          {/* Current Loading */}
          {queueData?.is_loading && (
            <div
              className="card bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center animate-pulse-soft">
                  <Truck className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    Sedang Diproses
                  </p>
                  <p className="text-sm text-text-secondary">
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
          className="card bg-gradient-to-br from-accent/10 to-cyan/5 border-accent/20 text-center animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-5 animate-pulse-ring">
            <Truck className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Giliran Anda!
          </h3>
          <p className="text-text-secondary mb-5">
            Silakan menuju lokasi loading untuk proses pemuatan barang
          </p>
          <div className="bg-dark-200/50 rounded-2xl p-4 text-sm">
            <p className="text-text-primary font-medium">
              Menunggu admin menyelesaikan pemuatan...
            </p>
            <p className="text-text-muted text-xs mt-1">
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
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <RefreshCw
            className={`w-4 h-4 ${isFetching ? "animate-spin text-accent" : ""}`}
          />
          <span>Auto refresh setiap 15 detik</span>
        </div>
        <button
          onClick={onRefresh}
          className="text-accent text-sm font-semibold hover:text-accent-light transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Order Info */}
      <div
        className="card animate-slide-up"
        style={{ animationDelay: "0.4s" }}
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
            <span className="text-text-secondary">Produk</span>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-accent" />
              <span className="font-semibold text-text-primary">
                {order.items && order.items.length > 0
                  ? `${order.items.length} item`
                  : `${order.product?.name} (${order.quantity} ${order.product?.unit})`}
              </span>
            </div>
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
    </div>
  );
}
