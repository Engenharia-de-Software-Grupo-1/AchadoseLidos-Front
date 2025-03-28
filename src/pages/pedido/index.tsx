import PedidoDatatable from '@components/PedidoDatatable/pedidoDatatable';
import { useState } from 'react';
import { Pedido } from '@domains/Pedido';
import TemplatePage from '@pages/template';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import './style.css';
import { Button } from 'primereact/button';

const PedidoPage = () => {
  const mockPedido: Pedido = {
  id: 1,
  nome: 'Sebo do João',
  createdAt:'02/06/2004',
  produtos: [
    {
      produto: {
        id: 101,
        nome: 'Dom Quixote',
        categoria: 'CD',
        preco: 45.90,
        qtdEstoque: 10,
        fotos: [{ url: 'https://m.media-amazon.com/images/I/91VokXkn8hL._AC_UF1000,1000_QL80_.jpg' }],
        status: 'ATIVO',
        estadoConservacao: 'Novo',
        generos: []
      },
    quantidade: 2,
    selected: true,
    status: 0
    },
    {
      produto: {
        id: 102,
        nome: '1984',
        categoria: 'DVD',
        preco: 32.50,
        qtdEstoque: 0, // Out of stock
        fotos: [{ url: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg' }],
        status: 'ATIVO',
        estadoConservacao: 'Novo',
        generos: []
      },
    quantidade: 1,
    selected: false,
    status: 2
    },
    {
      produto: {
          id: 103,
          nome: 'O Pequeno Príncipe',
          categoria: 'Livro',
          preco: 25.00,
          qtdEstoque: 5,
          fotos: [],
          status: 'ATIVO',
          estadoConservacao: 'Novo',
          generos: []
      },
    quantidade: 3,
    status: 0,
      selected: true
    },
    {
      produto: {
          id: 104,
          nome: 'A Arte da Guerra',
          categoria: 'Disco',
          preco: 28.75,
          qtdEstoque: 15,
          status: 'ATIVO',
          estadoConservacao: 'Novo',
          generos: []
      }, 
    quantidade: 1,
    status: 1,
      selected: false
    }
  ]
};
  const [pedido, setPedido] = useState<Pedido>(mockPedido);
  
  const handleQuantityChange = (productId: number, quantity: number) => {
    setPedido(prev => ({
      ...prev,
      produtos: prev.produtos.map(item => 
        item.produto.id === productId 
          ? { ...item, quantidade: quantity } 
          : item
      )
    }));
  };

  const handleSelectionChange = (productId: number, selected: boolean) => {
    setPedido(prev => ({
      ...prev,
      produtos: prev.produtos.map(item => 
        item.produto.id === productId 
          ? { ...item, selected } 
          : item
      )
    }));
  };
  
  const isUser = false;
  const isFinalizado = true;

  const breadCrumbItems = [
    { label: 'Perfil', url:`/profile/${!isUser ? 'sebo' : 'user'}/` },
    { label: 'Historico', url:'/profile/historico/' },
    { label: `Pedido ${mockPedido.id}`, url: `/profile/historico/${mockPedido.id}` }
  ];


  return (
    <TemplatePage simpleHeader={false} simpleFooter={true}>
                <div className='pedido-container'>
                      <ALBreadCrumb breadcrumbItems={breadCrumbItems} />
                      <h1 className='h1-highlight' style={{ paddingBottom:'0' }}>Pedido #{mockPedido.id} </h1>
                      <h3 style={{ margin: '-2rem', padding:'0' }}>{mockPedido.nome}</h3>
                      <h4 style={{ padding:'0', marginBottom:'0' }}>{mockPedido.createdAt}</h4>
                  <div style={{width:'80%'}}>
                      <PedidoDatatable
                        pedido={pedido}
                        onQuantityChange={handleQuantityChange}
                        onSelectionChange={handleSelectionChange}
                        isUser={isUser}
                        isFinalizado={isFinalizado}
                        />
                      {(!isUser && !isFinalizado) && (<div style={{width:'100%', display:'flex', justifyContent:'flex-end', padding:'1rem 0', gap:'1rem'}}>
                        
                        <Button 
                          label="Cancelar Venda" 
                          style={{
                              backgroundColor: 'var(--Achados-Red)', 
                              border: 'none',
                              padding: '0.5rem 1rem',
                          }}
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => confirm('not implemented')}/>
                        <Button 
                          label="Confirmar Venda" 
                          style={{
                              backgroundColor: 'var(--Achados-Success)', 
                              border: 'none',
                              padding: '0.5rem 1rem',
                          }}
                          tooltip={'Ao confirmar, não será mais possível editar este pedido.' }
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => confirm('nao implementado')}/>
                      </div>)
                      }
                    </div>
                </div>
        </TemplatePage>
  );
};

export default PedidoPage;