import { IUser } from "@/interface/interface";

export const users: IUser[] = [
  {
    id: 1,
    name: "Lionel Messi",
    email: "messi@gmail.com",
    address: "Calle Falsa 123",
    city: "Buenos Aires",
    phone: "1234567890",
    role: "admin",
    password: "12345678",
    borradologico: false,
  },
  {
    id: 2,
    name: "Diego Maradona",
    email: "diego.maradona@example.com",
    address: "123 Main Street",
    city: "Ciudad de México",
    phone: "555-123-4567",
    role: "user",
    password: "12345678",
    borradologico: false,
  },
  {
    id: 3,
    name: "Gabriela Sabatini",
    email: "gabriela.sabatini@example.com",
    address: "456 Elm Avenue",
    city: "Bogotá",
    phone: "555-987-6543",
    role: "user",
    password: "12345678",
    borradologico: false,
  },
  {
    id: 4,
    name: "Fernando González",
    email: "fernando.gonzalez@example.com",
    address: "789 Oak Lane",
    city: "Lima",
    phone: "555-555-5555",
    role: "user",
    password: "12345678",
    borradologico: false,
  },
];
