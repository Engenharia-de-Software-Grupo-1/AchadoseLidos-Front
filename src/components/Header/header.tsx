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
import { Link, useNavigate } from 'react-router-dom';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';
import { useAuth } from '@contexts/authContext';

interface HeaderProps {
  simpleHeader: boolean
}

export default function Header({ simpleHeader }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, conta, handleLogout } = useAuth();
  const [searchedProduct, setSearchedProduct] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const redirectProfile = () => {
    if (conta?.tipo === 'SEBO') {
      navigate('/profile/sebo');
    } else {
      navigate('/profile/user');
    }
  };

  const redirectMyProducts = () => {
    navigate('/meus-produtos');
    window.location.reload();
  };

  let content = <></>;

  if (simpleHeader) {
    content = (
      <div className="simple-header">
        <Link to="/">
          <img alt="logo" src="/images/logo.svg" height="40" className="ml-2 mr-4"></img>
        </Link>
      </div>
    );

    const panelMenuItems = isAuthenticated
      ? [
          { label: 'Meu Perfil', icon: 'pi pi-user', command: () => redirectProfile() },
          { label: 'Histórico de Pedidos', icon: 'pi pi-history' },

          ...(conta?.tipo === 'SEBO'
            ? [{ label: 'Meus Produtos', icon: 'pi pi-box', command: () => redirectMyProducts() }]
            : [
                { label: 'Cesta', icon: 'pi pi-shopping-bag' },
                { label: 'Favoritos', icon: 'pi pi-heart' },
              ]),

          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => handleLogout(),
          },
        ]
      : [
          { label: 'Entrar', icon: 'pi pi-sign-in', command: () => navigate('/login') },
          { label: 'Cadastrar', icon: 'pi pi-user-plus', command: () => navigate('/register') },
        ];

    const start = (
      <>
        <Link to="/">
          <img alt="logo" src="/images/logo.svg" height="40" className="ml-2 mr-4"></img>
        </Link>
      </>
    );

    const end = (
      <div className="flex align-items-center">
        <div className="search-container">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"></InputIcon>
            <InputText
              placeholder="O que deseja garimpar?"
              type="text"
              style={{ width: '40rem', maxWidth: '40rem', height: '2.5rem' }}
              onChange={(e) => setSearchedProduct(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/navigation?search=${searchedProduct}`);
                }
              }}
            />
          </IconField>
        </div>

        <div className="flex align-items-center gap-4 justify-center">
          {conta?.tipo == 'USUARIO' && (
            <>
              <Button icon="pi pi-heart" rounded text aria-label="Favoritos" style={{ color: '#F5ECDD' }} />
              <Button icon="pi pi-shopping-bag" rounded text aria-label="Cesta" style={{ color: '#F5ECDD' }} />
            </>
          )}
          <Avatar
            image={conta?.usuario?.fotoPerfil || conta?.sebo?.fotoPerfil || undefined} 
            icon={!conta?.usuario?.fotoPerfil && !conta?.sebo?.fotoPerfil ? 'pi pi-user' : undefined}
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
        start={start}
        end={end}
        style={{ background: '#2F292A', border: 'none', borderRadius: '0%' }}
      />
    );
  }

  return content;
}