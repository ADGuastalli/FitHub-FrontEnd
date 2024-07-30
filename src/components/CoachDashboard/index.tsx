"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import styles from "./CoachDashboard.module.css";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import imagenRutina from "../../../public/assets/homeimage/imagenRutina.jpg";
import imagenPlan from "../../../public/assets/homeimage/imagenPlan.jpg";
import imagenEjercicio from "../../../public/assets/homeimage/imagenEjercicio.jpg";
import imagenPerfil from "../../../public/assets/imagenPerfil.webp";

// Define the Routine type
type Routine = {
  id: string;
  name: string;
  progress: number;
};

interface IUserConext {
  user: {
    rutinas: Routine[];
    fotosPerfil?: string[];
    name: string;
    email: string;
    address: string;
    city: string;
  } | null;
}

const CoachDashboard = () => {
  const userContext = useContext(UserContext) as IUserConext;
  const { user } = userContext;
  const [avatar, setAvatar] = useState<string | null>(null);

  if (!user) return <p>Loading...</p>;

  const purchasedRoutines = user?.rutinas || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Link href="/home">
        <button className="mt-4 relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]">
          Volver
        </button>
      </Link>
      <div className="flex border border-1 m-5">
        <div
          className={
            styles.dashboard +
            " flex-col items-center justify-center border border-1 w-[400px] "
          }
        >
          <Image
            src={avatar || imagenPerfil}
            alt="Avatar"
            width={500}
            height={80}
            className="rounded-full object-cover"
          />
          <label
            htmlFor="file-input"
            className="pencil-icon cursor-pointer mt-4"
          >
            <PencilIcon className="w-6 h-6 text-white bg-[#FF3E1A] rounded-full p-1" />
          </label>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <h3 className="mt-4 text-lg font-bold">{user.name}</h3>
          <p>nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Dirección: {user.address}</p>
          <p>Ciudad: {user.city}</p>
        </div>
        <div className="flex justify-evenly items-center text-[#97D6DF]">
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-lg text-center">
              ¿Deseas crear una nueva Actividad?
            </h3>
            <Image
              src={imagenPlan}
              width={200}
              height={200}
              alt="logo"
              className="rounded-lg"
            />
            <Link href="/create/plan">
              <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
                Crear Actividad
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-lg text-center">
              ¿Deseas crear una nueva rutina?
            </h3>
            <Image
              src={imagenRutina}
              width={200}
              height={200}
              alt="logo"
              className="rounded-lg"
            />
            <Link href="/create/rutina">
              <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
                Crear Rutina
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="m-5 text-lg text-center">
              ¿Deseas crear una nuevo ejercicio?
            </h3>
            <Image
              src={imagenEjercicio}
              width={200}
              height={200}
              alt="logo"
              className="rounded-lg"
            />
            <Link href="/create/exercise">
              <button className="bg-[#FF3E1A] text-white p-2 rounded m-5">
                Crear Ejercicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
