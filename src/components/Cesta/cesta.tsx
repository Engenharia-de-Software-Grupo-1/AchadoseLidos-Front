import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './style.css';
import { useNotification } from '@contexts/notificationContext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useCesta } from '@stores/cesta/cestaStore';
import { ProdutoCesta } from '@domains/Cesta';
import { Link } from 'react-router-dom';

const CestaComponent = () => {
  const { showNotification } = useNotification();
  const {
    cestas,
    loading,
    deletingIds,
    updatingProducts,
    fetchCestaData,
    handleDeleteItem,
    handleQuantityChange,
    calculateStoreTotals
  } = useCesta();

  useEffect(() => {
    fetchCestaData();
  }, []);

  const handleFinalizarPedido = () => {
    showNotification('error', 'not yet implemented', '');
  };

  const quantidadeBodyTemplate = (rowData: ProdutoCesta) => {
    const isUpdating = updatingProducts.has(rowData.produto.id);
    const [quantity, setQuantity] = useState(rowData.quantidade);
    const maxQuantity = rowData.produto.qtdEstoque;

    const canDecrease = quantity > 1;
    const canIncrease = quantity < maxQuantity;

    const handleChange = (value: number | null) => {
      const newValue = value ?? 1;
      setQuantity(newValue);
      handleQuantityChange(rowData.produto.id, newValue);
    };

    return (
      <div className="flex align-items-center gap-2">
        <InputNumber
          value={quantity}
          onValueChange={(e) => handleChange(e.value)}
          mode="decimal"
          showButtons
          tooltip={maxQuantity == 0 ? 'Produto fora de estoque.' :'Quantidade limitada pelo estoque.' }
          tooltipOptions={{ position: 'top' }}
          min={maxQuantity == 0 ? 0 : 1}
          max={maxQuantity}
          disabled={isUpdating}
          decrementButtonIcon={
            <i
              className={'pi pi-sort-down-fill'}
              style={{ fontSize: '1rem', color: canDecrease ? '#2F292A' : '#2F292A80', border:'none'}}
            />
          }
          incrementButtonIcon={
            <i
              className={'pi pi-sort-up-fill'}
              style={{ fontSize: '1rem', color: canIncrease ? '#2F292A' : '#2F292A80', border:'none'}}
            />
          }
          inputClassName="readonly-input"
        />
        {isUpdating}
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-content-center p-4">
      <ProgressSpinner />
    </div>;
  }

  if (cestas.length === 0 || cestas.every(store => store.produtos.length === 0)) {
    return (
      <div className="cesta-container">
        <div className="empty-cesta" style={{justifyContent:'center'}}>
          <i className="pi pi-shopping-cart" style={{ fontSize: '3rem', color: 'var(--Achados-Black)' }} />
          <h3>Sua cesta está vazia!</h3>
          <p>Adicione itens para continuar</p>
          <Button 
            label="Voltar às compras" 
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() => window.location.href = '/'}
            style={{color:'var(--Achados-OffWhite)', backgroundColor: 'var(--Achados-Success)'}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cesta-container">
      <Accordion multiple activeIndex={0}>
        {cestas.map((store) => {
          const { quantityTotal, lineTotal } = calculateStoreTotals(store.produtos);

          return (
            <AccordionTab 
              key={store.sebo.id} 
              header={
                <div className="accordion-header-collapsed">
                  <div className="header-grid">
                    <div className="store-info">
                      <span className="font-bold highlight">{store.sebo.nome}</span>
                    </div>
                    <div className="name-info"></div>
                    <div className="category-info">Total:</div>
                    <div className="price-col">R$ {lineTotal.toFixed(2)}</div>
                    <div className="qty-col">{quantityTotal} itens</div>
                    <div className="actions-col"></div>
                  </div>
                </div>
              }>
              <DataTable 
                value={store.produtos} 
                dataKey="produto.id"
              >
                <Column
                header="Imagem"
                body={(rowData: ProdutoCesta) => (
                    rowData.produto.fotos?.length > 0 ? (
                        <img
                            src={rowData.produto.fotos[0].url} 
                            alt={rowData.produto.nome}
                            style={{ width: '6rem', height: 'auto', borderRadius: '4px' }}
                        />
                    ) : (
                        <i className="pi pi-image" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                    )
                )}
                style={{ minWidth: '6rem' }}
                align="center" 
            />
            <Column 
                field="produto.nome" 
                header="Nome" 
                sortable 
                style={{ minWidth: '10rem' }} 
                body={(rowData) => (
                  <Link style={{color:'inherit', textDecoration:'underline'}} to={`/product/${rowData.produto.id}`} className="product-name-link">
                    {rowData.produto.nome}
                  </Link>
                )}
            />
            <Column 
                field="produto.categoria" 
                header="Categoria" 
                style={{ minWidth: '8rem' }} 
                footer='Total: '
            />
            <Column
                header="Preço"
                sortable
                style={{ minWidth: '8rem' }}
                body={(rowData: ProdutoCesta) => (
                    `R$ ${rowData.produto.preco.toFixed(2)}`
                )}
                footer={() => (
                    <div className="font-bold numeric">
                    R$ {lineTotal.toFixed(2)}
                    </div>
                )}
            />
            <Column
                header="Quantidade"
                style={{ minWidth: '5rem'}}
                body={(rowData: ProdutoCesta) => 
                    quantidadeBodyTemplate(rowData)
                }
                footer={() => (
                    <div style={{justifyContent:'left'}} className="font-bold numeric">{quantityTotal}</div>
                )}
            />
            <Column
                header="Ações"
                body={(rowData: ProdutoCesta) => (
                    <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger p-button-text"
                        onClick={() => handleDeleteItem(rowData.produto.id)}
                        loading={deletingIds.includes(rowData.produto.id)}
                        style={{backgroundColor: 'unset', }}
                    />
                )}
                style={{ minWidth: '8rem'}}
                align="center"
                footer={
                <div className={'flex justify-content-end'}>
                    <Button 
                        className={`${(store.sebo.concordaVender && quantityTotal > 0) ? '' : 'disabled-button' }`}
                        label="Confirmar Pedido" 
                        style={{
                            backgroundColor: (store.sebo.concordaVender && quantityTotal > 0) ? 'var(--Achados-Success)' : 'var(--Achados-Highlight-Green)', 
                            border: 'none',
                            padding: '0.5rem 1rem',
                        }}
                        tooltip={store.sebo.concordaVender ? '' : 'Esse sebo não vende produtos via plataforma, pedidos são realizados apenas presencialmente.' }
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => (store.sebo.concordaVender && quantityTotal > 0) ? handleFinalizarPedido() : showNotification('warn', 'Não é possível finalizar este pedido', '')}
                    />
                </div>
                }
                />
              </DataTable>
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CestaComponent;