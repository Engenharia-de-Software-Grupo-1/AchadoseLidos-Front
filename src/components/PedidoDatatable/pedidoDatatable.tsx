import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Tag } from 'primereact/tag';
import './style.css';
import { ProdutoPedido } from '@domains/Produto';
import { Pedido } from '@domains/Pedido';
import { Link } from 'react-router-dom';

interface PedidoDatatableProps {
  pedido: Pedido;
  onQuantityChange: (productId: number, quantity: number) => void;
  onDeleteItem?: (productId: number) => void;
  onSelectionChange?: (productId: number, selected: boolean) => void;
  deletingIds?: number[];
  updatingProducts?: Set<number>;
  isUser?: boolean;
  isFinalizado?: boolean;
}

const PedidoDatatable: React.FC<PedidoDatatableProps> = ({
  pedido,
  onQuantityChange,
  onDeleteItem,
  onSelectionChange,
  deletingIds = [],
  updatingProducts = new Set<number>(),
  isUser = false,
  isFinalizado = false
}) => {

  const statusVector = [<Tag style={{width:'7rem', backgroundColor:'var(--Achados-Highlight-Blue)', color:'white'}} className="mr-2 mt-2" value={'Pendente'} />, <Tag style={{width:'7rem', backgroundColor:'var(--Achados-Red)', color:'white'}} className="mr-2 mt-2" value={'Cancelado'} />, <Tag style={{width:'7rem', backgroundColor:'var(--Achados-Green'}} className="mr-2 mt-2" value={'Confirmado'} />];
  
const calculateStoreTotals = (products: ProdutoPedido[]) => {
  const quantityTotal = products.reduce((sum, item) => 
    item.selected === true ? sum + item.quantidade : sum, 
    0
  );
  
  const lineTotal = products.reduce((sum, item) => 
    item.selected === true ? sum + (item.produto.preco * item.quantidade) : sum,
    0
  );

  return { quantityTotal, lineTotal };
};
  const { quantityTotal, lineTotal } = calculateStoreTotals(pedido.produtos);

  const quantidadeBodyTemplate = (rowData: ProdutoPedido) => {
    const isUpdating = updatingProducts.has(rowData.produto.id);
    const maxQuantity = rowData.produto.qtdEstoque;

    const canDecrease = rowData.quantidade > 1;
    const canIncrease = rowData.quantidade < maxQuantity;

    const handleChange = (value: number | null) => {
      const newValue = value ?? 1;
      onQuantityChange(rowData.produto.id, newValue);
    };

    return (
      <div className="flex align-items-center gap-2 quantityContainer">
        <InputNumber
          value={rowData.quantidade}
          style={{width:'10rem'}}
          onValueChange={(e) => handleChange(e.value)}
          mode="decimal"
          showButtons
          tooltip={maxQuantity == 0 ? 'Produto fora de estoque.' : 'Quantidade limitada pelo estoque.'}
          tooltipOptions={{ position: 'top' }}
          min={maxQuantity == 0 ? 0 : 1}
          max={maxQuantity}
          disabled={isUpdating || isFinalizado}
          decrementButtonIcon={
            <i
              className={'pi pi-sort-down-fill'}
              style={{ fontSize: '1rem', color: canDecrease ? '#2F292A' : '#2F292A80', border: 'none' }}
            />
          }
          incrementButtonIcon={
            <i
              className={'pi pi-sort-up-fill'}
              style={{ fontSize: '1rem', color: canIncrease ? '#2F292A' : '#2F292A80', border: 'none' }}
            />
          }
          inputClassName="readonly-input"
        />
      </div>
    );
  };

  return (
    <div className='pedido-datatable-container'>
    <DataTable value={pedido.produtos} style={{width:'100%'}} dataKey="produto.id">
      <Column
        header="Imagem"
        body={(rowData: ProdutoPedido) => (
          rowData.produto.fotos?.length > 0 ? (
            <img
              src={rowData.produto.fotos[0].url}
              alt={rowData.produto.nome}
              style={{ width: '4rem', height: '6rem', borderRadius: '4px', objectFit:'cover' }}
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
        style={{ minWidth: '12rem' }}
        body={(rowData) => (
          <Link style={{color:'inherit', textDecoration:'underline'}} to={`/product/${rowData.produto.id}`} className="product-name-link">
            {rowData.produto.nome}
          </Link>
        )}
      />
      <Column
        field="produto.categoria"
        header="Categoria"
        style={{ minWidth: '7rem' }}
        footer='Total: '
      />
      <Column
        header="Preço"
        style={{ minWidth: '8rem' }}
        body={(rowData: ProdutoPedido) => (
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
        style={{maxWidth:'8rem'}}
        body={(rowData: ProdutoPedido) => 
          (isUser || isFinalizado) ? 
            rowData.quantidade : 
            quantidadeBodyTemplate(rowData)
        }
        footer={() => (
          <div className="font-bold numeric">{quantityTotal}</div>
        )}
      />
      <Column
      header={`${isUser ? 'Status' : 'A Confirmar'}`}
        body={(rowData: ProdutoPedido) => (
          (isUser || isFinalizado) ? (
            <>
              {statusVector[rowData.status]}
              {isUser && onDeleteItem && (
                <Button 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger" 
                  onClick={() => onDeleteItem(rowData.produto.id)}
                  loading={deletingIds.includes(rowData.produto.id)}
                />
              )}
            </>
          ) : (
            <Checkbox 
              onChange={(e: CheckboxChangeEvent) => 
                onSelectionChange && onSelectionChange(rowData.produto.id, e.checked ?? false)
              }  
              checked={rowData.selected ?? false}
            />
          )
        )}
        style={{ minWidth: '8rem' }}
        align="center"
      />
    </DataTable>
    </div>
  );
};

export default PedidoDatatable;