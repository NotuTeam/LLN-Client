"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";

// Set Indonesian locale
dayjs.locale("id");

interface PrintDeliveryNoteTemplateProps {
  order: any;
  deliveryNote: any;
}

export default function PrintDeliveryNoteTemplate({
  order,
  deliveryNote,
}: PrintDeliveryNoteTemplateProps) {
  // Get items
  const items =
    order?.items?.length > 0
      ? order.items
      : deliveryNote?.items?.length > 0
        ? deliveryNote.items
        : [
            {
              product_name:
                deliveryNote?.product_name || order?.product?.name || "-",
              quantity: deliveryNote?.product_qty || order?.quantity || 0,
              unit: deliveryNote?.product_unit || order?.product?.unit || "pcs",
              unit_price: 0,
              subtotal: 0,
            },
          ];

  const noteNumber =
    order?.delivery_note_number || deliveryNote?.note_number || "-";
  const noteDate = order?.delivery_note_at || deliveryNote?.created_at;

  return (
    <div className="print-template" style={{ display: "none" }}>
      {/* Header */}
      <div className="print-header">
        <div className="print-logo">
          <h1>SURAT JALAN</h1>
          <p className="print-tagline">{noteNumber}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="print-divider-double"></div>

      {/* Info Grid */}
      <div className="print-info-grid">
        <div className="print-info-col">
          <div className="print-info-row">
            <span className="print-label">Kepada</span>
            <span className="print-value">
              {deliveryNote?.sales_name || order?.sales?.name}
            </span>
          </div>
          <div className="print-info-row">
            <span className="print-label">Telepon</span>
            <span className="print-value">
              +{deliveryNote?.sales_phone || order?.sales?.phone}
            </span>
          </div>
        </div>
        <div className="print-info-col">
          <div className="print-info-row">
            <span className="print-label">Tanggal</span>
            <span className="print-value">
              {noteDate ? dayjs(noteDate).format("DD MMMM YYYY") : "-"}
            </span>
          </div>
          <div className="print-info-row">
            <span className="print-label">Jam</span>
            <span className="print-value">
              {noteDate ? dayjs(noteDate).format("HH:mm") : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Driver Section */}
      <div className="print-driver-section">
        <div className="print-section-title">Informasi Pengiriman</div>
        <div className="print-driver-grid">
          <div className="print-driver-item">
            <span className="print-label">Nama Driver</span>
            <span className="print-value">
              {deliveryNote?.driver_name || order?.driver_name || "-"}
            </span>
          </div>
          <div className="print-driver-item">
            <span className="print-label">No. HP Driver</span>
            <span className="print-value">
              {deliveryNote?.driver_phone || order?.driver_phone || "-"}
            </span>
          </div>
          <div className="print-driver-item">
            <span className="print-label">No. Polisi</span>
            <span className="print-value">
              {deliveryNote?.vehicle_plate || order?.vehicle_plate || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="print-section-title">Barang yang Dikirim</div>
      <table className="print-table">
        <thead>
          <tr>
            <th className="print-th-no">No</th>
            <th className="print-th-item">Nama Barang</th>
            <th className="print-th-qty">Jumlah</th>
            <th className="print-th-unit">Satuan</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notes */}
      <div className="print-notes">
        <p className="print-notes-title">Catatan:</p>
        <ol className="print-notes-list">
          <li>Surat jalan ini adalah bukti resmi pengiriman barang.</li>
          <li>Pastikan barang diterima dalam kondisi baik dan lengkap.</li>
          <li>Tanda tangan penerima diperlukan sebagai bukti penerimaan.</li>
          <li>Simpan surat jalan ini sebagai dokumentasi.</li>
        </ol>
      </div>

      {/* Footer Signatures */}
      <div className="print-signatures">
        <div className="print-sign-col"></div>
        <div className="print-sign-col">
          <p className="print-sign-label">Diterima oleh,</p>
          <div className="print-sign-space"></div>
          <p className="print-sign-line"></p>
          <p className="print-sign-name">Penerima</p>
        </div>
      </div>
    </div>
  );
}
