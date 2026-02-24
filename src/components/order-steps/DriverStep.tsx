"use client";

import { useState, useRef } from "react";
import {
  User,
  Phone,
  Car,
  Camera,
  Loader2,
  CheckCircle,
  X,
  Truck,
} from "lucide-react";

interface DriverStepProps {
  order: any;
  onSubmit: (data: any) => void;
  isPending: boolean;
}

export default function DriverStep({
  order,
  onSubmit,
  isPending,
}: DriverStepProps) {
  const [formData, setFormData] = useState({
    driver_name: order.driver_name || "",
    driver_phone: order.driver_phone || "",
    vehicle_plate: order.vehicle_plate || "",
  });
  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    order.vehicle_photo?.url || null,
  );
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File terlalu besar. Maksimal 5MB");
        return;
      }
      setVehiclePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.driver_name ||
      !formData.driver_phone ||
      !formData.vehicle_plate
    ) {
      alert("Harap lengkapi semua data");
      return;
    }
    onSubmit({
      ...formData,
      vehiclePhoto,
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Instructions */}
      <div className="card bg-green-50 border-green-200 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-green-800" />
          </div>
          <div>
            <p className="font-semibold text-green-800">Isi Data Driver</p>
            <p className="text-sm text-green-600 mt-0.5">
              Lengkapi data driver yang akan menjemput barang
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div
        className="card space-y-5 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Driver Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            Nama Driver
          </label>
          <input
            type="text"
            placeholder="Masukkan nama driver"
            value={formData.driver_name}
            onChange={(e) =>
              setFormData({ ...formData, driver_name: e.target.value })
            }
            className="input"
          />
        </div>

        {/* Driver Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary-600" />
            </div>
            Nomor HP Driver
          </label>
          <input
            type="tel"
            placeholder="Contoh: 08123456789"
            value={formData.driver_phone}
            onChange={(e) =>
              setFormData({ ...formData, driver_phone: e.target.value })
            }
            className="input"
          />
        </div>

        {/* Vehicle Plate */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-600" />
            </div>
            Nomor Polisi Kendaraan
          </label>
          <input
            type="text"
            placeholder="Contoh: B 1234 XYZ"
            value={formData.vehicle_plate}
            onChange={(e) =>
              setFormData({
                ...formData,
                vehicle_plate: e.target.value.toUpperCase(),
              })
            }
            className="input"
          />
        </div>
      </div>

      {/* Vehicle Photo */}
      <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Camera className="w-4 h-4 text-gray-600" />
          </div>
          Foto Kendaraan (Opsional)
        </label>

        {photoPreview ? (
          <div className="relative group animate-scale-in">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full rounded-xl object-cover max-h-48 border border-gray-200"
            />
            <button
              onClick={() => {
                setVehiclePhoto(null);
                setPhotoPreview(null);
              }}
              className="absolute top-3 right-3 bg-red-500 text-white p-2.5 rounded-xl 
                         opacity-0 group-hover:opacity-100 transition-all duration-200
                         hover:bg-red-400 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => photoInputRef.current?.click()}
            className="w-full h-36 border-2 border-dashed border-gray-300 rounded-xl 
                       flex flex-col items-center justify-center gap-3
                       text-gray-500 hover:border-primary-400 hover:text-primary-600
                       transition-all duration-300 group"
          >
            <div
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center
                            group-hover:bg-primary-100 transition-colors"
            >
              <Camera className="w-6 h-6 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-sm font-medium">Foto kendaraan</p>
          </button>
        )}

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelect}
          className="hidden"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={
          !formData.driver_name ||
          !formData.driver_phone ||
          !formData.vehicle_plate ||
          isPending
        }
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed
                   animate-slide-up sticky bottom-4"
        style={{ animationDelay: "0.3s" }}
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Simpan Data Driver
          </>
        )}
      </button>
    </div>
  );
}
