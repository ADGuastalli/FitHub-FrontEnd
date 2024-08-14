"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/navbar/logo.png";
import { UserContext } from "@/context/userContext";
import { UserIcon } from "@heroicons/react/24/outline";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function Navbar() {
  const { isLogged, user, logOut } = useContext(UserContext);

  const handleLogout = () => {
    confirmAlert({
      title: "Confirmar cierre de sesión",
      message: "¿Estás seguro de que quieres cerrar sesión?",

      buttons: [
        {
          label: "Sí",
          onClick: logOut,
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="relative z-10 backdrop-blur-lg border-4 border-[#97D6DF] flex items-center justify-between py-2 shadow-dark-mild dark:bg-[#1A1D1A] lg:flex-wrap lg:justify-between lg:py-4 rounded-lg">
      <div className="flex items-center px-3 flex-grow">
        <Link
          href="/"
          className="flex items-center text-xl text-black dark:text-white"
        >
          <Image src={logo} alt="Logo" width={100} height={100} />
          <h1 className="text-3xl font-bold ms-3 text-[#FF3E1A]">-FITHUB-</h1>
        </Link>
        <div className="flex-grow flex justify-center lg:space-x-8">
          <Link
            href="/home/homeRutinas"
            className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]"
          >
            Rutinas
          </Link>
          <Link
            href="/home/homePlanes"
            className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]"
          >
            Actividades
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4 px-3 lg:space-x-6">
        {isLogged ? (
          <>
            <span className="text-[#97D6DF] dark:text-[#97D6DF] text-lg">
              Bienvenido, {user?.name || user?.email || ""}
            </span>
            <div className="flex items-center ms-10 md:me-2">
              <Link
                href="/dashboard"
                className="text-[#97D6DF] dark:text-[#97D6DF] lg:px-2 hover:text-[#FF3E1A] text-sm"
              >
                <UserIcon className="w-12 h-12 text-white" />
              </Link>
            </div>
            {isAdmin && (
              <div className="flex items-center ms-10 md:me-2">
                <Link
                  href="/admin/coachs"
                  className="relative z-[2] rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A]"
                >
                  Admin
                </Link>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/register">
              <button className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]">
                Registrarse
              </button>
            </Link>
            <Link href="/login">
              <button className="relative rounded-full border-2 border-[#97D6DF] bg-[#FF3E1A] px-6 py-2 text-sm font-bold uppercase text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:outline-none dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722]">
                Entrar
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
