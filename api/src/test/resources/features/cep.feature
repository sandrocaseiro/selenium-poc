Feature: Busca de CEP
  Testar funcionalidades da tela de CEP

  Background:
    Given que estou na tela de CEP

  Scenario: Buscar CEP
    When eu digito o CEP 01001000
    And eu clico em buscar
    Then o mostrador de progresso será mostrado
    And a tabela de resultado de CEP será mostrada

  Scenario: Buscar CEP via input
    When eu digito o CEP 01451001 e envio
    Then o mostrador de progresso será mostrado
    And a tabela de resultado de CEP será mostrada

  Scenario: Buscar CEP inválido
    When eu digito o CEP 99999999 e envio
    Then o mostrador de progresso será mostrado
    And o alerta de erro será mostrado
