const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarProdutos(request, response) { 
        try {

            const { page = 0, limit = 5 } = request.query; 
            const inicio = (page -1) * limit;

            const { prd_id = '%%' } = request.body; 
            const { prd_nome = '%%' } = request.body; 
            const { ptp_id = '%%' } = request.body; 

            const sql = 'SELECT p.prd_id, p.prd_nome, p.prd_valor, p.prd_unidade, p.ptp_id, t.ptp_nome, t.ptp_icone, p.prd_disponivel = 1 AS prd_disponivel, p.prd_img, p.prd_destaque = 1 AS prd_destaque, p.prd_img_destaque, p.prd_descricao FROM produtos p INNER JOIN produto_tipos t ON p.ptp_id = t.ptp_id WHERE p.prd_id like ? AND p.prd_nome like ? AND t.ptp_id like ? ORDER BY p.prd_valor ASC LIMIT ?, ?;';  
            const values = [ prd_id, prd_nome, ptp_id, inicio, parseInt(limit) ]; 
            const produtos = await db.query(sql, values); 
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};
