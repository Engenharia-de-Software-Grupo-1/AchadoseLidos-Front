
import React, { useState, useEffect } from 'react';
import { TreeSelect, TreeSelectChangeEvent, TreeSelectSelectionKeysType } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { CategoriaProduto, EstadoConservacaoProduto } from 'constants/ProdutoConstants';

interface _MultipleDemoProps {
    titulo?: string;
    autor?: string;
    categoria?: typeof CategoriaProduto;
    estadoConservação?: typeof EstadoConservacaoProduto;
    genero?: string;
    anoEdição?: number;
    anoLançamento?: number;
    faixaPreço?: number;
}

const mockNodes: TreeNode[] = [
    {
        key: '0',
        label: 'Node 0',
        children: [
            { key: '0-0', label: 'Node 0-0' },
            { key: '0-1', label: 'Node 0-1' }
        ]
    },
    {
        key: '1',
        label: 'Node 1',
        children: [
            { key: '1-0', label: 'Node 1-0' },
            { key: '1-1', label: 'Node 1-1' }
        ]
    }
];

export default function MultipleDemo() {
    const [nodes, setNodes] = useState<TreeNode[] | undefined>(mockNodes);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState<TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[] | null>([]);
    
    useEffect(() => {
        // NodeService.getTreeNodes().then((data) => setNodes(data));
        setNodes(mockNodes);
    }, []);

    return (
        <div className="card flex justify-content-center" style={{ height: 'unset', width: '100%' }}>
            <TreeSelect value={selectedNodeKeys} onChange={(e: TreeSelectChangeEvent) => setSelectedNodeKeys(e.value as TreeSelectSelectionKeysType[])} options={nodes} 
                metaKeySelection={false} className="md:w-20rem w-full" selectionMode="multiple" placeholder="Select Items"></TreeSelect>
        </div>
    );
}
        