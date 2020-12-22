package com.fiserv.selenium.steps;

import io.cucumber.java8.En;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CepSteps implements En {
    private WebDriver driver;

    public CepSteps() {
        WebDriverManager.edgedriver().setup();

        Before(() -> driver = new EdgeDriver());
        After(() -> {
            if (driver != null)
                driver.quit();
        });

        Given("que estou na tela de CEP", () -> {
            driver.get("http://localhost:3000/cep");
        });

        When("eu digito o CEP {word}", (String cep) -> {
            driver.findElement(By.cssSelector("[data-cy=input-cep]")).sendKeys(cep);
        });

        When("eu digito o CEP {word} e envio", (String cep) -> {
            WebElement element = driver.findElement(By.cssSelector("[data-cy=input-cep]"));
            element.sendKeys(cep);
            element.submit();
        });

        When("eu clico em buscar", () -> {
            driver.findElement(By.cssSelector("[data-cy=buscar-cep]")).click();
        });

        Then("o mostrador de progresso será mostrado", () -> {
            driver.findElement(By.cssSelector("[data-cy=loader]")).isDisplayed();
            new WebDriverWait(driver, Duration.ofSeconds(10).getSeconds())
                .until(ExpectedConditions.numberOfElementsToBe(By.cssSelector("[data-cy=loader]"), 0));
        });

        Then("a tabela de resultado de CEP será mostrada", () -> {
            driver.findElement(By.cssSelector("[data-cy=resultado-cep]")).isDisplayed();
        });

        Then("o alerta de erro será mostrado", () -> {
            driver.findElement(By.cssSelector("[data-cy=global-alert]")).isDisplayed();
            new WebDriverWait(driver, Duration.ofSeconds(10).getSeconds())
                .until(ExpectedConditions.numberOfElementsToBe(By.cssSelector("[data-cy=global-alert]"), 0));
        });
    }
}
