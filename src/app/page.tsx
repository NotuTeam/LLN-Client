import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />

      <div className="text-center max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo-bgn.png"
            alt="logo"
            width={50}
            height={50}
            className="animate-spin-slow"
          />
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-3">
          LabaLaba Nusantara
        </h1>
        <p className="text-text-secondary mb-6">
          Gunakan link order yang diberikan untuk mengakses pesanan Anda
        </p>

        <div className="bg-dark-surface rounded-2xl p-4 border border-dark-elevated/50">
          <p className="text-sm text-text-muted">
            Link format:{" "}
            <code className="bg-dark-elevated px-3 py-1.5 rounded-lg text-brand-lime font-mono text-xs">
              /order/[token]
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}
