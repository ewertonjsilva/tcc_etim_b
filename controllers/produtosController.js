const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarProdutos(request, response) { 
        try {
            const sql = 'SELECT prd_id, prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao FROM produtos;';  
            const produtos = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};
