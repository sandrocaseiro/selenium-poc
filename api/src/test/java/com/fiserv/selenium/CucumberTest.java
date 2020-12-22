package com.fiserv.selenium;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    monochrome = true,
    plugin = {"pretty", "html:target/cucumber.html"})
public class CucumberTest {
}
