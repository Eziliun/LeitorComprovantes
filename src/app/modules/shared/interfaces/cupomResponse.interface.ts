
export interface ResponseCardCupons {
    message: string,
    result: iCupons[],
    status: boolean,
    statusCode: number
}

export interface iCupons {
    id: number;
    bandeira_do_cartao: string;
    forma_de_pagamento: string;
    nsu: string;
    autorizacao: string;
    codigo_pedido_interno: string | undefined;
    imagem: string;
}