import { createServer, Server, Response } from 'miragejs';

export default function() {
  new Server({
    routes() {
      this.urlPrefix = 'http://localhost:8080';
      this.timing = 2000;

      this.get('/v1/cep/:cep', (_, req) => {
        let cep = req.params.cep;

        if (cep === '01451001')
          return {
            "errors": [
              {
                  "code": 200,
                  "type": "S",
                  "description": "Sucesso"
              }
            ],
            "data": {
                "cep": "01451-001",
                "logradouro": "Avenida Brigadeiro Faria Lima",
                "bairro": "Jardim Paulistano",
                "cidade": "São Paulo",
                "uf": "SP"
            },
            "isSuccess": true
          };
        else if (cep === '99999999')
          return new Response(
            404,
            {},
            {
              "errors": [
                {
                    "code": 902,
                    "type": "E",
                    "description": "Recurso não encontrado"
                }
              ],
              "data": null,
              "isSuccess": false
            }
          );
        else
          return new Response(
            500,
            {},
            {
              "errors": [
                {
                    "code": 500,
                    "type": "E",
                    "description": "Erro do servidor"
                }
              ],
              "data": null,
              "isSuccess": false
            }
          );
      });
    },
  });
}
