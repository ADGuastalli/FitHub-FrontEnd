import Link from "next/link";

export function MercadoPagoSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black rounded-3xl my-5 mx-80">
      <svg
        fill="#000000"
        width="200px"
        height="200px"
        viewBox="0 0 24 24"
        id="check-mark-circle"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
      >
        <rect
          id="secondary"
          x="3"
          y="3"
          width="18"
          height="18"
          rx="9"
          style={{ fill: "rgb(44, 169, 188)", strokeWidth: 2 }}
        ></rect>
        <polyline
          id="primary"
          points="8 11.5 11 14.5 16 9.5"
          style={{
            fill: "none",
            stroke: "rgb(0, 0, 0)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></polyline>
        <rect
          id="primary-2"
          data-name="primary"
          x="3"
          y="3"
          width="18"
          height="18"
          rx="9"
          style={{
            fill: "none",
            stroke: "rgb(0, 0, 0)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></rect>
      </svg>
      <h1 className="text-2xl font-bold text-center">
        Tu pago se ha realizado con éxito. Muchas gracias por confiar en FitHub
      </h1>
      <Link href="/dashboard">
        <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Ver Mi Compra
        </button>
      </Link>
    </div>
  );
}
