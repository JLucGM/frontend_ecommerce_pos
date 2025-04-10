import { LoaderCircle } from "lucide-react";

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Loader de carga */}
            <LoaderCircle className="animate-spin text-primary" size={40} />
            <span className="ml-2">Cargando...</span>
        </div>
    );
}