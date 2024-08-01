"use client";

import { IRutinaEjercicio } from "@/interface/interface";
import { Dificultad, ICategory } from "@/interface/plan.interface";
import { get_Category } from "@/server/fetchPlan";
import { create_Rutina, get_Ejercicios } from "@/server/fetchRoutines";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";

const CreateRutina: React.FC = () => {
  const router = useRouter();
  const [rutina, setRutina] = useState({
    name: "",
    descripcion: "",
    category: [] as string[],
    exercise: [] as string[],
    difficultyLevel: "" as Dificultad | "",
    price: "",
  });

  // *************** CATEGORIAS ***********************
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get_Category();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ************** EJERCICIOS *******************
  const [ejercicios, setEjercicio] = useState<IRutinaEjercicio[]>([]);
  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const data = await get_Ejercicios();

        setEjercicio(data);
      } catch (error) {
        console.error("Error fetching ejercicios:", error);
      }
    };
    fetchEjercicios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRutina((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeSelectMultiple: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    const { id, options } = event.target;
    const values = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setRutina((prevState) => ({
      ...prevState,
      [id]: values,
    }));
  };

  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    // Aquí puedes acceder al valor seleccionado
    console.log(event.target.value);

    const { id, value } = event.target;
    setRutina((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, descripcion, exercise, difficultyLevel, category } = rutina;

    if (!name) {
      alert("Por favor ingresa un título.");
      return;
    }
    if (!descripcion) {
      alert("Por favor ingresa una descripción.");
      return;
    }
    if (!exercise.length) {
      alert("Por favor selecciona al menos un ejercicio.");
      return;
    }
    if (!location) {
      alert("Por favor ingresa una ubicación.");
      return;
    }
    if (!difficultyLevel) {
      alert("Por favor ingresa un nivel de dificultad.");
      return;
    }
    if (!category.length) {
      alert("Por favor selecciona una categoría.");
      return;
    }

    const data = {
      name,
      description: descripcion,
      imgURL: "url",
      exercise,
      difficultyLevel,
      category,
      admin: "5061e26f-3375-41a2-bebf-bea3a9ba49f5", // El ID del administrador de la app
    };

    // console.log(data);
    try {
      await create_Rutina(data); // Usa la función modularizada
      alert("Rutina creada exitosamente");
      router.push("/dashboard");
    } catch (error) {
      alert("Error al crear la rutina");
      console.error("Error al crear la rutina:", error);
    }
  };

  return (
    <div className="w-full m-5 gap-3">
      <Link href="/dashboard">
        <button className="mt-4 mb-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Título:</label>
          <input
            type="text"
            id="name"
            value={rutina.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={rutina.descripcion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="exercise">Ejercicio:</label>
          <select
            id="exercise"
            value={rutina.exercise}
            onChange={handleChangeSelectMultiple}
            className="daisy-select daisy-select-bordered w-full max-w-xs"
            multiple
          >
            {ejercicios.map((ejercicio) => (
              <option key={ejercicio.id} value={ejercicio.id}>
                {ejercicio.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficultyLevel">Nivel de dificultad:</label>
          <select
            id="difficultyLevel"
            value={rutina.difficultyLevel}
            onChange={handleChangeSelect}
            className="daisy-select daisy-select-bordered w-full max-w-xs"
          >
            <option value="" disabled>
              Selecciona
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>

        <div>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={rutina.category}
            onChange={handleChangeSelectMultiple}
            className="daisy-select daisy-select-bordered w-full max-w-xs"
            multiple
          >
            <option value="" disabled>
              Seleccionar Categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Precio: $</label>
          <input
            type="text"
            id="price"
            value={rutina.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CreateRutina;
