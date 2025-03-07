import "./style.css"

interface ContainerItemsProps {
    title: string;
    children: React.ReactNode;
    backgroundBege: boolean;    
}

const ContainerItems = ({title, children, backgroundBege}: ContainerItemsProps) => {

    return (
        <>
            <div className={`${backgroundBege ? "container-carousel-event": "container-carousel-items"}`}>
                <div className={`${backgroundBege ? "content-title-event": "content-title"}`}>
                    <span className={`${backgroundBege ? "title-carousel-event" : "title-carousel-items"}`}>
                        {title} {">"}
                    </span>
                </div>
            </div>

            <div className={`${backgroundBege ? "space-carousel-events" : "space-carousel-items"}`}>{children}</div>
        </>
    )
}

export default ContainerItems;