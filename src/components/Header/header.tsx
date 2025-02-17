import { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { PanelMenu } from 'primereact/panelmenu';
import 'primeicons/primeicons.css';
import './style.css';

interface HeaderProps {
  simpleHeader: boolean;
}

export default function Header({ simpleHeader }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  let content = <></>;

  if (simpleHeader) {
    content = (
      <div className="simple-header">
        <img alt="logo" src="/images/logo.png" height="40" className="ml-2 mr-4"></img>
      </div>
    );
  } else {
    const itemRenderer = (item: any) => (
      <a className="flex align-items-center p-menuitem-link" style={{ backgroundColor: '#f9fafb' }}>
        <span className="mx-2 p-menuitem-text" style={{ color: '#2F292A' }}>
          {item.label}
        </span>
      </a>
    );

    const panelMenuItems = [
      { label: 'Meu Perfil', icon: 'pi pi-user' },
      { label: 'Histórico de Pedidos', icon: 'pi pi-history' },
      { label: 'Cesta', icon: 'pi pi-shopping-bag' },
      { label: 'Favoritos', icon: 'pi pi-heart' },
      { label: 'Sair', icon: 'pi pi-sign-out' },
    ];

    const items = [
      {
        label: 'Categorias',
        items: [
          {
            label: 'Livros',
            template: itemRenderer,
          },
          {
            label: 'Discos',
            template: itemRenderer,
          },
        ],
      },
    ];

    const start = (
      <>
        <img alt="logo" src="/images/logo.png" height="40" className="ml-2 mr-4"></img>;
      </>
    );
    const end = (
      <div className="flex align-items-center">
       <div className="search-container">
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search"></InputIcon>
              <InputText 
                  placeholder="O que deseja grimpar?" 
                  type="text" 
                  style={{ width: '40rem', maxWidth: '40rem', height: '2.5rem' }} 
              />
          </IconField>
      </div>


        <div className="flex align-items-center gap-4 justify-center">
          <Button icon="pi pi-heart" rounded text aria-label="Favoritos" style={{ color: '#F5ECDD' }} />
          <Button icon="pi pi-shopping-bag" rounded text aria-label="Cesta" style={{ color: '#F5ECDD' }} />
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
            onClick={() => toggleMenu()}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {menuVisible && (
          <div className="menu-container">
            <PanelMenu model={panelMenuItems} style={{ width: '200px' }} />
          </div>
        )}
      </div>
    );

    content = (
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{ background: '#2F292A', border: 'none', borderRadius: '0%' }}
      />
    );
  }

  return content;
}
