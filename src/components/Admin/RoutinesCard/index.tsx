import { resEnum } from "@/interface/admin.interface";
import { IRutina } from "@/interface/interface";
import { postSolicitudes } from "@/server/fetchAmin";
import Image from "next/image";
import { useState } from "react";

interface AdminRoutineCardProps {
    routines: IRutina[];
}

export default function AdminRoutinesCard({ routines }: AdminRoutineCardProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const imgDefect = "https://img.daisyui.com/images/profile/demo/2@94.webp";
    const getImageSrc = (image: string | string[] | null | undefined) => {
        if (typeof image === "string") {
            return image;
        } else if (Array.isArray(image) && image.length > 0) {
            return image[0];
        } else {
            return imgDefect;
        }
    };


    const handleCheckboxChange = (Id: string) => {
        setSelectedIds(prevSelectedIds =>
            prevSelectedIds.includes(Id)
                ? prevSelectedIds.filter(id => id !== Id)
                : [...prevSelectedIds, Id]
        );
    };

    const handleAprobar = async () => {
        const solicitudes = {
            coach: [],
            plan: [],
            rutina: selectedIds
        };

        try {
            const response = await postSolicitudes(solicitudes, resEnum.ACEPTAR);
            console.log("Respuesta de la aprobación:", response);
        } catch (error) {
            console.error("Error al aprobar los planes:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-center">
                <button type="submit" onClick={handleAprobar} className='boton'>
                    Aprobar
                </button>
            </div>
            <div className="overflow-x-auto z-10">
                <table className="daisy-table">
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="daisy-checkbox" />
                                </label>
                            </th>
                            <th>Rutina</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {routines.map((rutina) => (
                            <tr key={rutina.id}>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="daisy-checkbox"
                                            checked={selectedIds.includes(rutina.id)}
                                            onChange={() => handleCheckboxChange(rutina.id)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="daisy-avatar">
                                            <div className="daisy-mask daisy-mask-squircle h-12 w-12">
                                                <div className="relative object-contain w-12 h-12 rounded-t-lg">
                                                    <Image
                                                        src={getImageSrc(rutina.imgUrl)}
                                                        alt={rutina.name}
                                                        fill={true}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        priority={true}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{rutina.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {rutina.category?.map((cat, index) => (
                                            <span key={index} className="daisy-badge daisy-badge-ghost daisy-badge-sm">
                                                {cat.name}
                                            </span>
                                        ))}
                                        <div className="text-sm opacity-50">{rutina.difficultyLevel}</div>
                                    </div>
                                </td>
                                <td>
                                    ${rutina.price}
                                </td>
                                <th>
                                    <button className="daisy-btn daisy-btn-ghost daisy-btn-xs">Detalles</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="text-white">
                        <tr>
                            <th></th>
                            <th>Rutina</th>
                            <th>Categoría y Dificultad</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
