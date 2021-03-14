package pages;

import driver.WebDriverConfiguration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;
import java.util.function.Function;

public abstract class BasePage {

    public BasePage() {
        PageFactory.initElements(getWebDriver(), this);
    }

    public WebDriver getWebDriver() {
        return WebDriverConfiguration.getWebDriver();
    }

    public <V> void explicitWait(long timeout, Function<? super WebDriver, V> condition) {
        WebDriverWait wait = new WebDriverWait(getWebDriver(), timeout);
        wait.until(condition);
    }

    public void implicitWait(long timeout) {
        getWebDriver().manage().timeouts().implicitlyWait(timeout, TimeUnit.SECONDS);
    }
}
