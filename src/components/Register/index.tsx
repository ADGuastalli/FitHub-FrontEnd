"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { validateRegister } from "@/helpers/validations.login";
import { useRouter } from "next/navigation";
import { IErrorsRegister, IRegisterUser } from "@/interface/interface";
import { UserContext } from "@/context/userContext";
import style from "./register.module.css";
import Image from "next/image";
import register1 from "../../../public/assets/loginyregister/register1.png";
import { motion } from "framer-motion";
import register2 from "../../../public/assets/loginyregister/register2.png";
import LoginLogout from "../Login-Logout";

export function RegisterComponet({ token, setToken }: any) {
  const { signUp } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    dni: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    delete: false,
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    name: "*",
    email: "*",
    dni: "*",
    phone: "*",
    country: "*",
    city: "*",
    address: "*",
    password: "*",
    passwordConfirm: "*",
    delete: false,
  });

  const todosLosCamposCompletos = () => {
    return (
      userData.email !== "" &&
      userData.password !== "" &&
      userData.name !== "" &&
      userData.address !== "" &&
      userData.city !== "" &&
      userData.phone !== "" &&
      userData.country !== "" &&
      userData.dni !== ""
    );
  };

  const handleImputChange = (event: any) => {
    const { name, value } = event.target;

    const newValue = name === "dni" || name === "phone" ? Number(value) : value;
    const newUserDate = { ...userData, [name]: newValue };

    setUserDate(newUserDate);
    setErrors(
      validateRegister(newUserDate, [
        "email",
        "name",
        "dni",
        "phone",
        "country",
        "city",
        "address",
        "password",
        "passwordConfirm",
      ])
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (userData.password !== userData.passwordConfirm) {
      alert("Las contraseñas no coinciden");
      // } else
      // if (Object.keys(errors).length) {
      //   alert("Todos los campos son obligatorios ");
    } else {
      const userDataToSubmit = {
        name: userData.name,
        email: userData.email,
        dni: Number(userData.dni),
        phone: Number(userData.phone),
        country: userData.country,
        city: userData.city,
        address: userData.address,
        password: userData.password,
        passwordConfirm: userData.passwordConfirm,
        delete: false,
      };

      console.log(userDataToSubmit);

      const success = await signUp(userDataToSubmit);

      if (success) {
        router.push("/login");
      } else {
        console.log("Ingreso invalido");
      }
    }
  };
  return (
    <section
      className={
        style.register + " w-full h-full p-4 flex  items-center justify-center "
      }
    >
      <div className={style.left} data-aos="fade-right">
        <Image
          src={register1}
          alt="Woman on the right"
          width={1000}
          height={900}
        />
      </div>{" "}
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text-[#97D6DF] text-5xl p-3 mb-5 text-center font-bold">
          Registro
        </h1>

        {/* Entrada de nombre */}
        <div className="grid grid-cols-2 p-4 gap-x-9  ">
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ingrese su Nombre y Apellido"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="name"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.name
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Nombre y Apellido
            </label>
            {errors.name && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Entrada de correo */}
          <div
            className="relative  rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Ingrese su correo"
              onChange={handleImputChange}
              className="peer block rounded border-0  bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="email"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.email
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Correo
            </label>
            {errors.email && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* DNI Input */}
          <div
            className="relative  rounded-lg mb-6"
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="dni"
              id="dni"
              placeholder="Ingrese su DNI"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="dni"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.dni
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              DNI
            </label>
            {errors.dni && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.dni}
              </p>
            )}
          </div>

          {/* Entrada de dirección */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Ingrese su dirección"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="address"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.dni
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Dirección
            </label>
            {errors.address && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.address}
              </p>
            )}
          </div>

          {/* Entrada de país */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Ingrese su país"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="country"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.country
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              País
            </label>
            {errors.country && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "0px" }}>
                {errors.country}
              </p>
            )}
          </div>

          {/* Entrada de ciudad */}
          <div className="relative rounded-lg mb-6" data-twe-input-wrapper-init>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Ingrese su ciudad"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="city"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.city
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Ciudad
            </label>
            {errors.city && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.city}
              </p>
            )}
          </div>

          {/* Entrada de celular */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Ingrese su celular"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="phone"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.phone
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Celular
            </label>
            {errors.phone && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Entrada de contraseña */}
          <div
            className="relative rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="password"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.password
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Contraseña
            </label>
            {errors.password && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmación de contraseña */}
          <div
            className="relative  rounded-lg mb-6 "
            data-twe-input-wrapper-init
          >
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Repita su contraseña"
              onChange={handleImputChange}
              className="peer block rounded border-0 bg-transparent px-2 py-1 text-sm leading-tight outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#447988] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-[#447988] [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              style={{ width: "100%" }}
            />
            <label
              htmlFor="passwordConfirm"
              className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-tight text-neutral-500 transition-all duration-200 ease-out ${
                userData.passwordConfirm
                  ? "-translate-y-[1.15rem] scale-[0.8] text-[#447988]"
                  : "peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-[#447988]"
              } motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-[#447988]`}
            >
              Repita su Contraseña
            </label>
            {errors.passwordConfirm && (
              <p style={{ color: "red", fontSize: "10px", marginTop: "10px" }}>
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Mensaje de campos obligatorios */}
          {!todosLosCamposCompletos() && (
            <p
              style={{
                color: "red",
                fontSize: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                textShadow: "1px 1px 1px black",
              }}
            >
              * Todos los campos son obligatorios
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className=" rounded-full w-full border-2 border-[#97D6DF] bg-[#FF3E1A] py-2 text-sm font-bold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#FF5722] focus:bg-[#FF3E1A] focus:outline-none focus:ring-0 active:bg-[#E64A19] motion-reduce:transition-none dark:text-primary-500 dark:bg-[#FF3E1A] dark:hover:bg-[#FF5722] dark:focus:bg-[#FF3E1A] "
        >
          Registrar
        </button>
        <div className="my-4   flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-[#97D6DF]">
            O Ingresa Con
          </p>
        </div>

        {/* Botones sociales */}
        <LoginLogout />
      </form>
      <div className={style.right} data-aos="fade-left">
        <motion.img
          src={register2.src}
          alt="Woman on the right"
          width={1000}
          height={900}
        />
      </div>
    </section>
  );
}
