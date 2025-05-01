interface TitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
    return (
        <div className={`mt-3 ${className} `}>
            <h1 className="text-gray-700 text-4xl font-bold">
                {title}
            </h1>
            {
                subtitle && (
                    <h3 className="mt-4 text-gray-500 text-lg">
                        {subtitle}
                    </h3>
                )
            }
        </div>
    );
}