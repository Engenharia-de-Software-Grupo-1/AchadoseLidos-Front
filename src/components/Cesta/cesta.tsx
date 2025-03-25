import React, { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './style.css';
import { Cesta, ProdutoCesta } from '@domains/Cesta';
import { getCesta, removeProductCesta, updateProductQuantCesta } from '@routes/routesCesta';
import { useNotification } from '@contexts/notificationContext';
import { ProgressSpinner } from 'primereact/progressspinner';


const CestaComponent = () => {
    const { showNotification } = useNotification();
    const [cestas, setCestas] = useState<Cesta[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingIds, setDeletingIds] = useState<number[]>([]);
    const [updatingProducts, setUpdatingProducts] = useState<Set<number>>(new Set());



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCesta();
                if (response.status == 200) {
                    setCestas(response.data);
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    showNotification('warn', null, 'Faça login para acessar a cesta.');
                } else if (error.response) {
                    const errorMessage = error.response.data.message || 'Erro no servidor.';
                    showNotification('error', null, errorMessage);
                } else if (error.request) {
                    showNotification('error', null, 'Sem resposta do servidor. Verifique sua conexão.');
                } else {
                    showNotification('error', null, 'Algo deu errado. Tente novamente mais tarde.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    

    const handleDeleteItem = async (productId: number) => {
        setDeletingIds(prev => [...prev, productId]); 
        
        try {
            await removeProductCesta(productId);
            setCestas(prev => 
                prev.map(store => ({
                    ...store,
                    produtos: store.produtos.filter(p => p.produto.id !== productId)
                }))
            );
            showNotification('success', 'Item removido!', '');
        } catch (error) {
            showNotification('error', 'Falha ao remover item', '');
        } finally {
            setDeletingIds(prev => prev.filter(id => id !== productId));
        }
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




    const handleQuantityChange = async (productId: number, newQuantity: number) => {
        try {
        setCestas(prev => prev.map(store => ({
            ...store,
            produtos: store.produtos.map(produto => 
            produto.produto.id === productId
                ? { ...produto, quantidade: newQuantity }
                : produto
            )
        })));

        setUpdatingProducts(prev => new Set(prev).add(productId));
        await updateProductQuantCesta(productId, { quantidade: newQuantity });
        } catch (error) {
        // Revert on error
        const freshData = await getCesta();
        setCestas(freshData.data);
        } finally {
        setUpdatingProducts(prev => {
            const newSet = new Set(prev);
            newSet.delete(productId);
            return newSet;
        });
        }
    };

    const handleFinalizarPedido = () => {
        showNotification('error', 'not yet implemented', '');
    };


    // Updated template with loading states
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
                    min={1}
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

      const calculateStoreTotals = (produtos: ProdutoCesta[]) => {
        return produtos.reduce((acc, produto) => ({
        unitPriceTotal: acc.unitPriceTotal + produto.produto.preco,
        quantityTotal: acc.quantityTotal + produto.quantidade,
        lineTotal: acc.lineTotal + (produto.produto.preco * produto.quantidade)
        }), { unitPriceTotal: 0, quantityTotal: 0, lineTotal: 0 });
  };


    return (
        <div className="cesta-container">
            <Accordion multiple activeIndex={0}>
                {cestas.map((store) => {
                    const { unitPriceTotal, quantityTotal, lineTotal } = calculateStoreTotals(store.produtos);

                    return (
                        <AccordionTab 
                            key={store.sebo.id} 
                            header={
                                <div className="accordion-header-collapsed">
                                    <div className="header-grid">
                                    {/* Store Info - Aligns with name column */}
                                        <div className="store-info">
                                            <span className="font-bold">{store.sebo.nome}</span>
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
                                                src={rowData.produto.fotos[0]} 
                                                alt={rowData.produto.nome}
                                                style={{ width: '6rem', height: 'auto', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <i className="pi pi-image" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                        )
                                    )}
                                    style={{ minWidth: '8rem' }}
                                    align="center" 
                                />
                                <Column 
                                    field="produto.nome" 
                                    header="Nome" 
                                    sortable 
                                    style={{ minWidth: '16rem' }} 
                                />
                                <Column 
                                    field="produto.categoria" 
                                    header="Categoria" 
                                    style={{ minWidth: '12rem' }} 
                                    footer='Total: '
                                />
                                <Column
                                    header="Preço"
                                    sortable
                                    style={{ minWidth: '10rem' }}
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
                                    style={{ minWidth: '5rem' }}
                                    body={(rowData: ProdutoCesta) => 
                                        quantidadeBodyTemplate(rowData)
                                    }
                                    footer={() => (
                                        <div className="font-bold numeric">{quantityTotal}</div>
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
                                            className={`${store.sebo.concordaVender ? '' : 'disabled-button' }`}
                                            label="Confirmar Pedido" 
                                            style={{
                                                backgroundColor: store.sebo.concordaVender ? 'var(--Achados-Success)' : 'var(--Achados-Highlight-Green)', 
                                                border: 'none',
                                                padding: '0.5rem 1rem',
                                            }}
                                            tooltip={store.sebo.concordaVender ? '' : 'Esse sebo não vende produtos via plataforma, pedidos são realizados apenas presencialmente.' }
                                            tooltipOptions={{ position: 'top' }}
                                            onClick={() => store.sebo.concordaVender ? handleFinalizarPedido() : showNotification('warn', 'Sebo não faz vendas via plataforma', '')}
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