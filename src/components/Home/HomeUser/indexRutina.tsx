"use client";
<<<<<<< HEAD
import Link from "next/link";
import SearchRutina from "@/components/SearchRutina";
import styles from "../home.module.css";
export default function HomeUserRutina() {

=======

import { useState } from "react";
import RutinaList from "@/components/RoutinesList/index";
import { rutinas } from "../../../../public/data/rutines.data";
import Link from "next/link";
export default function HomeUserRutina() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [filterByPrice, setFilterByPrice] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setPriceRange((prev) => {
      if (checked) {
        return prev ? `${prev},${value}` : value;
      } else {
        return prev
          .split(",")
          .filter((v) => v !== value)
          .join(",");
      }
    });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value ? Number(event.target.value) : "");
  };

  const filteredRutinas = rutinas.filter((rutina) => {
    const categoryMatch = selectedCategories.length
      ? selectedCategories.includes(rutina.categoria)
      : true;

    const priceMatch = priceRange
      ? (() => {
          const ranges = priceRange.split(",");
          return ranges.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return rutina.precio >= min && rutina.precio < max;
          });
        })()
      : true;

    return categoryMatch && priceMatch;
  });
>>>>>>> eedb157 (register listo)

  return (
    <div className={styles.container}>
      <Link href="/home">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
<<<<<<< HEAD
      <SearchRutina/>
=======
      <div>
        <h1 className="text-center text-3xl font-bold text-[#97D6DF] mb-4 mt-9">
          Rutinas Disponibles
        </h1>
        <div className="flex">
          <div className="flex flex-col mr-4">
            <div className="flex flex-col border-3 mt-7 ml-4 ">
              <h2 className="text-center text-[#97D6DF]">Filtrar por Precio</h2>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  value="0-20"
                  checked={priceRange.includes("0-20")}
                  onChange={handlePriceRangeChange}
                />
                <span className="ml-2 bg-[#447988]">0 - 20</span>
              </label>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  value="20-40"
                  checked={priceRange.includes("20-40")}
                  onChange={handlePriceRangeChange}
                />
                <span className="ml-2 bg-[#447988]">20 - 40</span>
              </label>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  value="40-100"
                  checked={priceRange.includes("40-100")}
                  onChange={handlePriceRangeChange}
                />
                <span className="ml-2 bg-[#447988]">40 - 100</span>
              </label>
            </div>
            <div className="flex flex-col w-[150px] text-center mt-2 ml-4">
              <h2 className="text-[#97D6DF]">Filtrar por Categoría</h2>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange("Fuerza")}
                />
                <span className="ml-2 bg-[#447988]">Fuerza</span>
              </label>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange("Cardio")}
                />
                <span className="ml-2 bg-[#447988]">Cardio</span>
              </label>
              <label className="bg-[#447988] p-2 rounded mb-2 text-[#1A1D1A] text-center flex items-center">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange("Flexibilidad")}
                />
                <span className="ml-2 bg-[#447988]">Flexibilidad</span>
              </label>
            </div>
          </div>
          <div>
            <RutinaList rutinas={filteredRutinas} />
          </div>
        </div>
      </div>
>>>>>>> eedb157 (register listo)
      <div className="flex justify-center space-x-4 mb-8 ">
        <span
          className="text-4xl font-bold stroke-text animate-fadeIn z-10"
          data-text="Explora nuestros"
        >
          Explora nuestros
        </span>
        <span className="text-4xl font-bold text-[#97D6DF] animate-fadeIn z-10">
          elementos para
        </span>
        <span className="text-4xl font-bold text-[#447988] animate-fadeIn z-10">
          dar forma a tu cuerpo
        </span>
      </div>
      <SearchRutina />
    </div>
  );
}
