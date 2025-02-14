import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import 'primeicons/primeicons.css';

export default function Menu() {
    const itemRenderer = (item:any) => (
        <a className="flex align-items-center p-menuitem-link" style={{color: '#F5ECDD'}}>
            <span className="mx-2" style={{color: '#2F292A'}}>{item.label}</span>
        </a>
    

    );
    const items = [
        {
            label: 'Categorias',
            items: [
                {
                    label: 'Livros',
                    template: itemRenderer
                },
                {
                    label: 'Discos',
                    template: itemRenderer
                },
            ],
        },
    ];

    const start = (
        <>
            <img alt="logo" src="/images/logo.png" height="40" className="ml-2 mr-4"></img>;
        </>
    )
    const end = (
        <div className="flex align-items-center gap-8">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto"/>

            <div className='flex align-items-center gap-6 justify-center'>
                <i className="pi pi-heart" style={{ color: '#F5ECDD' }} />
                <i className="pi pi-shopping-bag" style={{ color: '#F5ECDD' }} />
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            </div>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} style={{background: "#2F292A", border:'none'}}/>
        </div>
    )
}
        