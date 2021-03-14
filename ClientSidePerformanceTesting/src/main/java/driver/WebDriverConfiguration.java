package driver;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;

public final class WebDriverConfiguration {

    private static WebDriver driver;

    public static WebDriver setWebDriver(SupportedDrivers driver) {
        if (WebDriverConfiguration.driver != null) {
            return WebDriverConfiguration.driver;
        }

        String driverName = driver.getDriverName();

        switch (driverName) {
            case "chrome": {
                ChromeOptions chromeOptions = new ChromeOptions();
                WebDriverManager.chromedriver().setup();
                WebDriverConfiguration.driver = new ChromeDriver(chromeOptions);
                return WebDriverConfiguration.driver;
            }

            case "firefox": {
                WebDriverManager.firefoxdriver().setup();
                WebDriverConfiguration.driver = new FirefoxDriver();
                return WebDriverConfiguration.driver;
            }

            default: {
                throw new IllegalStateException("This browser isn't supported!");
            }
        }
    }

    public static WebDriver getWebDriver() {
        return driver;
    }

    public static void clearCookies() {
        if (driver != null) driver.manage().deleteAllCookies();
    }

    public static void tearDown() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }
}