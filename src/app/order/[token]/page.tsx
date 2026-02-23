"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MobileLayout from "@/components/MobileLayout";
import { useInvoice, useQueueStatus, useDeliveryNote } from "@/hooks/useOrder";
import { CheckCircle, RefreshCw } from "lucide-react";

// Step Components
import InvoiceStep from "@/components/order-steps/InvoiceStep";
import PaymentStep from "@/components/order-steps/PaymentStep";
import DriverStep from "@/components/order-steps/DriverStep";
import BarcodeStep from "@/components/order-steps/BarcodeStep";
import QueueStep from "@/components/order-steps/QueueStep";
import DeliveryStep from "@/components/order-steps/DeliveryStep";

// API hooks
import AxiosClient from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: {
    label: "Menunggu Pembayaran",
    color: "bg-yellow-500/20 text-yellow-400",
  },
  paid: { label: "Menunggu Verifikasi", color: "bg-blue-500/20 text-blue-400" },
  confirmed: {
    label: "Pembayaran Diverifikasi",
    color: "bg-green-500/20 text-green-400",
  },
  queued: { label: "Dalam Antrian", color: "bg-purple-500/20 text-purple-400" },
  loading: { label: "Sedang Dimuat", color: "bg-orange-500/20 text-orange-400" },
  completed: { label: "Selesai", color: "bg-accent/20 text-accent" },
};

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const queryClient = useQueryClient();

  const [showTransition, setShowTransition] = useState<string | null>(null);
  const [refetchInterval, setRefetchInterval] = useState<number | undefined>(undefined);

  // Main order data
  const { data, isLoading, error, refetch, isFetching } = useInvoice(token, {
    refetchInterval: refetchInterval,
  });
  const order = data?.data;

  // Update refetch interval based on order status
  useEffect(() => {
    if (!order) {
      setRefetchInterval(undefined);
      return;
    }

    switch (order.status) {
      case "paid":
        setRefetchInterval(10000); // 10 seconds - waiting for verification
        break;
      case "confirmed":
        if (order.driver_name && !order.queue_number) {
          setRefetchInterval(5000); // 5 seconds - waiting for barcode scan
        } else {
          setRefetchInterval(undefined);
        }
        break;
      case "queued":
        setRefetchInterval(15000); // 15 seconds - waiting to be called
        break;
      case "loading":
        setRefetchInterval(10000); // 10 seconds - waiting for loading to complete
        break;
      default:
        setRefetchInterval(undefined);
    }
  }, [order?.status, order?.driver_name, order?.queue_number]);

  // Queue data (for queued/loading status)
  const {
    data: queueData,
    refetch: refetchQueue,
    isFetching: fetchingQueue,
  } = useQueueStatus(token, {
    refetchInterval:
      order && (order.status === "queued" || order.status === "loading")
        ? 15000
        : undefined,
  });

  // Delivery data - fetch when loading or completed
  const { data: deliveryData, refetch: refetchDelivery } = useDeliveryNote(token, {
    refetchInterval:
      order && (order.status === "loading" || order.status === "completed")
        ? 10000
        : undefined,
  });

  // Payment upload mutation
  const uploadPayment = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await AxiosClient.api.post(
        `/client/payment/${token}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      setShowTransition("payment_uploaded");
      queryClient.invalidateQueries({ queryKey: ["invoice", token] });
      setTimeout(() => {
        setShowTransition(null);
        refetch();
      }, 2000);
    },
  });

  // Driver data mutation
  const submitDriver = useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosClient.post(`/client/driver/${token}`, {
        driver_name: data.driver_name,
        driver_phone: data.driver_phone,
        vehicle_plate: data.vehicle_plate,
      });
      // Upload photo if provided
      if (data.vehiclePhoto) {
        const formData = new FormData();
        formData.append("photo", data.vehiclePhoto);
        await AxiosClient.api.post(`/client/driver/${token}/photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      return response.data;
    },
    onSuccess: () => {
      setShowTransition("driver_saved");
      queryClient.invalidateQueries({ queryKey: ["invoice", token] });
      setTimeout(() => {
        setShowTransition(null);
        refetch();
      }, 2000);
    },
  });

  // Determine current step
  const getCurrentStep = () => {
    if (!order) return { step: 0, total: 5, title: "Loading" };

    if (order.status === "pending") {
      return { step: 1, total: 5, title: "Invoice" };
    } else if (order.status === "paid") {
      return { step: 2, total: 5, title: "Menunggu Verifikasi" };
    } else if (order.status === "confirmed") {
      if (!order.driver_name) {
        return { step: 3, total: 5, title: "Isi Data Driver" };
      }
      if (!order.queue_number) {
        return { step: 4, total: 5, title: "Barcode Antrian" };
      }
      return { step: 4, total: 5, title: "Antrian" };
    } else if (order.status === "queued" || order.status === "loading") {
      return { step: 4, total: 5, title: "Antrian" };
    } else if (order.status === "completed") {
      return { step: 5, total: 5, title: "Surat Jalan" };
    }

    return { step: 1, total: 5, title: "Invoice" };
  };

  const stepInfo = getCurrentStep();
  const status = order
    ? statusConfig[order.status] || {
        label: order.status,
        color: "bg-gray-100 text-gray-700",
      }
    : null;

  // Handle transitions
  const [hasShownLoadingTransition, setHasShownLoadingTransition] = useState(false);

  useEffect(() => {
    if (!order) return;

    // Transition to delivery when completed (only once)
    if (order.status === "completed" && !showTransition && !hasShownLoadingTransition) {
      setShowTransition("loading_completed");
      setHasShownLoadingTransition(true);
      setTimeout(() => setShowTransition(null), 2000);
    }
  }, [order?.status, showTransition, hasShownLoadingTransition]);

  // Reset transition flag when order changes
  useEffect(() => {
    setHasShownLoadingTransition(false);
  }, [order?.id]);

  // Loading state
  if (isLoading) {
    return (
      <MobileLayout>
        <div className="space-y-4 animate-fade-in">
          <div className="skeleton h-32"></div>
          <div className="skeleton h-24"></div>
          <div className="skeleton h-24"></div>
        </div>
      </MobileLayout>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <MobileLayout>
        <div className="text-center py-16 animate-fade-in">
          <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">❌</span>
          </div>
          <p className="text-text-primary font-semibold text-lg mb-2">
            Order Tidak Ditemukan
          </p>
          <p className="text-text-secondary">
            Pastikan link yang Anda buka sudah benar
          </p>
        </div>
      </MobileLayout>
    );
  }

  // Transition screens
  if (showTransition === "payment_uploaded") {
    return (
      <MobileLayout currentStep={2} totalSteps={5} title="Pembayaran">
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Bukti Terkirim!
          </h2>
          <p className="text-text-secondary text-center">
            Menunggu verifikasi admin...
          </p>
        </div>
      </MobileLayout>
    );
  }

  if (showTransition === "driver_saved") {
    return (
      <MobileLayout currentStep={3} totalSteps={5} title="Data Driver">
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Data Driver Tersimpan!
          </h2>
          <p className="text-text-secondary text-center">
            Menyiapkan barcode antrian...
          </p>
        </div>
      </MobileLayout>
    );
  }

  if (showTransition === "barcode_scanned") {
    return (
      <MobileLayout currentStep={4} totalSteps={5} title="Barcode">
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Barcode Ter-Scan!
          </h2>
          <p className="text-text-secondary text-center">
            Menuju halaman antrian...
          </p>
        </div>
      </MobileLayout>
    );
  }

  if (showTransition === "loading_completed") {
    return (
      <MobileLayout currentStep={5} totalSteps={5} title="Selesai">
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Pemuatan Selesai!
          </h2>
          <p className="text-text-secondary text-center">
            Menyiapkan surat jalan...
          </p>
        </div>
      </MobileLayout>
    );
  }

  // Rejected payment - show payment step again with message
  const showRejectedPayment = order.payment_status === "rejected";

  // Render appropriate step
  const renderStep = () => {
    // Payment rejected - back to payment step
    if (order.status === "paid" && showRejectedPayment) {
      return (
        <div className="space-y-4 animate-fade-in">
          <div className="card bg-red-500/10 border-red-500/20 animate-slide-up">
            <p className="font-semibold text-red-400 mb-1">
              Pembayaran Ditolak
            </p>
            <p className="text-sm text-red-300">
              {order.payment_reject_reason ||
                "Silakan upload ulang bukti pembayaran"}
            </p>
          </div>
          <PaymentStep
            order={order}
            onSubmit={(formData) => uploadPayment.mutate(formData)}
            isPending={uploadPayment.isPending}
          />
        </div>
      );
    }

    // Step 1: Invoice + Payment (pending)
    if (order.status === "pending") {
      return (
        <div className="space-y-4 animate-fade-in">
          <InvoiceStep order={order} showDownload />
          <PaymentStep
            order={order}
            onSubmit={(formData) => uploadPayment.mutate(formData)}
            isPending={uploadPayment.isPending}
          />
        </div>
      );
    }

    // Step 2: Waiting verification (paid)
    if (order.status === "paid") {
      return (
        <div className="space-y-4 animate-fade-in">
          <InvoiceStep order={order} showDownload />
          <div className="card bg-gradient-to-br from-blue-500/10 to-cyan/5 border-blue-500/20 text-center no-print">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <RefreshCw className="w-7 h-7 text-blue-400 animate-spin" />
            </div>
            <p className="font-semibold text-text-primary mb-1">
              Menunggu Verifikasi
            </p>
            <p className="text-sm text-text-secondary mb-2">
              Halaman akan refresh otomatis
            </p>
            <p className="text-xs text-text-muted">
              Refresh setiap 10 detik
            </p>
          </div>
        </div>
      );
    }

    // Step 3: Driver data (confirmed, no driver)
    if (order.status === "confirmed" && !order.driver_name) {
      return (
        <DriverStep
          order={order}
          onSubmit={(data) => submitDriver.mutate(data)}
          isPending={submitDriver.isPending}
        />
      );
    }

    // Step 4a: Barcode (confirmed, has driver, no queue)
    if (
      order.status === "confirmed" &&
      order.driver_name &&
      !order.queue_number
    ) {
      return (
        <BarcodeStep
          order={order}
          isFetching={isFetching}
          onRefresh={() => refetch()}
        />
      );
    }

    // Step 4b: Queue (queued or loading)
    if (order.status === "queued" || order.status === "loading") {
      return (
        <QueueStep
          order={order}
          queueData={queueData?.data}
          isFetching={fetchingQueue}
          onRefresh={() => {
            refetch();
            refetchQueue();
          }}
        />
      );
    }

    // Step 5: Delivery note (completed)
    if (order.status === "completed") {
      return <DeliveryStep deliveryNote={deliveryData?.data} order={order} />;
    }

    return <InvoiceStep order={order} />;
  };

  return (
    <MobileLayout
      currentStep={stepInfo.step}
      totalSteps={stepInfo.total}
      title={stepInfo.title}
    >
      {/* Status Card */}
      <div className="card mb-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">No. Order</p>
            <p className="font-bold text-text-primary text-lg">
              {order.order_number}
            </p>
          </div>
          {status && (
            <span className={`status-badge ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>
      </div>

      {/* Render current step */}
      {renderStep()}
    </MobileLayout>
  );
}
