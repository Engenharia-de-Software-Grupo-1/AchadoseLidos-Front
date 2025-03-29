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
import { useAuth } from '@contexts/authContext';
import { useProductFilterStore } from '@stores/filters/productFilterStore';

interface HeaderProps {
  simpleHeader: boolean;
}

export default function Header({ simpleHeader }: HeaderProps) {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isAuthenticated, conta, handleLogout } = useAuth();
  const [searchedProduct, setSearchedProduct] = useState('');
  const { filters } = useProductFilterStore();

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
    filters.push({ campo: 'nome', operador: 'like', valor: searchedProduct });
    navigate('/navigation/products');
  };

  const handleSeboProducts = () => {
    navigate(`/navigation/meus-produtos/${conta?.id}`);
  };

  const resetFilters = () => {
    filters.length = 0;
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
  } else {
    const panelMenuItems = isAuthenticated
      ? [
          { label: 'Meu Perfil', icon: 'pi pi-user', command: () => redirectProfile() },
          { label: 'Histórico de Pedidos', icon: 'pi pi-history', command: () => navigate('/profile/historico') },

          ...(conta?.tipo === 'SEBO'
            ? [{ label: 'Meus Produtos', icon: 'pi pi-box', command: () => handleSeboProducts() }]
            : [
                { label: 'Cesta', icon: 'pi pi-shopping-bag', command: () => navigate('/profile/user/cesta') },
                { label: 'Favoritos', icon: 'pi pi-heart', command: () => navigate('/profile/user/favoritos') },
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
          <img alt="logo" src="/images/logo.svg" height="40" className="ml-2 mr-4" onClick={() => resetFilters()}></img>
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
              style={{height: '2.5rem' }}
              onChange={(e) => setSearchedProduct(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  redirectMyProducts();
                }
              }}
            />
          </IconField>
        </div>

        <div className="flex align-items-center gap-4 justify-center iconGroup">
          {conta?.tipo == 'USUARIO' && (
            <>
              <Button icon="pi pi-heart" rounded className='heart-header-icon' text aria-label="Favoritos" style={{ color: '#F5ECDD' }} onClick={() => navigate('/profile/user/favoritos')} />
              <Button icon="pi pi-shopping-bag" className='heart-header-icon' rounded text aria-label="Cesta" style={{ color: '#F5ECDD' }} onClick={() => navigate('/profile/user/cesta')} />
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
        style={{ background: '#2F292A', border: 'none', borderRadius: '0%', padding:'0.5rem 2rem', width:'100vw'}}
      />
    );
  }
  return content;
}