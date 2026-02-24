"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";

// Set Indonesian locale
dayjs.locale("id");

interface PrintInvoiceTemplateProps {
  order: any;
  settings?: any;
}

export default function PrintInvoiceTemplate({
  order,
  settings,
}: PrintInvoiceTemplateProps) {
  // Get items from order
  const items =
    order.items?.length > 0
      ? order.items
      : [
          {
            product_name: order.product?.name || "-",
            quantity: order.quantity,
            unit_price: order.unit_price,
            unit: order.product?.unit || "pcs",
            subtotal: order.total_price,
          },
        ];

  return (
    <div className="print-template" style={{ display: "none" }}>
      {/* Header */}
      <div className="print-header">
        <div className="print-logo">
          <h1>INVOICE</h1>
          <p className="print-tagline">{order.order_number}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="print-divider"></div>

      {/* Info Grid */}
      <div className="print-info-grid">
        <div className="print-info-col">
          <h3>Kepada:</h3>
          <p className="print-name">{order.sales?.name}</p>
          <p className="print-detail">+{order.sales?.phone}</p>
          {order.sales?.address && (
            <p className="print-detail">{order.sales?.address || "-"}</p>
          )}
        </div>
        <div className="print-info-col print-text-right">
          <h3>Informasi:</h3>
          <p className="print-detail">
            <span>Tanggal:</span>{" "}
            {dayjs(order.created_at).format("DD MMMM YYYY")}
          </p>
          <p className="print-detail">
            <span>Status:</span>{" "}
            {order.status === "pending"
              ? "Menunggu Pembayaran"
              : order.status === "paid"
                ? "Menunggu Verifikasi"
                : order.status === "confirmed"
                  ? "Terkonfirmasi"
                  : order.status === "queued"
                    ? "Dalam Antrian"
                    : order.status === "loading"
                      ? "Sedang Dimuat"
                      : order.status === "completed"
                        ? "Selesai"
                        : order.status}
          </p>
          {order.driver_name && (
            <>
              <p className="print-detail">
                <span>Driver:</span> {order.driver_name}
              </p>
              <p className="print-detail">
                <span>No. Pol:</span> {order.vehicle_plate}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="print-divider"></div>

      {/* Items Table */}
      <table className="print-table">
        <thead>
          <tr>
            <th className="print-th-no">No</th>
            <th className="print-th-item">Nama Barang</th>
            <th className="print-th-qty">Qty</th>
            <th className="print-th-unit">Satuan</th>
            <th className="print-th-price">Harga</th>
            <th className="print-th-total">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index: number) => (
            <tr key={index}>
              <td className="print-td-center">{index + 1}</td>
              <td>{item.product_name || item.product?.name || "-"}</td>
              <td className="print-td-center">{item.quantity}</td>
              <td className="print-td-center">
                {item.unit || item.product?.unit || "pcs"}
              </td>
              <td className="print-td-right">
                Rp {item.unit_price?.toLocaleString("id-ID")}
              </td>
              <td className="print-td-right">
                Rp {item.subtotal?.toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="print-td-total-label">
              TOTAL
            </td>
            <td className="print-td-total">
              Rp {order.total_price?.toLocaleString("id-ID")}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}
      <div className="print-footer">
        <div className="print-footer-left">
          <p className="print-note-title">Catatan:</p>
          <p className="print-note">
            Harap transfer sesuai nominal di atas. Pembayaran dianggap sah
            setelah bukti transfer diupload.
          </p>
        </div>
        <div className="print-footer-right">
          <p className="print-sign-label">Hormat kami,</p>
          <div className="print-sign-space"></div>
          <p className="print-sign-name">LabaLaba Nusantara</p>
        </div>
      </div>
    </div>
  );
}
