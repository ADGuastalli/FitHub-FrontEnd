import { Dispatch, SetStateAction } from "react";
import { IRutina, IUser } from "./interface";

enum Dificultad {
  INICIAL = "inicial",
  INTERMEDIO = "intermedio",
  AVANZADO = "avanzado",
  PROFESIONAL = "profesional",
}

interface ICreatePlan {
  name: string;
  category: string[];
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficultyLevel: string;
  imgUrl: string[];
  price: number;
}

interface IPlan {
  id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficultyLevel?: string;
  admin?: string;
  category: ICategory[];
  check?: boolean;
  date?: string;
  isActive: boolean;
  price: string;
  imgUrl: string;
}

interface ICategory {
  id: string;
  name: string;
}

interface IGetRutYPlan {
  id: string;
  routine: IRutina[];
  subsciption: IPlan[];
}

interface IRutinaContextProps {
  rutinas: IRutina[];
  setRutinas: (rutinas: IRutina[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  getAllRutinas: (queryString: ISearch) => Promise<IRutina[]>;
}

interface IPlanContextProps {
  plans: IPlan[];
  setPlans: (planes: IPlan[]) => void;
  error: string | null;
  setError: (error: string) => void;
  getAllPlanes: (params: ISearch) => Promise<IPlan[]>;
}

interface ISearch {
  limit?: string;
  page: string;
  category?: string;
  location?: string;
  difficultyLevel?: string;
  search?: string;
}

export type {
  IGetRutYPlan,
  ICreatePlan,
  IPlan,
  ICategory,
  Dificultad,
  IRutinaContextProps,
  ISearch,
  IPlanContextProps,
};
